"use client";

import React from "react";

export default function AiChatHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/6 dark:bg-black/60 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 shadow-md flex items-center justify-center text-white font-bold">
              NX
            </div>
            <div>
              <h1 className="text-sm sm:text-lg font-semibold leading-tight">Ask AI — NovaNoteX</h1>
              <p className="text-xs opacity-80">Get clear answers, instantly — mobile-first, student friendly</p>
            </div>
          </div>

          <nav className="hidden sm:flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-md text-sm bg-white/10 hover:bg-white/20 transition">Docs</button>
            <button className="px-3 py-1.5 rounded-md text-sm bg-white/10 hover:bg-white/20 transition">Examples</button>
          </nav>

          <div className="sm:hidden">
            <button aria-label="open menu" className="p-2 rounded-lg bg-white/6">
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
