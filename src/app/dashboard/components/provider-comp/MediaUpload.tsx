"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";

export type MediaItem = {
  file?: File;        // optional if already uploaded
  url?: string;       // existing file URL
  fileId: string;
};

export type MediaUploadValue = {
  jobImages?: MediaItem[];
  jobVideo?: MediaItem;
  deletedFileIds?: string[];
};

type Props = {
  value?: MediaUploadValue;
  onChange: (value: MediaUploadValue) => void;
};

const MediaUpload = ({ value, onChange }: Props) => {
  // Preview URLs for newly uploaded files
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [videoPreview, setVideoPreview] = useState<string>("");

  useEffect(() => {
    // Images: use File or URL
    const previews =
      value?.jobImages?.map((img) =>
        img.file ? URL.createObjectURL(img.file) : img.url || ""
      ) || [];
    setImagePreviews(previews);

    // Video: use File or URL
    const vid =
      value?.jobVideo?.file
        ? URL.createObjectURL(value.jobVideo.file)
        : value?.jobVideo?.url || "";
    setVideoPreview(vid);

    // Cleanup object URLs on unmount
    return () => {
      previews.forEach((p) => URL.revokeObjectURL(p));
      if (vid) URL.revokeObjectURL(vid);
    };
  }, [value]);

  // --- Upload Handlers ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploaded: MediaItem[] = Array.from(files).map((file, i) => ({
      file,
      fileId: `temp-${Date.now()}-${i}`,
    }));

    onChange({
      ...value,
      jobImages: [...(value?.jobImages || []), ...uploaded].slice(0, 5),
    });
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const video: MediaItem = {
      file,
      fileId: `video-${Date.now()}`,
    };

    onChange({ ...value, jobVideo: video });
  };

  // --- Removal Handlers ---
  const removeImage = (fileId: string) => {
    const updated = value?.jobImages?.filter((f) => f.fileId !== fileId) || [];
    onChange({
      ...value,
      jobImages: updated,
      deletedFileIds: [...(value?.deletedFileIds || []), fileId],
    });
  };

  const removeVideo = () => {
    if (value?.jobVideo) {
      onChange({
        ...value,
        jobVideo: undefined,
        deletedFileIds: [...(value?.deletedFileIds || []), value.jobVideo.fileId],
      });
    }
  };

  return (
    <div className="space-y-6 border rounded-2xl p-5 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      {/* --- Image Upload --- */}
      <div>
        <label className="block font-medium mb-2 text-gray-800 dark:text-gray-100">
          Upload Images <span className="text-sm text-gray-500">(Max 5)</span>
        </label>
        <div className="flex items-center gap-3">
          <input
            id="jobImages"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("jobImages")?.click()}
            className="flex items-center gap-2"
          >
            <Upload size={16} /> Select Images
          </Button>
        </div>

        {value?.jobImages?.length ? (
          <div className="flex flex-wrap gap-3 mt-3">
            {value.jobImages.map((img, i) => (
              <div
                key={img.fileId}
                className="relative group w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden border dark:border-gray-600"
              >
                <img
                  src={img.file ? URL.createObjectURL(img.file) : img.url}
                  alt={img.file?.name || "image"}
                  className="object-cover w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => removeImage(img.fileId)}
                  className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
            No images uploaded yet.
          </p>
        )}
      </div>

      {/* --- Video Upload --- */}
      <div>
        <label className="block font-medium mb-2 text-gray-800 dark:text-gray-100">
          Upload Video
        </label>
        <div className="flex items-center gap-3">
          <input
            id="jobVideo"
            type="file"
            accept="video/*"
            onChange={handleVideoUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById("jobVideo")?.click()}
            className="flex items-center gap-2"
          >
            <Upload size={16} /> Select Video
          </Button>
        </div>

        {value?.jobVideo ? (
          <div className="relative mt-3 w-40 sm:w-48 rounded-lg overflow-hidden border dark:border-gray-600 p-2">
            {value.jobVideo.file ? (
              <video
                src={URL.createObjectURL(value.jobVideo.file)}
                controls
                className="w-full h-28 object-cover"
              />
            ) : (
              <video
                src={value.jobVideo.url}
                controls
                className="w-full h-28 object-cover"
              />
            )}
            <button
              type="button"
              onClick={removeVideo}
              className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2 dark:text-gray-400">
            No video uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MediaUpload;
