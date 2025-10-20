"use client";

import React, { useEffect, useState, useRef } from "react";
import AiResponseBubble from "./AiResponseBubble";

type ChatHistoryItem = {
  question: string;
  answer: string;
};

export default function AiChatHistory() {
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load history from localStorage
    const stored = localStorage.getItem("aiHistory");
    if (stored) {
      setHistory(JSON.parse(stored));
    } else {
      // Dummy history if nothing is stored
      const dummyHistory: ChatHistoryItem[] = [
        { question: "What is photosynthesis?", answer: "Photosynthesis is the process by which green plants use sunlight to synthesize foods from carbon dioxide and water." },
        { question: "MCQ: What is 2+2?", answer: "Answer: 4" },
        { question: "Explain gravity in short.", answer: "Gravity is the force that attracts two bodies toward each other, giving weight to objects." },
      ];
      setHistory(dummyHistory);
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when new message arrives
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  return (
    <div
      ref={containerRef}
      className="max-h-[400px] overflow-y-auto space-y-4 p-3 bg-black/20 rounded-2xl border border-white/10 shadow-inner"
    >
      {history.map((item, idx) => (
        <div key={idx} className="space-y-2">
          {/* User question */}
          <div className="flex justify-end">
            <div className="inline-block rounded-2xl bg-white/10 p-3 text-sm mr-2 shadow-sm text-white/90 max-w-[80%] break-words">
              {item.question}
            </div>
          </div>

          {/* AI response */}
          <div className="flex justify-start">
            <AiResponseBubble response={item.answer} />
          </div>
        </div>
      ))}
    </div>
  );
}
