import React, { useEffect } from 'react';
import { GeneratedImage } from '../types';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface ImagePreviewModalProps {
  image: GeneratedImage;
  onClose: () => void;
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ image, onClose }) => {
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-preview-title"
    >
      <div
        className="bg-slate-800 p-4 md:p-6 rounded-xl shadow-2xl max-w-4xl max-h-[90vh] w-full sm:w-auto relative animate-scaleUp border border-slate-700"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-start mb-4">
            <div className="flex-grow mr-4">
                <h3 id="image-preview-title" className="text-base md:text-lg font-semibold text-purple-300 break-words">
                    {image.promptUsed || "Pratinjau Gambar"}
                </h3>
                {image.promptUsed && <span className="sr-only">Gambar untuk prompt: {image.promptUsed}</span>}
            </div>
            <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
            aria-label="Tutup pratinjau"
            >
            <XMarkIcon className="h-6 w-6" />
            </button>
        </div>
        <div className="overflow-auto max-h-[calc(85vh-100px)] rounded-lg"> {/* Added rounded-lg for image container */}
            <img
                src={`data:image/jpeg;base64,${image.base64Image}`}
                alt={image.promptUsed || "Pratinjau gambar yang dihasilkan"}
                className="w-auto h-auto max-w-full max-h-full object-contain mx-auto rounded-md" // Added rounded-md for image itself
            />
        </div>
      </div>
    </div>
  );
};