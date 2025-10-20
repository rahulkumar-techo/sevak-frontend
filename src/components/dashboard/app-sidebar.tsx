"use client";

import React, { useId } from "react";
import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

import { adminMenu, studentMenu, teacherMenu } from "./menu-items";

type MenuItem = {
  title: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  path?: string;
  children?: MenuItem[];
};

type AppSidebarProps = {
  role: "student" | "teacher" | "admin";
  user: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
};

export const AppSidebar: React.FC<AppSidebarProps> = ({ role, user }) => {
  const menu = role === "student" ? studentMenu : role === "teacher" ? teacherMenu : adminMenu;

  const renderMenu = (items: MenuItem[]) =>
    items.map((item) => {
      const collapsibleId = useId(); // stable ID for Collapsible
      if (item.children) {
        return (
          <Collapsible key={item.title} className="group">
            <CollapsibleTrigger asChild>
              <SidebarMenuItem
                className="flex items-center justify-between gap-2 cursor-pointer px-2 py-2 rounded-md"
                aria-controls={collapsibleId}
              >
                <div className="flex items-center gap-2">
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.title}
                </div>
                <ChevronDown className="w-4 h-4 transition-transform group-data-[state=open]:rotate-180" />
              </SidebarMenuItem>
            </CollapsibleTrigger>
            <CollapsibleContent id={collapsibleId}>
              <div className="pl-5 mt-1 space-y-1">{renderMenu(item.children)}</div>
            </CollapsibleContent>
          </Collapsible>
        );
      } else {
        return (
          <Link key={item.title} href={item.path || "#"} passHref>
            <SidebarMenuItem className="flex items-center gap-2 px-2 py-2 rounded-md">
              {item.icon && <item.icon className="w-4 h-4" />}
              {item.title}
            </SidebarMenuItem>
          </Link>
        );
      }
    });

  return (
    <Sidebar className="flex flex-col justify-between h-full">
      {/* Header */}
      <SidebarHeader className="flex flex-col items-center py-4 border-b border-gray-200 gap-2">
        {user.avatarUrl ? (
          <img src={user.avatarUrl} className="w-12 h-12 rounded-full" />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-xl text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="text-center">
          <p className="font-semibold text-sm">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="flex-1 overflow-auto mt-2 px-2">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>{renderMenu(menu)}</SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium text-gray-600 flex items-center gap-1">
            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for Students
          </p>

          <span className="text-xs px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-sm">
            Logged in as <strong className="ml-1 capitalize">{role}</strong>
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
