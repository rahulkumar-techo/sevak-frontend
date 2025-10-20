"use client";

import Link from "next/link";
import React from "react";
import { motion, Variants } from "framer-motion";

const navitemData = [
  { name: "Home", url: "/" },
  { name: "Notes", url: "/notes" },
  { name: "Services", url: "/services" },
  { name: "Contact", url: "/contact" },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

// ✅ Explicitly type animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const Navitems = ({ activeItem, isMobile }: Props) => {
  const baseClasses =
    "px-4 sm:px-5 md:px-6 text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] font-poppins font-[400] transition-all duration-300";

  return (
    <>
      {/* Desktop */}
      {!isMobile && (
        <motion.div
          className="hidden lg:flex"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {navitemData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={item.url}>
                <span
                  className={`${baseClasses} cursor-pointer ${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[green]"
                      : "dark:text-white text-black hover:text-[#37a39a]"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Mobile */}
      {isMobile && (
        <motion.div
          className="lg:hidden mt-5 w-full text-center flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {navitemData.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={item.url}>
                <span
                  className={`${baseClasses} cursor-pointer ${
                    activeItem === index
                      ? "dark:text-[#37a39a] text-[green]"
                      : "dark:text-white text-black hover:text-[#37a39a]"
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default Navitems;
