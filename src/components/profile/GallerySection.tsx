"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type FileItem = {
  file: File;
  url: string;
  fileId: string; // could be backend ID or file name
};

type Props = {
  galleryPhotos: FileItem[];
  videos: FileItem[];
  onSave?: (data: {
    images: File[];
    videos: File[];
    deletedFileIds: string[];
  }) => void;
  isLoading:boolean
};

const GallerySection = ({ galleryPhotos, videos, onSave,isLoading }: Props) => {
  const [images, setImages] = useState<FileItem[]>(galleryPhotos);
  const [videoList, setVideoList] = useState<FileItem[]>(videos);
  const [isEdit, setIsEdit] = useState(false);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  // 🖼️ Handle new images
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files);

    const newImages = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      fileId: file.name,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  // 🎥 Handle new videos
  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newFiles = Array.from(files);

    const newVideos = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      fileId: file.name,
    }));

    setVideoList((prev) => [...prev, ...newVideos]);
  };

  // ❌ Remove image
  const removeImage = (fileId: string) => {
    setDeletedFileIds((prev) => [...prev, fileId]);
    setImages(images.filter((img) => img.fileId !== fileId));
  };

  // ❌ Remove video
  const removeVideo = (fileId: string) => {
    setDeletedFileIds((prev) => [...prev, fileId]);
    setVideoList(videoList.filter((vid) => vid.fileId !== fileId));
  };

  // 💾 Save changes
  const handleSave = () => {
    const imageFiles = images.map((img) => img.file);
    const videoFiles = videoList.map((vid) => vid.file);

    onSave?.({ images: imageFiles, videos: videoFiles, deletedFileIds });
    setDeletedFileIds([]);
    setIsEdit(false);
  };

  // ↩️ Cancel edit
  const handleCancel = () => {
    setImages(galleryPhotos);
    setVideoList(videos);
    setDeletedFileIds([]);
    setIsEdit(false);
  };

  return (
    <Card className="w-full bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-700 shadow-md rounded-2xl mt-6">
      <CardHeader className="flex items-center justify-between pb-2">
        <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Gallery & Videos</CardTitle>
        {isEdit ? (
          <div className="flex gap-2">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => imageInputRef.current?.click()}>
              Add Images
            </Button>
            <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => videoInputRef.current?.click()}>
              Add Videos
            </Button>
          </div>
        ) : (
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => setIsEdit(true)}>
            Edit
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-2">
        {/* 🖼️ Images */}
        {images.length > 0 && (
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Images</p>
            <div className="grid grid-cols-3 gap-2">
              {(showAllImages ? images : images.slice(0, 3)).map((img) => (
                <div key={img.fileId} className="relative w-full h-24 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 group hover:shadow-lg transition">
                  <Image src={img.url} alt="Gallery Image" fill className="object-cover" />
                  {isEdit && (
                    <button
                      onClick={() => removeImage(img.fileId)}
                      className="absolute top-1 right-1 text-red-500 bg-gray-800 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      title="Delete Image"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {!showAllImages && images.length > 3 && (
                <div
                  className="relative w-full h-24 rounded-xl bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-black dark:text-white font-semibold text-lg cursor-pointer"
                  onClick={() => setShowAllImages(true)}
                >
                  +{images.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* 🎥 Videos */}
        {videoList.length > 0 && (
          <div>
            <p className="text-gray-700 dark:text-gray-300 mb-2 font-medium">Videos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(showAllVideos ? videoList : videoList.slice(0, 3)).map((vid) => (
                <div key={vid.fileId} className="relative w-full h-32 rounded-xl overflow-hidden border border-gray-300 dark:border-gray-700 bg-black group hover:shadow-lg transition">
                  <video src={vid.url} controls className="w-full h-full object-cover rounded-xl" />
                  {isEdit && (
                    <button
                      onClick={() => removeVideo(vid.fileId)}
                      className="absolute top-1 right-1 text-red-500 bg-gray-800 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                      title="Delete Video"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              {!showAllVideos && videoList.length > 3 && (
                <div
                  className="relative w-full h-32 rounded-xl bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-black dark:text-white font-semibold text-lg cursor-pointer"
                  onClick={() => setShowAllVideos(true)}
                >
                  +{videoList.length - 3} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* ✅ Action Buttons */}
        {isEdit && (
          <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-end">
            <Button className="bg-gray-700 hover:bg-gray-600 flex-1 sm:flex-auto" onClick={handleCancel}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-auto" onClick={handleSave} disabled={isLoading}>
             {
              isLoading ?" Save Changing...":" Save Changes"
             }
            </Button>
          </div>
        )}

        {/* Hidden Inputs */}
        <input ref={imageInputRef} type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
        <input ref={videoInputRef} type="file" accept="video/*" multiple onChange={handleVideoChange} className="hidden" />
      </CardContent>
    </Card>
  );
};

export default GallerySection;
