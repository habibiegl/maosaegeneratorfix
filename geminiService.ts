
import { GoogleGenAI, GenerateImagesResponse } from "@google/genai";
import { ImageOptions, GeneratedImage } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn(
    "API Key untuk Google Gemini tidak ditemukan. Harap atur variabel lingkungan API_KEY."
  );
}

// Fixed: Changed GoogleGenAI constructor to accept named parameter apiKey
const ai = new GoogleGenAI({ apiKey: API_KEY! }); // API_KEY might be undefined, but GoogleGenAI handles this gracefully by erroring on call.

export const generateImagesWithGemini = async (prompt: string, options: ImageOptions): Promise<GeneratedImage[]> => {
  if (!API_KEY) {
    throw new Error("API Key untuk Google Gemini belum dikonfigurasi.");
  }

  try {
    // Fixed: Changed GenerateImageResponse to GenerateImagesResponse
    const response: GenerateImagesResponse = await ai.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: {
        numberOfImages: options.numberOfImages,
        outputMimeType: 'image/jpeg',
        // @ts-ignore - AspectRatio type from our types.ts might not perfectly match SDK's expected string values,
        // but the values themselves are compatible (e.g., "1:1"). The SDK will validate.
        aspectRatio: options.aspectRatio,
        // You can add other parameters like negativePrompt, seed, etc. here
      },
    });

    if (!response.generatedImages || response.generatedImages.length === 0) {
      throw new Error("Tidak ada gambar yang dihasilkan oleh API.");
    }
    
    return response.generatedImages.map((imgData, index) => ({
        id: `${Date.now()}-${index}`, // Simple unique ID
        base64Image: imgData.image.imageBytes, // This is already a base64 string
        promptUsed: prompt, 
    }));

  } catch (error) {
    console.error("Kesalahan pada Gemini API:", error);
    if (error instanceof Error) {
        // Check for common API key related errors or other specific messages
        if (error.message.includes('API key not valid')) {
             throw new Error("API Key tidak valid. Harap periksa kembali API Key Anda.");
        }
         throw new Error(`Kesalahan API: ${error.message}`);
    }
    throw new Error("Terjadi kesalahan yang tidak diketahui saat menghubungi Gemini API.");
  }
};