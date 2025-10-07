"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#37a39a] to-[#2c3e50] text-white min-h-[80vh] flex items-center mt-[60px] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 space-y-6"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Find Jobs & Services <br /> Near You
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100">
            Sevak helps you discover jobs and local services within a 20 km radius quickly and easily, even if you’re illiterate.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <Button className="bg-white text-[#2c3e50] hover:bg-gray-100 transition-all">
              Get Started
            </Button>
            <Button className="bg-transparent border border-white hover:bg-white hover:text-[#2c3e50] transition-all">
              Learn More
            </Button>
          </div>
        </motion.div>

        {/* Right Image / Illustration */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center"
        >
           <div className="lg:w-80 lg:h-80 w-full max-w-lg overflow-hidden shadow-2xl rounded-full">
            <img
              src="/hero.png" // replace with your illustration
              alt="Hero Illustration"
              className="w-full h-auto"
            />
          </div>
        </motion.div>

      </div>

      {/* Animated Background Circles */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
      >
        <motion.div
          className="absolute bg-white/10 w-72 h-72 rounded-full -top-16 -left-16"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
        ></motion.div>
        <motion.div
          className="absolute bg-white/10 w-96 h-96 rounded-full -bottom-20 -right-32"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        ></motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
