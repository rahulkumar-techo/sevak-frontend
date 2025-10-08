"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import MAP3D from "../../../public/3d-map.png"

const SevakIntro = () => {
  return (
    <section className="relative bg-gradient-to-r from-[#37a39a] to-[#2c3e50] text-white min-h-[80vh] flex items-center mt-[60px] overflow-hidden">
      <div className="container mx-auto px-6 lg:px-20 flex flex-col lg:flex-row items-center justify-between relative z-10">
        
        {/* Left side – 3D rotating map */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center"
          animate={{
            rotateY: [0, 25, 0, -25, 0], // subtle left-right rotation
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        >
          <div className="relative w-72 h-72 lg:w-96 lg:h-96 perspective-1000">
            <motion.div
              className="rounded-full overflow-hidden shadow-2xl"
             style={{
      transformStyle: "preserve-3d",
      transformOrigin: "50% 50%", // rotate around its own center
      boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
    }}
    animate={{
      rotateY: [0, 360], // continuous rotation around vertical axis
      rotateX: [0, 0],   // keep X axis fixed, prevents flipping
    }}
    transition={{
      repeat: Infinity,
      duration: 20,  // slower for realistic Earth-like rotation
      ease: "linear",
    }}
            >
              <div className="w-full h-full relative">
                <Image
                  src={MAP3D||"/3d-map.png"}
                  alt="3D Map"
                //   fill
                  className="object-cover mix-blend-overlay opacity-90"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side – app details */}
        <motion.div
          className="w-full lg:w-1/2 mt-10 lg:mt-0 lg:ml-12 text-center lg:text-left space-y-6"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold">
            Sevak – Your Nearby Helper
          </h1>
          <p className="text-white text-lg leading-relaxed">
            Sevak connects you with local job seekers and service providers within
            a 20 km radius. Whether you need a plumber, driver, or helper —
            finding help has never been easier.
          </p>
          <ul className="space-y-2">
            <li>✅ Real-time location matching</li>
            <li>✅ Easy map-based discovery</li>
            <li>✅ Visual interface for all users</li>
          </ul>
          <div className="pt-4">
            <Button size="lg" className="bg-white text-[#2c3e50] hover:bg-gray-200">
              Explore Sevak
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SevakIntro;
