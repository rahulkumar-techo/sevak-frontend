"use client";
import React from "react";
import { motion } from "framer-motion";

const FullScreenLoader = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col justify-center items-center z-50">
      <motion.div
        className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.p
        className="mt-4 text-green-600 font-semibold text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
      >
        Loading Sevak...
      </motion.p>
    </div>
  );
};

export default FullScreenLoader;
