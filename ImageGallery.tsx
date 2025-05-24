import React from 'react';
import { GeneratedImage } from '../types';
import { LoadingSpinner } from './LoadingSpinner';
import { PhotoIcon, ExclamationTriangleIcon, ArrowDownTrayIcon, EyeIcon } from '@heroicons/react/24/outline';

interface ImageGalleryProps {
  images: GeneratedImage[];
  isLoading: boolean;
  error: string | null;
  onImageClick: (image: GeneratedImage) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, isLoading, error, onImageClick }) => {
  const sanitizeFilename = (name: string): string => {
    return name.replace(/[^a-z0-9_.-]/gi, '_').replace(/__+/g, '_').slice(0, 100) || 'generated_image';
  };

  const handleDownload = (base64Image: string, promptUsed: string, imageId: string) => {
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${base64Image}`;
    const filename = `${sanitizeFilename(promptUsed)}_${imageId}.jpeg`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="text-center py-12 md:py-16">
        <LoadingSpinner />
        <p className="mt-6 text-lg text-slate-300 animate-subtlePulse">Sedang menghasilkan keajaiban...</p>
        <p className="text-sm text-slate-400">Mohon tunggu sebentar.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 md:py-12 bg-red-500 bg-opacity-10 p-6 rounded-xl border border-red-500/30">
        <ExclamationTriangleIcon className="h-16 w-16 text-red-400 mx-auto mb-5" />
        <p className="text-xl font-semibold text-red-300">Oops! Terjadi Kesalahan</p>
        <p className="mt-2 text-sm text-red-400 max-w-md mx-auto">{error}</p>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12 md:py-16 border-2 border-dashed border-slate-700 rounded-xl mt-8">
        <PhotoIcon className="h-20 w-20 text-slate-600 mx-auto mb-5" />
        <p className="text-xl text-slate-500 font-medium">Galeri Masih Kosong</p>
        <p className="mt-2 text-slate-400">Hasil karya AI Anda akan muncul di sini setelah dibuat.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 md:mt-10">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8 text-slate-100">Hasil Gambar Anda:</h2>
      <div className={`grid gap-6 md:gap-8 ${images.length === 1 ? 'max-w-lg mx-auto' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {images.map((image, index) => (
          <div 
            key={image.id} 
            className="bg-slate-700/50 rounded-xl shadow-xl overflow-hidden transition-all duration-300 group hover:shadow-purple-500/30 hover:border-purple-500/50 border border-transparent animate-slideInUp"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div 
              className="cursor-pointer relative aspect-[1/1] overflow-hidden" // Enforce square aspect ratio for container
              onClick={() => onImageClick(image)}
              onKeyDown={(e) => e.key === 'Enter' && onImageClick(image)}
              role="button"
              tabIndex={0}
              aria-label={`Lihat pratinjau gambar: ${image.promptUsed || 'gambar yang dihasilkan'}`}
            >
              <img
                src={`data:image/jpeg;base64,${image.base64Image}`}
                alt={image.promptUsed || "Generated image"}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <EyeIcon className="h-12 w-12 md:h-16 md:w-16 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 transform group-hover:scale-110" />
              </div>
            </div>
            <div className="p-4 md:p-5 bg-slate-800/70">
              <p className="text-xs text-slate-400 mb-3 truncate" title={image.promptUsed}>
                Prompt: {image.promptUsed || "Tidak ada prompt"}
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); handleDownload(image.base64Image, image.promptUsed, image.id); }}
                className="w-full flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                aria-label={`Unduh gambar untuk prompt: ${image.promptUsed}`}
              >
                <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
                Unduh Gambar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};