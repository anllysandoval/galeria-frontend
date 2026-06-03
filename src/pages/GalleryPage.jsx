import { useEffect, useState } from 'react';
import { useArtworks } from '../context/ArtworkContext';
import ArtworkCard from '../components/ArtworkCard';

export default function GalleryPage() {
  const { artworks, categories, errors, getArtworks, getCategories } =
    useArtworks();

  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    getCategories();
    getArtworks();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    getArtworks(category || undefined);
  };

  return (
    <div className="min-h-screen bg-pink-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-cyan-200 via-blue-200 to-purple-300 text-white text-center py-12 shadow-md">
        <h1 className="text-5xl font-extrabold uppercase tracking-wide drop-shadow-md">
          Galería de Arte
        </h1>
        <p className="mt-4 text-xl font-medium drop-shadow-sm">
          Descubre obras maestras en una experiencia visual única
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Filtro por categoría */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          <button
            onClick={() => handleCategoryChange('')}
            className={`px-8 py-3 rounded-full text-sm font-bold shadow-md transition ${
              selectedCategory === ''
                ? 'bg-cyan-200 text-white'
                : 'bg-white text-gray-700 border-2 border-cyan-200 hover:bg-cyan-50'
            }`}
          >
            Todas
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-8 py-3 rounded-full text-sm font-bold shadow-md transition ${
                selectedCategory === cat
                  ? 'bg-cyan-200 text-white'
                  : 'bg-white text-gray-700 border-2 border-cyan-200 hover:bg-cyan-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {errors.length > 0 && (
          <div className="max-w-xl mx-auto bg-red-100 text-red-500 text-center rounded-xl px-4 py-3 mb-6 border border-red-200">
            {errors[0]}
          </div>
        )}

        {artworks.length === 0 ? (
          <p className="text-center text-gray-500 bg-white rounded-2xl shadow-md py-8">
            No hay obras disponibles.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <ArtworkCard key={artwork._id} artwork={artwork} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}