"use client";

import React, { useState } from "react";
import { menuItems, SidebarItem } from "./constants";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface AppSidebarProps {
  role: "admin" | "user" | "provider";
  jobId?: string; // optional for provider dynamic update links
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ role,jobId }) => {
    let items: SidebarItem[] = [];

    const menu = menuItems[role];

    // Resolve the menu if it's a function
    if (typeof menu === "function") {
        items = menu(jobId);
    } else {
        items = menu;
    }

    return (
        <Sidebar className="w-64 h-screen bg-white dark:bg-gray-900 shadow-lg">
            <SidebarContent className="flex flex-col h-full px-2 py-4">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-lg font-bold mb-4">
                        Dashboard
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItemWithSubmenu key={item.title} item={item} />
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

interface SidebarMenuItemWithSubmenuProps {
    item: SidebarItem;
}

const SidebarMenuItemWithSubmenu: React.FC<SidebarMenuItemWithSubmenuProps> = ({ item }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="space-y-1">
            <SidebarMenuItem>
                <SidebarMenuButton asChild>
                    <button
                        type="button"
                        onClick={() => item.children && setOpen(!open)}
                        className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        {item.icon && <item.icon className="w-5 h-5" />}
                        <span className="flex-1 text-left">
                            <Link href={item.url} className="w-full block">{item.title}</Link>
                        </span>
                        {item.children && (
                            <motion.span
                                animate={{ rotate: open ? 90 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="inline-block"
                            >
                                ▶
                            </motion.span>
                        )}
                    </button>
                </SidebarMenuButton>
            </SidebarMenuItem>

            {/* Submenu */}
            {item.children && (
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="ml-4 flex flex-col space-y-1 overflow-hidden"
                        >
                            {item.children.map((child) => (
                                <SidebarMenuItem key={child.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={child.url}
                                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-sm"
                                        >
                                            {child.icon && <child.icon className="w-4 h-4" />}
                                            {child.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};
