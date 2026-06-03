import { IoWarning } from 'react-icons/io5';

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  text,
  btnCancel,
  btnAccept,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-purple-950 bg-opacity-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="relative w-full max-w-md transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl border border-pink-100 transition-all duration-300">
          <div className="px-6 py-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 shadow-inner">
                <IoWarning className="text-purple-300" size={42} />
              </div>

              <h3 className="text-2xl font-extrabold text-purple-300 mb-3">
                {title}
              </h3>

              <p className="text-gray-500 leading-relaxed">
                {text}
              </p>
            </div>
          </div>

          <div className="bg-pink-50 px-6 py-5 flex flex-col sm:flex-row-reverse gap-3">
            <button
              type="button"
              onClick={onConfirm}
              className="w-full sm:w-auto justify-center rounded-full bg-cyan-200 px-7 py-3 text-sm font-bold text-white shadow-md hover:bg-cyan-300 transition"
            >
              {btnAccept}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto justify-center rounded-full bg-white border-2 border-cyan-200 px-7 py-3 text-sm font-bold text-purple-300 hover:bg-cyan-50 transition"
            >
              {btnCancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;