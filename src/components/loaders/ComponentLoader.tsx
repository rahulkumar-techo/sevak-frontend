"use client";
import React from "react";
import { motion } from "framer-motion";

const ComponentLoader = () => {
  return (
    <motion.div
      className="flex justify-center items-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-3 h-3 bg-green-600 rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, repeatType: "loop" }}
      />
      <motion.div
        className="w-3 h-3 bg-green-600 rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, repeatType: "loop", delay: 0.2 }}
      />
      <motion.div
        className="w-3 h-3 bg-green-600 rounded-full"
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 0.6, repeatType: "loop", delay: 0.4 }}
      />
    </motion.div>
  );
};

export default ComponentLoader;
