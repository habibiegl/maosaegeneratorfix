
export enum AspectRatio {
  SQUARE = "1:1",
  PORTRAIT = "9:16",
  LANDSCAPE = "16:9",
  PHOTO = "4:3",
  WIDE = "3:2",
}

export interface ImageOptions {
  numberOfImages: number;
  aspectRatio: AspectRatio;
}

export interface GeneratedImage {
  id: string;
  base64Image: string;
  promptUsed: string;
}

export interface HistoryEntry {
  id: string;
  prompt: string;
  options: ImageOptions;
  generatedImages: GeneratedImage[];
  timestamp: number;
}
