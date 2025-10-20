"use client";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset
} from "@/components/ui/sidebar";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* Sidebar stays on left */}
      <AppSidebar
        role="student"
        user={{
          name: "Rahul Kumar",
          email: "rahul@student.com",
          avatarUrl: ""
        }}
      />

      {/* This makes content take FULL remaining width */}
      <SidebarInset className="flex flex-col w-full h-screen">
        {/* Top Header */}
        <header className="h-12 flex items-center px-4 border-b">
          <SidebarTrigger />
          <h1 className="ml-4 font-semibold">Student Panel</h1>
        </header>

        {/* Page Content Full Width */}
        <main className="flex-1 w-full overflow-auto p-4 ">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
