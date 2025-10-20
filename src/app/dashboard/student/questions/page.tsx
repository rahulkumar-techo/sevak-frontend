"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import QuestionForm from "@/components/question/QuestionForm";
import { QuestionPreview } from "@/components/question/QuestionPreview";
import { CircleArrowLeft, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const [previewQuestions, setPreviewQuestions] = useState([]);
  const router = useRouter();

  return (
    <div className="w-full p-4 sm:p-6">
      {/* HEADER */}
      <div className="text-center mb-6 space-y-3 relative">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 text-sm shadow-sm">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span className="font-medium">Question Builder</span>
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-[#00ff99] to-[#b3ff00] text-transparent bg-clip-text">
          Create Multiple Questions
        </h1>

        <p className="text-muted-foreground text-sm">
          Build engaging quizzes with customizable questions
        </p>

        <div
          className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <CircleArrowLeft className="h-5 w-5" />
          <span className="text-sm">Go Back</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        className="max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* FORM LEFT */}
        <motion.div
          className="w-full md:w-1/2 rounded-xl p-3 border bg-white/50 dark:bg-black/30 backdrop-blur"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <QuestionForm onPreview={(q: any) => setPreviewQuestions(q)} />
        </motion.div>

        {/* PREVIEW RIGHT */}
        <motion.div
          className="w-full md:w-1/2 rounded-xl p-3 border bg-white/50 dark:bg-black/30 backdrop-blur overflow-auto"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <QuestionPreview questions={previewQuestions} />
        </motion.div>
      </motion.div>
    </div>
  );
}
