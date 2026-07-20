import { supabase } from "@/lib/supabase/client";

const getPublicUrl = (bucket: string, path: string): string => {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
};

const MAX_DIMENSION = 1920;
const JPEG_QUALITY = 0.82;

/** Downscales/re-encodes an image client-side so oversized camera photos never hit storage. */
const compressImage = async (file: File): Promise<File> => {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") return file;

  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob: Blob | null = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY),
    );
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
    return new File([blob], name, { type: "image/jpeg" });
  } catch {
    return file;
  }
};

export const uploadCarImage = async (file: File): Promise<{ path: string; publicUrl: string }> => {
  const compressed = await compressImage(file);
  const ext = compressed.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from("car-images").upload(path, compressed, {
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw error;
  return {
    path: data.path,
    publicUrl: getPublicUrl("car-images", data.path),
  };
};

export const uploadCarVideo = async (file: File): Promise<{ path: string; publicUrl: string }> => {
  const ext = file.name.split(".").pop() || "mp4";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { data, error } = await supabase.storage.from("car-videos").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return {
    path: data.path,
    publicUrl: getPublicUrl("car-videos", data.path),
  };
};

export const uploadCarImages = async (
  files: File[],
): Promise<Array<{ path: string; publicUrl: string }>> => {
  return Promise.all(files.map((file) => uploadCarImage(file)));
};

export const uploadCarVideos = async (
  files: File[],
): Promise<Array<{ path: string; publicUrl: string }>> => {
  return Promise.all(files.map((file) => uploadCarVideo(file)));
};
