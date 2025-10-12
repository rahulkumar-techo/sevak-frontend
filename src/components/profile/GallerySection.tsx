"use client";

import React, { useState, ChangeEvent, useRef, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCompressFiles, CompressedFile } from "@/hooks/useCompressFiles";

export type FileItem = {
  file: File;
  url: string;
  fileId: string;
};

type Props = {
  galleryPhotos: FileItem[];
  videos: FileItem[];
  onSave?: (data: {
    images: FileItem[];
    videos: FileItem[];
    deletedFileIds: string[];
  }) => void;
  isLoading?: boolean;
};

const MAX_IMG = 5;
const MAX_VID = 5;

const GallerySection = ({ galleryPhotos, videos, onSave, isLoading }: Props) => {
  const [images, setImages] = useState<FileItem[]>(galleryPhotos);
  const [videoList, setVideoList] = useState<FileItem[]>(videos);
  const [isEdit, setIsEdit] = useState(false);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const { compressImages, isCompressing } = useCompressFiles();

  useEffect(() => setImages(galleryPhotos), [galleryPhotos]);
  useEffect(() => setVideoList(videos), [videos]);
  useEffect(() => { if (!isLoading) setIsEdit(false); }, [isLoading]);

  const handleFiles = async (files: File[], type: "image" | "video") => {
    if (!files.length) return;

    if (type === "image" && images.length + files.length > MAX_IMG) {
      alert(`You can upload maximum ${MAX_IMG} images`);
      return;
    }
    if (type === "video" && videoList.length + files.length > MAX_VID) {
      alert(`You can upload maximum ${MAX_VID} videos`);
      return;
    }

    // compress only images
    const processedFiles = type === "image" ? await compressImages(files) : files;

    const newItems: FileItem[] = processedFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      fileId: file.name,
    }));

    type === "image" ? setImages(prev => [...prev, ...newItems]) : setVideoList(prev => [...prev, ...newItems]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFiles(Array.from(e.target.files), "image");
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    handleFiles(Array.from(e.target.files), "video");
  };

  const removeFile = (fileId: string, type: "image" | "video") => {
    setDeletedFileIds(prev => [...prev, fileId]);
    type === "image" ? setImages(images.filter(img => img.fileId !== fileId))
                      : setVideoList(videoList.filter(vid => vid.fileId !== fileId));
  };

  const handleSave = () => {
    onSave?.({ images, videos: videoList, deletedFileIds });
    setDeletedFileIds([]);
  };

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
            <Button size="sm" onClick={() => imageInputRef.current?.click()}>Add Images</Button>
            <Button size="sm" onClick={() => videoInputRef.current?.click()}>Add Videos</Button>
          </div>
        ) : <Button size="sm" onClick={() => setIsEdit(true)}>Edit</Button>}
      </CardHeader>

      <CardContent className="flex flex-col gap-6 pt-2">
        {/* Images */}
        {images&&images.length > 0 && (
          <div>
            <p className="font-medium mb-2">Images</p>
            <div className="grid grid-cols-3 gap-2">
              {(showAllImages ? images : images.slice(0, 3)).map(img => (
                <div key={img.fileId} className="relative w-full h-24 rounded-xl overflow-hidden border group hover:shadow-lg">
                  <Image src={img.url} alt="Gallery" fill className="object-cover" />
                  {isEdit && <button onClick={() => removeFile(img.fileId, "image")} className="absolute top-1 right-1 text-red-500 bg-gray-800 p-1 rounded-full opacity-0 group-hover:opacity-100">✕</button>}
                </div>
              ))}
              {!showAllImages && images.length > 3 && <div onClick={() => setShowAllImages(true)} className="cursor-pointer rounded-xl bg-gray-300 dark:bg-gray-700 flex items-center justify-center">{`+${images.length - 3} more`}</div>}
            </div>
          </div>
        )}

        {/* Videos */}
        {videoList&&videoList.length > 0 && (
          <div>
            <p className="font-medium mb-2">Videos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(showAllVideos ? videoList : videoList.slice(0, 3)).map(vid => (
                <div key={vid.fileId} className="relative w-full h-32 rounded-xl overflow-hidden border bg-black group hover:shadow-lg">
                  <video src={vid.url} controls className="w-full h-full object-cover rounded-xl" />
                  {isEdit && <button onClick={() => removeFile(vid.fileId, "video")} className="absolute top-1 right-1 text-red-500 bg-gray-800 p-1 rounded-full opacity-0 group-hover:opacity-100">✕</button>}
                </div>
              ))}
              {!showAllVideos && videoList.length > 3 && <div onClick={() => setShowAllVideos(true)} className="cursor-pointer rounded-xl bg-gray-300 dark:bg-gray-700 flex items-center justify-center">{`+${videoList.length - 3} more`}</div>}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isEdit && (
          <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-end">
            <Button className="bg-gray-700 hover:bg-gray-600" onClick={handleCancel}>Cancel</Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleSave} disabled={isLoading || isCompressing}>
              {isLoading || isCompressing ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}

        {/* Hidden inputs */}
        <input ref={imageInputRef} type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
        <input ref={videoInputRef} type="file" accept="video/*" multiple onChange={handleVideoChange} className="hidden" />
      </CardContent>
    </Card>
  );
};

export default GallerySection;
