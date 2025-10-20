"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import Navitems from "@/utils/Navitems";
import Profile from "./Profile";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { useMyProfileQuery } from "@/redux/features/auth/authApi";
import { logo } from "../../public";

type Props = {
  activeItem: number;
};

const Header: React.FC<Props> = ({ activeItem }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const { data: userQuery } = useMyProfileQuery();
  const { user } = useSelector((state: RootState) => state.auth);
  const isLoggedIn = !!user || !!userQuery;

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-black shadow-md transition-colors duration-500">
      <div className="w-[95%] lg:w-[92%] mx-auto h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
          <Image
            src={logo}
            alt="NovaNoteX Logo"
            width={140}
            height={35}
            className="object-contain w-24 h-7 sm:w-28 sm:h-8"
          />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-[#00ff99] to-[#b3ff00] text-transparent bg-clip-text">
              NovaNoteX
            </span>
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">AI Notes</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Navitems activeItem={activeItem} isMobile={false} />
          <ModeToggle theme="" />
          {isLoggedIn ? (
            <Profile
              avatar={user?.avatar?.url}
              fullName={user?.fullName}
              email={user?.email}
              id={user?._id || ""}
              roles={user?.roles}
            />
          ) : (
            <Button className="bg-[#00ff99] text-black hover:bg-[#b3ff00]">
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </nav>

        {/* Mobile Nav */}
        <div className="lg:hidden flex items-center gap-4">
          <ModeToggle theme="" />
          {isLoggedIn ? (
            <Profile
              avatar={user?.avatar?.url}
              fullName={user?.fullName}
              email={user?.email}
              id={user?._id || ""}
              roles={user?.roles}
            />
          ) : (
            <Button className="bg-[#00ff99] text-black hover:bg-[#b3ff00]">
              <Link href="/auth/login">Login</Link>
            </Button>
          )}

          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-gray-800 dark:text-white">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              ref={menuRef}
              className="fixed top-0 left-0 w-3/4 sm:w-1/2 h-full bg-white dark:bg-black text-black dark:text-white z-50 shadow-lg flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-700">
                <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                  <Image
                    src={logo}
                    alt="NovaNoteX Logo"
                    width={140}
                    height={35}
                    className="object-contain w-28 h-8 sm:w-32 sm:h-10"
                  />
                  <div className="flex flex-col leading-tight">
                    <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-[#00ff99] to-[#b3ff00] text-transparent bg-clip-text">
                      NovaNoteX
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">AI Notes</span>
                  </div>
                </Link>
                <button onClick={() => setMenuOpen(false)} className="text-2xl text-gray-800 dark:text-white">
                  <FiX />
                </button>
              </div>

              <nav className="flex flex-col mt-10 items-center space-y-6">
                <Navitems activeItem={activeItem} isMobile={true} />
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
