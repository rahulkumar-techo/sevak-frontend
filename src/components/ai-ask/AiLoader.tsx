"use client";

import React from "react";

export default function AiLoader() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">AI</div>
      <div className="flex-1">
        <div className="rounded-lg bg-white/6 p-3">
          <div className="flex items-center gap-2">
            <span className="dot animate-pulse inline-block w-2 h-2 rounded-full bg-white/80"></span>
            <span className="dot animate-pulse inline-block w-2 h-2 rounded-full bg-white/60 delay-150"></span>
            <span className="dot animate-pulse inline-block w-2 h-2 rounded-full bg-white/40 delay-300"></span>
            <div className="ml-3 text-sm opacity-80">Thinking…</div>
          </div>
        </div>
      </div>
    </div>
  );
}
