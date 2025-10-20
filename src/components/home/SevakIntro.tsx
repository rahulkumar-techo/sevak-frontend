"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import MAP3D from "../../../public/3d-map.png";

const NovaNoteIntro = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-16 overflow-hidden bg-white dark:bg-black transition-colors duration-500">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Left – 3D Illustration */}
 <div className="relative w-72 h-72 lg:w-96 lg:h-96 perspective-1000 rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={MAP3D}
              alt="NovaNoteX AI Visualization"
              className="object-cover w-full h-full mix-blend-overlay opacity-80"
            />
          </div>

        {/* Right – App Details */}
        <motion.div
          className="w-full lg:w-1/2 mt-10 lg:mt-0 lg:ml-12 text-center lg:text-left space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold">
            <span className="bg-gradient-to-r from-[#00ff99] to-[#b3ff00] text-transparent bg-clip-text">
              NovaNoteX
            </span>
            <br />
            AI-Powered Learning
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl leading-relaxed">
            Transform your handwritten and mixed-language notes into structured summaries, adaptive quizzes, and ready-to-use exam papers. Study smarter with AI-driven insights.
          </p>

          <ul className="space-y-2 text-gray-600 dark:text-gray-300 list-none text-left">
            <li>✅ AI-generated summaries & quizzes</li>
            <li>✅ Adaptive learning & performance tracking</li>
            <li>✅ Offline mode & multi-language support</li>
          </ul>

          <div className="pt-4">
            <Button size="lg" className="bg-[#00ff99] text-black dark:text-black hover:bg-[#b3ff00]">
              Explore NovaNoteX
            </Button>
          </div>
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

export default NovaNoteIntro;
