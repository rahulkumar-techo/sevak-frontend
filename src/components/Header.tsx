"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Navitems from "@/utils/Navitems";
import { FiMenu, FiX } from "react-icons/fi";
import { ModeToggle } from "./ModeToggle";
import Profile from "./Profile";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import LoginComp from "./auth/Login.component";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useMyProfileQuery } from "@/redux/features/auth/authApi";

type Props = {
  activeItem: number;

};

const Header = ({ activeItem, }: Props) => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isLogedIn, setIsLoggedIn] = useState<boolean>(false);


  const { data: userQuery } = useMyProfileQuery();
  const { user } = useSelector((state: RootState) => state.auth);
  console.log(user)

  useEffect(()=>{
    if(user||userQuery){
      setIsLoggedIn(!!user || !!userQuery)
    }
  },[user,userQuery])

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 85);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);




  return (
    <header
      className={`w-full z-[80] fixed top-0 left-0 transition-all duration-300 border-b border-gray-300 dark:border-[#ffffff1c]
        ${active ? "bg-white/70 dark:bg-gray-900/70 shadow-lg backdrop-blur-md" : "bg-transparent"}
      `}
    >
      <div className="w-[95%] lg:w-[92%] mx-auto h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-[20px] sm:text-[22px] md:text-[24px] lg:text-[25px] font-poppins font-bold dark:text-white text-black"
        >
          Sevak
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Navitems activeItem={activeItem} isMobile={false} />
          <ModeToggle />
          {
            isLogedIn && <Profile
              avatar={user?.avatar?.url}
              fullName={user?.fullName}
              email={user?.email}
              id={user?._id||""}
            />
          }
          {
            !isLogedIn && <LoginComp />
          }
        </nav>

        {/* Mobile */}
        <div className="lg:hidden flex items-center gap-4">
          <ModeToggle />
          {
            isLogedIn && <Profile
              avatar={user?.avatar?.url}
              fullName={user?.fullName}
              id={user?._id||""}
              email={user?.email} />
              

          }
          {
            !isLogedIn && <LoginComp />
          }

          {
            !open && <button
              onClick={() => setOpen(!open)}
              className="text-2xl text-black dark:text-white"
            >
              {open ? <FiX /> : <FiMenu />}
            </button>
          }
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay (click outside to close) */}
            <motion.div
              className="fixed top-0 left-0 w-full h-full bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Side Menu */}
            <motion.div
              ref={menuRef}
              className="fixed top-0 left-0 w-[70%] sm:w-[50%] h-full bg-white dark:bg-gray-900 z-50 shadow-lg flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
            >
              <div className="flex justify-between items-center p-5 border-b border-gray-300 dark:border-[#ffffff1c]">
                <Link
                  href="/"
                  className="text-[22px] font-poppins font-bold dark:text-white text-black"
                  onClick={() => setOpen(false)}
                >
                  Sevak
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="text-2xl text-black dark:text-white"
                >
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
