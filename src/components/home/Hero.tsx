"use client";

import { motion } from "framer-motion";
import React from "react";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      <div className="relative z-10 text-center px-6 lg:px-20 max-w-4xl mx-auto">
        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-4"
        >
          <span className="bg-gradient-to-r from-[#00ff99] to-[#b3ff00] text-transparent bg-clip-text">
            NovaNoteX
          </span>
          <br className="sm:hidden" />
          <span className="bg-gradient-to-r from-[#00ff99] to-[#b3ff00] text-transparent bg-clip-text">
            AI-Powered Notes
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
        >
          Transform handwritten and mixed-language notes into structured summaries, quizzes, and exam papers instantly.
        </motion.p>

        {/* Call-to-Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            className="inline-flex items-center justify-center px-8 py-3 bg-[#00ff99] dark:bg-[#00ff99] text-black dark:text-black font-semibold rounded-lg shadow-lg hover:bg-[#b3ff00] transition-colors duration-300 ease-in-out text-lg group"
          >
            Get Started
            <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Floating Gradient Blobs */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      >
        <div className="absolute top-1/4 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#00ff99] rounded-full filter blur-3xl opacity-10 animate-blob mix-blend-screen"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-[#b3ff00] rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-2000 mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 w-64 sm:w-80 h-64 sm:h-80 bg-[#00ff99] rounded-full filter blur-3xl opacity-10 animate-blob animation-delay-4000 mix-blend-screen transform -translate-x-1/2 -translate-y-1/2"></div>
      </motion.div>

      {/* Subtle Rotating Shapes */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      >
        <motion.div
          className="absolute bg-black/10 dark:bg-white/10 w-64 sm:w-72 h-64 sm:h-72 rounded-full -top-16 -left-16"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bg-black/10 dark:bg-white/10 w-80 sm:w-96 h-80 sm:h-96 rounded-full -bottom-20 -right-32"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
