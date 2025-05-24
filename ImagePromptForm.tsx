import React, { useState } from 'react';
import { ImageOptions, AspectRatio } from '../types';
import { ASPECT_RATIO_OPTIONS, NUMBER_OF_IMAGES_OPTIONS } from '../constants';
import { SparklesIcon } from '@heroicons/react/24/solid'; // PaperAirplaneIcon tidak digunakan

interface ImagePromptFormProps {
  onGenerate: (prompt: string, options: ImageOptions) => void;
  isLoading: boolean;
  defaultOptions: ImageOptions;
}

export const ImagePromptForm: React.FC<ImagePromptFormProps> = ({ onGenerate, isLoading, defaultOptions }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [options, setOptions] = useState<ImageOptions>(defaultOptions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      alert("Harap masukkan deskripsi gambar.");
      return;
    }
    onGenerate(prompt, options);
  };

  const handleOptionChange = <K extends keyof ImageOptions,>(
    key: K,
    value: ImageOptions[K]
  ) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8 mb-8 md:mb-10">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-slate-300 mb-2">
          Deskripsi Gambar (Prompt)
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Contoh: Kucing astronot melayang di luar angkasa dengan latar belakang nebula berwarna-warni, gaya lukisan cat minyak digital."
          rows={4}
          className="w-full p-3.5 bg-slate-700/50 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-100 placeholder-slate-400 transition duration-200 ease-in-out"
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="aspectRatio" className="block text-sm font-medium text-slate-300 mb-2">
            Rasio Aspek
          </label>
          <select
            id="aspectRatio"
            value={options.aspectRatio}
            onChange={(e) => handleOptionChange('aspectRatio', e.target.value as AspectRatio)}
            className="w-full p-3.5 bg-slate-700/50 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-100"
            disabled={isLoading}
          >
            {ASPECT_RATIO_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="numberOfImages" className="block text-sm font-medium text-slate-300 mb-2">
            Jumlah Gambar
          </label>
          <select
            id="numberOfImages"
            value={options.numberOfImages}
            onChange={(e) => handleOptionChange('numberOfImages', parseInt(e.target.value))}
            className="w-full p-3.5 bg-slate-700/50 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-slate-100"
            disabled={isLoading}
          >
            {NUMBER_OF_IMAGES_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full flex items-center justify-center px-6 py-3.5 border border-transparent text-base font-semibold rounded-lg shadow-lg text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-purple-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 ease-in-out group transform hover:scale-105 active:scale-95"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sedang memproses...
          </>
        ) : (
          <>
            <SparklesIcon className="h-6 w-6 mr-2 text-yellow-300 group-hover:text-yellow-200 transition-transform duration-200 group-hover:scale-110" />
            Hasilkan Gambar
          </>
        )}
      </button>
    </form>
  );
};