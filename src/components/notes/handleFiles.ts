// utils/fileHandler.ts
export const handleFiles = async (selectedFiles: FileList | File[] | null, currentFiles: File[] = []): Promise<File[]> => {
  try {
    if (!selectedFiles) throw new Error("No files provided");

    const filesArray = Array.isArray(selectedFiles) ? selectedFiles : Array.from(selectedFiles);

    if (filesArray.length === 0) throw new Error("No files provided");

    const isPDF = filesArray.every((file) => file.type === "application/pdf");
    const isImages = filesArray.every((file) => file.type.startsWith("image/"));

    if (!isPDF && !isImages) throw new Error("Cannot mix PDF and images");

    if (isPDF) {
      if (currentFiles.length > 0) throw new Error("Only one PDF allowed at a time");
      if (filesArray.length > 1) throw new Error("Select only one PDF");
      return filesArray;
    }

    if (isImages) {
      if (currentFiles.some((f) => f.type === "application/pdf")) throw new Error("Cannot add images with a PDF");
      const totalImages = currentFiles.length + filesArray.length;
      if (totalImages > 10) throw new Error("Maximum 10 images allowed");
      return [...currentFiles, ...filesArray];
    }

    return currentFiles;
  } catch (error: any) {
    console.error("File handling error:", error.message);
    throw error;
  }
};
