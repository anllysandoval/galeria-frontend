import { useEffect, useState } from 'react';
import { useArtworks } from '../context/ArtworkContext';
import ConfirmModal from '../components/ConfirmModal';
import { toast } from 'react-toastify';

const EMPTY_FORM = {
  title: '',
  artist: '',
  category: '',
  description: '',
  price: '',
  image: null,
};

export default function AdminPage() {
  const {
    artworks,
    errors,
    getArtworks,
    createArtwork,
    updateArtworkWithoutImage,
    deleteArtwork,
  } = useArtworks();

  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getArtworks();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setForm((prev) => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingId) {
        const data = {
          title: form.title,
          artist: form.artist,
          category: form.category,
          description: form.description,
          price: parseFloat(form.price),
          imageUrl: form.imageUrl,
          available: true,
        };

        await updateArtworkWithoutImage(editingId, data);
        toast.success('Obra actualizada correctamente');
      } else {
        const formData = new FormData();

        formData.append('title', form.title);
        formData.append('artist', form.artist);
        formData.append('category', form.category);
        formData.append('description', form.description);
        formData.append('price', form.price);

        if (form.image) formData.append('image', form.image);

        await createArtwork(formData);
        toast.success('Obra creada correctamente');
      }

      setForm(EMPTY_FORM);
      setImagePreview(null);
      setEditingId(null);
    } catch (err) {
      toast.error('Error al guardar la obra');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (artwork) => {
    setEditingId(artwork._id);

    setForm({
      title: artwork.title,
      artist: artwork.artist,
      category: artwork.category,
      description: artwork.description,
      price: artwork.price,
      image: null,
      imageUrl: artwork.imageUrl,
    });

    setImagePreview(artwork.imageUrl);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setImagePreview(null);
  };

  const handleDeleteConfirm = async () => {
    await deleteArtwork(confirmDelete);
    toast.success('Obra eliminada');
    setConfirmDelete(null);
  };

  return (
    <div className="min-h-screen bg-pink-100">
      <header className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
        <h1 className="text-5xl font-extrabold drop-shadow-md">
          Panel Administrador
        </h1>
        <p className="mt-4 text-xl font-medium drop-shadow-sm">
          Gestiona las obras de la galería
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="bg-white rounded-3xl shadow-xl border border-pink-100 p-8 mb-10">
          <h2 className="text-3xl font-extrabold text-purple-300 mb-6">
            {editingId ? 'Editar Obra' : 'Nueva Obra'}
          </h2>

          {errors.length > 0 && (
            <div className="mb-6 bg-red-100 border border-red-200 text-red-500 rounded-2xl px-5 py-4">
              {errors.map((err, i) => (
                <p key={i}>{err}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-5">
              <input
                type="text"
                name="title"
                placeholder="Título"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-full border-2 border-cyan-200 px-5 py-3 text-gray-700 outline-none focus:border-purple-300 transition"
                required
              />

              <input
                type="text"
                name="artist"
                placeholder="Artista"
                value={form.artist}
                onChange={handleChange}
                className="w-full rounded-full border-2 border-cyan-200 px-5 py-3 text-gray-700 outline-none focus:border-purple-300 transition"
                required
              />

              <input
                type="text"
                name="category"
                placeholder="Categoría (ej. Pintura, Escultura)"
                value={form.category}
                onChange={handleChange}
                className="w-full rounded-full border-2 border-cyan-200 px-5 py-3 text-gray-700 outline-none focus:border-purple-300 transition"
                required
              />

              <input
                type="number"
                name="price"
                placeholder="Precio"
                value={form.price}
                onChange={handleChange}
                className="w-full rounded-full border-2 border-cyan-200 px-5 py-3 text-gray-700 outline-none focus:border-purple-300 transition"
                required
                min="0"
                step="0.01"
              />
            </div>

            <textarea
              name="description"
              placeholder="Descripción"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-5 rounded-3xl border-2 border-cyan-200 px-5 py-4 text-gray-700 outline-none focus:border-purple-300 transition h-32 resize-none"
              required
            />

            {!editingId && (
              <div className="mt-5">
                <label className="block text-sm font-bold text-purple-300 mb-2">
                  Imagen de la obra
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleChange}
                  className="w-full rounded-2xl border-2 border-cyan-200 px-4 py-3 text-gray-600 bg-white file:mr-4 file:rounded-full file:border-0 file:bg-cyan-200 file:px-5 file:py-2 file:text-white file:font-bold hover:file:bg-cyan-300"
                  required={!editingId}
                />
              </div>
            )}

            {imagePreview && (
              <div className="mt-5">
                <p className="text-sm font-bold text-purple-300 mb-2">
                  Vista previa
                </p>

                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-44 w-full max-w-sm object-cover rounded-2xl shadow-md border border-pink-100"
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-cyan-200 text-white font-bold px-8 py-3 rounded-full shadow-md hover:bg-cyan-300 transition disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Guardando...'
                  : editingId
                    ? 'Actualizar Obra'
                    : 'Guardar Obra'}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-white border-2 border-cyan-200 text-purple-300 font-bold px-8 py-3 rounded-full hover:bg-cyan-50 transition"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section>
          <h2 className="text-3xl font-extrabold text-purple-300 mb-6">
            Obras existentes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <div
                key={artwork._id}
                className="bg-white rounded-3xl shadow-lg overflow-hidden border border-pink-100 hover:shadow-2xl transition"
              >
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-6">
                  <span className="inline-block bg-pink-200 text-white font-bold px-4 py-2 rounded-full text-xs mb-4">
                    {artwork.category}
                  </span>

                  <h3 className="text-2xl font-extrabold text-purple-300 mb-2">
                    {artwork.title}
                  </h3>

                  <p className="text-gray-500 text-sm mb-1">
                    por {artwork.artist}
                  </p>

                  <p className="font-extrabold text-gray-700 mt-3">
                    ${artwork.price.toLocaleString()}
                  </p>

                  <p
                    className={`text-sm font-bold mt-2 ${
                      artwork.available ? 'text-green-500' : 'text-red-400'
                    }`}
                  >
                    {artwork.available ? 'Disponible' : 'No disponible'}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => handleEdit(artwork)}
                      className="flex-1 border-2 border-cyan-200 text-purple-300 font-bold py-2 rounded-full hover:bg-cyan-50 transition"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => setConfirmDelete(artwork._id)}
                      className="flex-1 bg-red-100 text-red-500 font-bold py-2 rounded-full hover:bg-red-200 transition"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {confirmDelete && (
        <ConfirmModal
          message="¿Estás seguro de eliminar esta obra? Esta acción no se puede deshacer."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}