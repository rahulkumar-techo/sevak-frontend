"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash, UploadCloud, FileText } from "lucide-react";
import { NoteFile } from "./NoteForm";

type Props = {
  initialFiles?: NoteFile[];
  onFilesSelect?: (files: NoteFile[]) => void;
};

const MultiFileUploader: React.FC<Props> = ({ initialFiles = [], onFilesSelect }) => {
  const [files, setFiles] = useState<NoteFile[]>([]);


  // Sync initial files (for edit mode)
useEffect(() => {
    if (initialFiles.length > 0 && files.length === 0) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  useEffect(() => {
    onFilesSelect?.(files);
  }, [files]);

  const handleFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: NoteFile[] = Array.from(selectedFiles).map((file) => ({
      file,
      type: file.type === "application/pdf" ? "pdf" : "image",
    }));

    const pdfExists = files.some((f) => f.type === "pdf");
    const selectedPdf = newFiles.find((f) => f.type === "pdf");
    const selectedImages = newFiles.filter((f) => f.type === "image");

    if (selectedPdf && pdfExists) {
      alert("Only 1 PDF allowed");
      return;
    }

    const currentImages = files.filter((f) => f.type === "image");
    if (currentImages.length + selectedImages.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    setFiles([...files, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => setFiles(files.filter((_, i) => i !== index));

  return (
    <div className="flex flex-col gap-2">
      <div
        onClick={() => document.getElementById("fileInput")?.click()}
        className="border-2 border-dashed p-3 flex items-center justify-center gap-2 cursor-pointer hover:border-blue-400"
      >
        <UploadCloud className="w-6 h-6 text-gray-400" />
        <span className="text-gray-500 text-sm">Select or drag images / 1 PDF</span>
        <input
          id="fileInput"
          type="file"
          className="hidden"
          accept="image/*,application/pdf"
          multiple
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="border rounded-md divide-y">
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 group">
              <div className="flex items-center gap-2">
                {file.type === "pdf" ? (
                  <FileText className="w-5 h-5 text-red-500" />
                ) : (
                  <img
                    src={file.file ? URL.createObjectURL(file.file) : file.url}
                    alt={file.file?.name || file.url}
                    className="w-8 h-8 rounded object-cover"
                  />
                )}
                <span className="text-xs truncate">{file.file?.name || file.url?.split("/").pop()}</span>
              </div>
              <Button size="sm" variant="destructive" onClick={() => handleRemoveFile(index)}>
                <Trash className="w-3 h-3 text-white" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiFileUploader;
