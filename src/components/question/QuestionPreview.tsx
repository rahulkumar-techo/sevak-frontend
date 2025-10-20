"use client";

/**
 * Responsive Question Preview with auto-collapse previous questions
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Question = {
  questionText: string;
  options: string[];
  correctAnswer: string;
  type: "mcq" | "short" | "long";
  difficulty: "easy" | "medium" | "hard";
  explanation?: string;
};

export const QuestionPreview = ({ questions }: { questions: Question[] }) => {
  // Only one question open at a time; null = all collapsed
  const [expandedIndex, setExpandedIndex] = useState<number | null>(questions.length - 1);

  const toggleCollapse = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  if (!questions?.length) {
    return <div className="text-muted-foreground p-4 text-sm">No questions yet...</div>;
  }

  return (
    <div className="space-y-4 p-2 sm:p-4 max-h-screen ">
      {questions.map((q, idx) => {
        const isExpanded = expandedIndex === idx;

        return (
          <Card key={idx} className="border shadow-sm">
            <CardHeader className="px-2 sm:px-4 py-2 sm:py-3">
              <CardTitle className="flex justify-between items-center text-xs sm:text-sm">
                <span className="flex-1 truncate">
                  Q{idx + 1}. {q.questionText || "Untitled Question"}
                </span>

                {/* Dropdown Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="p-1 sm:p-2 rounded-md hover:bg-muted">
                    <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => toggleCollapse(idx)}>
                      {isExpanded ? "Hide Question" : "Show Question"}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardTitle>
            </CardHeader>

            {/* Animated Collapse */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <CardContent className="space-y-2 text-xs sm:text-sm truncate">
                    {q.type === "mcq" && (
                      <ul className="list-disc ml-4 sm:ml-6">
                        {q.options.map((opt, i) => (
                          <li
                            key={i}
                            className={opt === q.correctAnswer ? "font-bold text-green-600" : ""}
                          >
                            {opt || "--"}
                          </li>
                        ))}
                      </ul>
                    )}

                    {q.type !== "mcq" && (
                      <p className="italic text-xs sm:text-sm text-muted-foreground">
                        ({q.type.toUpperCase()} Answer)
                      </p>
                    )}

                    <p className="text-xs sm:text-sm">
                      <strong>Correct:</strong> {q.correctAnswer || "--"}
                    </p>

                    {q.explanation && (
                      <p className="text-xs text-muted-foreground">
                        <strong>Note:</strong> {q.explanation}
                      </p>
                    )}
                  </CardContent>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        );
      })}
    </div>
  );
};
