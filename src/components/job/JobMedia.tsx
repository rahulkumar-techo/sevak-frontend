"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";

interface IMedia {
  images?: string[];
  videos?: string[];
}

interface Props {
  media: IMedia;
}

const JobMedia = ({ media }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const MAX_VISIBLE = 4;
  const visibleImages = showAll ? media.images : media.images?.slice(0, MAX_VISIBLE);
  const visibleVideos = showAll ? media.videos : media.videos?.slice(0, MAX_VISIBLE);

  if ((!media.images || !media.images.length) && (!media.videos || !media.videos.length)) {
    return (
      <div className="w-full h-36 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-lg text-gray-500">
        No media available
      </div>
    );
  }

  return (
    <motion.div className="w-full mt-4 space-y-4">
      {/* Images */}
      {visibleImages?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {visibleImages.map((img, idx) => (
            <motion.img
              key={idx}
              src={img}
              alt={`Job Image ${idx + 1}`}
              className="w-full h-24 sm:h-32 object-cover rounded-lg cursor-pointer hover:opacity-90 transition"
              whileHover={{ scale: 1.03 }}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      ) : null}

      {/* Videos */}
      {visibleVideos?.length ? (
        <div>
          <h4 className="text-sm sm:text-base font-medium mb-1 text-gray-800 dark:text-gray-200">Videos</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
            {visibleVideos.map((vid, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-lg overflow-hidden"
              >
                <video src={vid} controls className="w-full h-32 sm:h-40 object-cover rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <Play className="text-white w-6 h-6 sm:w-10 sm:h-10" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : null}

      {/* Show More / Less */}
      {(media.images?.length || 0) > MAX_VISIBLE || (media.videos?.length || 0) > MAX_VISIBLE ? (
        <div className="flex justify-center mt-2">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-3 py-1 rounded-lg text-xs sm:text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      ) : null}

      {/* Image Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }} className="relative">
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
