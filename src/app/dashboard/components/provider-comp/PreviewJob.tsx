"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { JobFormValues } from "../../schemas/job.schema";
import { Card, CardContent } from "@/components/ui/card";

interface JobPreviewProps {
  previewData?: Partial<JobFormValues>;
}

const JobPreview: React.FC<JobPreviewProps> = ({ previewData }) => {
  const [displayImages, setDisplayImages] = useState<(File | string)[]>([]);
  const [displayVideo, setDisplayVideo] = useState<File | string | null>(null);
  const [showAllImages, setShowAllImages] = useState(false);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  useEffect(() => {
    if (previewData?.media?.jobImages) {
      const imgs = previewData.media.jobImages.map((f: any) => f.file || f.url) ?? [];
      setDisplayImages(imgs);
    } else {
      setDisplayImages([]);
    }

    if (previewData?.media?.jobVideo) {
      setDisplayVideo(previewData.media.jobVideo.file || previewData.media.jobVideo.url || null);
    } else {
      setDisplayVideo(null);
    }
  }, [previewData]);

  if (!previewData) {
    return (
      <Card className="p-6 text-center text-gray-500 dark:text-gray-400">
        No preview yet. Start filling the job form!
      </Card>
    );
  }

  const imagesToShow = showAllImages ? displayImages : displayImages.slice(0, 3);

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <Card className="shadow-md bg-white dark:bg-gray-900 dark:border-gray-700 transition-all">
        <CardContent className="space-y-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side: Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase mb-1">Title</h3>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-100">
                  {previewData.title || "Untitled Job"}
                </h2>
              </div>

              <div>
                <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase mb-1">Category & Type</h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {previewData.category || "No category"} • {previewData.jobType || "No type selected"}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase mb-1">Budget & Distance</h3>
                <div className="flex flex-wrap gap-2 text-sm md:text-base">
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    💰 ₹{previewData.budget || 0}
                  </span>
                  {previewData.distanceLimit && (
                    <span className="text-gray-600 dark:text-gray-400">📍 {previewData.distanceLimit} km</span>
                  )}
                </div>
              </div>

              {previewData.location && (
                <div>
                  <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase mb-1">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    📌 {[
                      previewData.location.address,
                      previewData.location.city,
                      previewData.location.state,
                      previewData.location.country,
                    ].filter(Boolean).join(", ") || "No address"}
                    {previewData.location.landmark && ` • Landmark: ${previewData.location.landmark}`}
                  </p>
                </div>
              )}
            </div>

            {/* Right side: Description & Media */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase mb-1">Description</h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
                  {previewData.description || "No description provided."}
                </p>
              </div>

              {(displayImages.length > 0 || displayVideo) && (
                <div>
                  <h3 className="font-semibold text-gray-500 dark:text-gray-400 text-sm uppercase mb-2">Media</h3>

                  {/* Images Grid */}
                  {imagesToShow.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-2">
                      {imagesToShow.map((img, index) => {
                        const src = typeof img === "string" ? img : URL.createObjectURL(img);
                        return (
                          <div
                            key={index}
                            className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden border dark:border-gray-700 hover:scale-105 transition-transform duration-200 cursor-pointer"
                            onClick={() => openLightbox(index)}
                          >
                            <Image src={src} alt={`Image ${index + 1}`} fill className="object-cover" />
                            <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">{`Image ${index + 1}`}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* See More */}
                  {displayImages.length > 3 && !showAllImages && (
                    <button
                      onClick={() => setShowAllImages(true)}
                      className="text-blue-600 dark:text-blue-400 text-sm mb-3"
                    >
                      See more images
                    </button>
                  )}

                  {/* Video */}
                  {displayVideo && (
                    <div className="w-full rounded-xl overflow-hidden border dark:border-gray-700 mt-2 relative">
                      <video
                        controls
                        className="w-full rounded-xl bg-black max-h-[200px] sm:max-h-[250px] object-contain"
                      >
                        <source
                          src={typeof displayVideo === "string" ? displayVideo : URL.createObjectURL(displayVideo)}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                      <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">Video</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>

        {/* Lightbox modal */}
        {lightbox.open && (
          <div
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div className="relative w-full max-w-3xl">
              <Image
                src={typeof displayImages[lightbox.index] === "string"
                  ? displayImages[lightbox.index] as string
                  : URL.createObjectURL(displayImages[lightbox.index] as File)
                }
                alt={`Image ${lightbox.index + 1}`}
                width={800}
                height={600}
                className="object-contain rounded-lg"
              />
              <button
                className="absolute top-2 right-2 text-white text-2xl font-bold"
                onClick={closeLightbox}
              >
                ×
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default JobPreview;
