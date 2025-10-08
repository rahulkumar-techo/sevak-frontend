// hooks/useCompressFiles.ts
import { useState } from "react";
import imageCompression from "browser-image-compression";

export type CompressedFile = File;

type UseCompressFilesReturn = {
  compressImages: (files: File[]) => Promise<CompressedFile[]>;
  isCompressing: boolean;
  error: string | null;
};

export const useCompressFiles = (): UseCompressFilesReturn => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const compressImages = async (files: File[]): Promise<CompressedFile[]> => {
    setIsCompressing(true);
    setError(null);

    try {
      const compressedFiles = await Promise.all(
        files.map(async (file) => {
          if (file.type.startsWith("image/")) {
            const options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1024,
              useWebWorker: true,
            };
            return await imageCompression(file, options);
          }
          // videos are returned as-is
          return file;
        })
      );

      setIsCompressing(false);
      return compressedFiles;
    } catch (err) {
      console.error("Compression error:", err);
      setError("Failed to compress images");
      setIsCompressing(false);
      return files;
    }
  };

  return { compressImages, isCompressing, error };
};
