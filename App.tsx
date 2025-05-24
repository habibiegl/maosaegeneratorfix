
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImagePromptForm } from './components/ImagePromptForm';
import { ImageGallery } from './components/ImageGallery';
import { HistoryDisplay } from './components/HistoryDisplay';
import { Footer } from './components/Footer';
import { ImagePreviewModal } from './components/ImagePreviewModal';
import { GeneratedImage, ImageOptions, HistoryEntry } from './types';
import { generateImagesWithGemini } from './services/geminiService';
import { DEFAULT_IMAGE_OPTIONS } from './constants';

const App: React.FC = () => {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [previewImage, setPreviewImage] = useState<GeneratedImage | null>(null);

  const handleGenerateImages = useCallback(async (prompt: string, options: ImageOptions) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateImagesWithGemini(prompt, options);
      setGeneratedImages(images);

      const newHistoryEntry: HistoryEntry = {
        id: `${Date.now()}-hist`,
        prompt,
        options,
        generatedImages: images,
        timestamp: Date.now(),
      };
      setHistory(prevHistory => [newHistoryEntry, ...prevHistory].slice(0, 20));
    } catch (err) {
      console.error("Kesalahan saat menghasilkan gambar:", err);
      if (err instanceof Error) {
        setError(`Gagal menghasilkan gambar: ${err.message}. Pastikan API Key Anda telah diatur dengan benar di variabel lingkungan.`);
      } else {
        setError("Gagal menghasilkan gambar. Terjadi kesalahan yang tidak diketahui.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const openPreviewModal = (image: GeneratedImage) => {
    setPreviewImage(image);
  };

  const closePreviewModal = () => {
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 text-gray-100 animate-fadeIn">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-slate-800 bg-opacity-60 backdrop-blur-lg shadow-2xl rounded-xl p-6 md:p-10 border border-slate-700">
          <ImagePromptForm
            onGenerate={handleGenerateImages}
            isLoading={isLoading}
            defaultOptions={DEFAULT_IMAGE_OPTIONS}
          />
          <ImageGallery
            images={generatedImages}
            isLoading={isLoading}
            error={error}
            onImageClick={openPreviewModal}
          />
        </div>
        
        <div className="w-full max-w-4xl mt-12 md:mt-16">
           <HistoryDisplay 
            history={history} 
            onImageClick={openPreviewModal}
           />
        </div>
      </main>
      <Footer />
      {previewImage && (
        <ImagePreviewModal 
          image={previewImage} 
          onClose={closePreviewModal} 
        />
      )}
    </div>
  );
};

export default App;