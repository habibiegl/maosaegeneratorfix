import React from 'react';
import { HistoryEntry, AspectRatio, GeneratedImage } from '../types';
import { ClockIcon, AdjustmentsHorizontalIcon, ArrowDownTrayIcon, ArchiveBoxXMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import { ASPECT_RATIO_OPTIONS } from '../constants';

interface HistoryDisplayProps {
  history: HistoryEntry[];
  onImageClick: (image: GeneratedImage) => void;
}

export const HistoryDisplay: React.FC<HistoryDisplayProps> = ({ history, onImageClick }) => {
  if (history.length === 0) {
    return (
      <div className="text-center py-12 md:py-16 mt-8 bg-slate-800 bg-opacity-60 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <ArchiveBoxXMarkIcon className="h-16 w-16 text-slate-500 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-slate-400">Riwayat Generasi Masih Kosong</h3>
        <p className="text-slate-500 mt-1">Jejak kreasi Anda akan terekam di sini.</p>
      </div>
    );
  }

  const getAspectRatioLabel = (value: AspectRatio): string => {
    const option = ASPECT_RATIO_OPTIONS.find(opt => opt.value === value);
    return option ? option.label : value;
  };

  const sanitizeFilename = (name: string): string => {
    return name.replace(/[^a-z0-9_.-]/gi, '_').replace(/__+/g, '_').slice(0, 100) || 'history_image';
  };

  const handleDownload = (base64Image: string, promptUsed: string, imageId: string, historyId: string) => {
    const link = document.createElement('a');
    link.href = `data:image/jpeg;base64,${base64Image}`;
    const filename = `history_${sanitizeFilename(promptUsed)}_${historyId}_${imageId}.jpeg`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-8 md:mt-10">
      <h2 className="text-3xl font-semibold mb-6 md:mb-8 text-slate-100 text-center">
        Riwayat Kreasi Anda
      </h2>
      <div className="flex overflow-x-auto space-x-4 pb-6 pt-2 custom-horizontal-scrollbar"> {/* Horizontal scroll container */}
        {history.map((entry, index) => (
          <div 
            key={entry.id} 
            className="flex-none w-72 sm:w-80 bg-slate-800 bg-opacity-70 backdrop-blur-md shadow-lg rounded-xl p-4 transition-all duration-300 hover:shadow-purple-500/30 border border-slate-700 hover:border-purple-500/50 animate-slideInUp"
            style={{ animationDelay: `${index * 100}ms`, opacity: 0 }} 
            >
            <div className="mb-3 pb-3 border-b border-slate-700">
              <p className="text-xs text-slate-400 flex items-center mb-1.5">
                <ClockIcon className="h-3.5 w-3.5 mr-1.5 text-slate-500 flex-shrink-0" />
                {new Date(entry.timestamp).toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-sm font-medium text-purple-300 break-words line-clamp-2" title={entry.prompt}>
                {entry.prompt}
              </p>
              <div className="mt-2 text-xs text-slate-400 flex flex-col space-y-0.5">
                <span className="flex items-center"><AdjustmentsHorizontalIcon className="h-3.5 w-3.5 mr-1.5 text-slate-500 flex-shrink-0" />Rasio: {getAspectRatioLabel(entry.options.aspectRatio)}</span>
                <span>Jumlah: {entry.options.numberOfImages}</span>
              </div>
            </div>
            
            {entry.generatedImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 items-start">
                {entry.generatedImages.map((image) => (
                  <div key={image.id} className="bg-slate-700/50 rounded-md shadow-sm overflow-hidden group transition-all duration-300 hover:ring-2 hover:ring-purple-500">
                    <div 
                      className="cursor-pointer relative aspect-[1/1] overflow-hidden"
                      onClick={() => onImageClick(image)}
                      onKeyDown={(e) => e.key === 'Enter' && onImageClick(image)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Lihat pratinjau gambar riwayat: ${entry.prompt || 'gambar yang dihasilkan'}`}
                    >
                      <img
                        src={`data:image/jpeg;base64,${image.base64Image}`}
                        alt={image.promptUsed || "Generated image from history"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                         <EyeIcon className="h-8 w-8 text-white opacity-0 group-hover:opacity-75 transition-opacity duration-300" />
                       </div>
                    </div>
                    <div className="p-2 bg-slate-700/40">
                       <button
                        onClick={(e) => { e.stopPropagation(); handleDownload(image.base64Image, entry.prompt, image.id, entry.id); }}
                        className="w-full flex items-center justify-center px-2 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-slate-800 focus:ring-purple-400 transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95"
                        aria-label={`Unduh gambar riwayat untuk prompt: ${entry.prompt}`}
                      >
                        <ArrowDownTrayIcon className="h-3.5 w-3.5 mr-1" />
                        Unduh
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-slate-500 py-3 text-sm">Tidak ada gambar.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
