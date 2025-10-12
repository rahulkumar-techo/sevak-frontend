"use client";

import React from "react";
import { motion } from "framer-motion";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {

  return (
    <SidebarProvider>
      <div className="flex relative min-h-screen bg-gray-50 dark:bg-gray-950 w-full">
        {/* Sidebar */}
        <AppSidebar role="provider" jobId="1"/>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 min-h-screen overflow-y-auto  w-full"
        >
          {/* Optional sidebar trigger for mobile */}
          <SidebarTrigger className=" absolute top-1" />

          {/* Content */}
          <div className="w-full">{children}</div>
        </motion.main>
      </div>
    </SidebarProvider>
  );
}
