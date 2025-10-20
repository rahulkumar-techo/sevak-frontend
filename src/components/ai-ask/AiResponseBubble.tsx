"use client";

import React from "react";
import { motion } from "framer-motion";

type Props = {
  response: string;
};

export default function AiResponseBubble({ response }: Props) {
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">AI</div>
      <div className="flex-1">
        <div className="rounded-2xl p-4 bg-gradient-to-br from-indigo-800/80 via-purple-800/80 to-black/70 text-sm shadow-inner ring-1 ring-white/6 prose max-w-none break-words whitespace-pre-wrap">
          {response}
        </div>

        <div className="mt-2 flex gap-2">
          <button onClick={() => { navigator.clipboard?.writeText(response).catch(()=>{}); }} className="text-xs px-2 py-1 rounded-md border border-white/8">Copy</button>
          <button onClick={() => { /* placeholder: parent can clear if needed */ }} className="text-xs px-2 py-1 rounded-md border border-white/8">Share</button>
        </div>
      </div>
    </motion.div>
  );
}
