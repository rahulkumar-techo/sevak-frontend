"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";

export interface IMedia {
  jobImages?: { url: string }[];
  jobVideo?: { url: string };
}

interface Props {
  media: IMedia;
}

const JobMedia = ({ media }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const MAX_VISIBLE = 4;

  // Slice visible images
  const visibleImages = showAll
    ? media.jobImages
    : media.jobImages?.slice(0, MAX_VISIBLE);

  // Take first video if exists
  const video = media.jobVideo;

  // No media fallback
  if ((!media.jobImages || media.jobImages.length === 0) && !video) {
    return (
      <div className="w-full h-36 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg text-gray-500 dark:text-gray-400">
        No media available
      </div>
    );
  }

  return (
    <motion.div className="w-full mt-4 space-y-4">
      {/* Images */}
      {visibleImages && visibleImages.length > 0 && (
        <div>
          <h4 className="text-sm sm:text-base font-medium mb-2 text-gray-800 dark:text-gray-200">
            Images
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {visibleImages.map((imgObj, idx) => (
              <motion.div
                key={idx}
                className="relative w-full h-24 sm:h-32 rounded-lg overflow-hidden cursor-pointer border dark:border-gray-700 hover:scale-105 transition-transform"
                onClick={() => setSelectedImage(imgObj.url)}
              >
                <img
                  src={imgObj.url}
                  alt={`Job Image ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                  Image {idx + 1}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Show More / Less */}
          {media.jobImages && media.jobImages.length > MAX_VISIBLE && (
            <div className="flex justify-center mt-2">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-3 py-1 rounded-lg text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              >
                {showAll ? "Show Less" : "Show More"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Single Video */}
      {video && (
        <div>
          <h4 className="text-sm sm:text-base font-medium mb-2 text-gray-800 dark:text-gray-200">
            Video
          </h4>
          <div className="relative rounded-lg overflow-hidden border dark:border-gray-700">
            <video
              src={video.url}
              controls
              className="w-full h-40 sm:h-52 object-cover rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
              <Play className="text-white w-6 h-6 sm:w-10 sm:h-10" />
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Preview"
              className="max-w-[90vw] max-h-[80vh] rounded-lg shadow-lg object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-3 -right-3 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default JobMedia;
