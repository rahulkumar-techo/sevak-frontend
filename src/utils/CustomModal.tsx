"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  isDirty?: boolean; // optional flag: form has unsaved changes
};

const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const modalVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 15 } },
  exit: { opacity: 0, y: 50, scale: 0.9 },
};

const CustomModal = ({ isOpen, onClose, children, title, isDirty }: Props) => {
  const [showConfirm, setShowConfirm] = useState(false);

  // ESC key to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleClose = () => {
    if (isDirty) {
      setShowConfirm(true);
    } else {
      onClose();
    }
  };

  const confirmClose = () => {
    setShowConfirm(false);
    onClose();
  };

  const cancelClose = () => setShowConfirm(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={handleClose}
        >
          <motion.div
            className="w-[90%] sm:w-[400px] md:w-[450px]"
            // variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="relative rounded-2xl shadow-xl border dark:border-gray-700 bg-white dark:bg-gray-900">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
              >
                <X size={22} />
              </button>

              {/* Title */}
              {title && <h2 className="text-xl font-semibold text-center pt-5 text-gray-800 dark:text-gray-200">{title}</h2>}

              <CardContent className="p-6">
                {children}

                {/* Confirm dialog */}
                {showConfirm && (
                  <div className="mt-4 p-4 border border-red-300 dark:border-red-600 rounded-lg bg-red-50 dark:bg-red-900/50 text-center">
                    <p className="mb-3 text-red-700 dark:text-red-400">You have unsaved changes. Do you want to cancel?</p>
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={confirmClose}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Yes, Cancel
                      </button>
                      <button
                        onClick={cancelClose}
                        className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 transition"
                      >
                        No, Keep Editing
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;
