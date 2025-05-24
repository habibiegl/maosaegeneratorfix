
import { ImageOptions, AspectRatio } from './types';

export const APP_TITLE = "Maosae Image Generator";
export const APP_DESCRIPTION = "Buat gambar unik dan menakjubkan dengan kekuatan kecerdasan buatan. Cukup masukkan deskripsi Anda dan biarkan AI mewujudkannya.";

export const DEFAULT_IMAGE_OPTIONS: ImageOptions = {
  numberOfImages: 1,
  aspectRatio: AspectRatio.SQUARE,
};

export const ASPECT_RATIO_OPTIONS = [
  { label: "Persegi (1:1)", value: AspectRatio.SQUARE },
  { label: "Potret (9:16)", value: AspectRatio.PORTRAIT },
  { label: "Lanskap (16:9)", value: AspectRatio.LANDSCAPE },
  { label: "Foto (4:3)", value: AspectRatio.PHOTO },
  { label: "Lebar (3:2)", value: AspectRatio.WIDE },
];

export const NUMBER_OF_IMAGES_OPTIONS = [
  { label: "1 Gambar", value: 1 },
  { label: "2 Gambar", value: 2 },
  { label: "4 Gambar", value: 4 },
];