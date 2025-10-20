"use client";

import React, { useState, useEffect } from "react";
import AiMCQOptions from "./AiMCQOptions";
import { motion } from "framer-motion";
import AiChatHistory from "./AiChatHistory";

export type QType = "mcq" | "short" | "long";

export type QuestionPayload = {
    noteId?: string;
    userId?: string;
    questionText: string;
    options?: string[];
    correctAnswer?: string;
    type: QType;
    difficulty?: "easy" | "medium" | "hard";
    explanation?: string;
};

type Props = {
    onSubmit: (payload: QuestionPayload) => Promise<void>;
    isLoading?: boolean;
};

export default function AiQuestionForm({ onSubmit, isLoading = false }: Props) {
    const [questionText, setQuestionText] = useState("");
    const [type, setType] = useState<QType>("short");
    const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
    const [options, setOptions] = useState<string[]>(["", ""]);
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [explanation, setExplanation] = useState("");
    const [showOptions, setShowOptions] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 420px)");
        setShowOptions(!mq.matches);
        const handler = (e: MediaQueryListEvent) => setShowOptions(!e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const validate = (): string | null => {
        if (!questionText.trim()) return "Question text is required.";
        if (type === "mcq") {
            const filled = options.filter((o) => o.trim() !== "");
            if (filled.length < 2) return "MCQ must have at least 2 options.";
            if (!correctAnswer.trim()) return "Please provide the correct answer for the MCQ.";
            if (!options.includes(correctAnswer)) return "Correct answer must exactly match one option.";
        }
        return null;
    };

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault();
        setError(null);
        const v = validate();
        if (v) {
            setError(v);
            return;
        }

        const payload: QuestionPayload = {
            questionText: questionText.trim(),
            type,
            difficulty,
            explanation: explanation.trim() || undefined,
        };

        if (type === "mcq") {
            payload.options = options.map((o) => o.trim()).filter(Boolean);
            payload.correctAnswer = correctAnswer.trim();
        }

        await onSubmit(payload);
    };

    return (
        <div className="rounded-2xl p-4 sm:p-6 bg-white/6 border border-white/6 shadow-md backdrop-blur-md">
            <h2 className="text-md font-semibold">Create a question</h2>
            <p className="text-xs opacity-80 mt-1">Ask the AI about a note, topic, or concept.</p>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <label className="block">
                    <span className="text-sm font-medium">Question</span>
                    <textarea
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        rows={4}
                        className="mt-1 block w-full rounded-xl border 
                          placeholder:opacity-60 resize-none 
                          
                          border-white/10 bg-white/5 dark:bg-black dark:text-white p-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-emerald-400  from-[#003222] via-black to-[#000000]
                          "
                        placeholder="Write your question..."
                        aria-label="Question text"
                    />
                </label>

                <div className="grid grid-cols-2 gap-2">
                    <label className="block">
                        <span className="text-xs">Type</span>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as QType)}
                            className="mt-1 block w-full rounded-xl border border-white/10 bg-white/5 dark:bg-black dark:text-white p-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white dark:focus:bg-white dark:focus:text-black"
                        >
                            <option value="mcq">MCQ</option>
                            <option value="short">Short</option>
                            <option value="long">Long</option>
                        </select>
                    </label>

                    <label className="block">
                        <span className="text-xs">Difficulty</span>
                        <select
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value as any)}
                            className="mt-1 block w-full rounded-xl border border-white/10 bg-white/5 dark:bg-black dark:text-white p-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:bg-white dark:focus:bg-white dark:focus:text-black"
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                </div>


                <label className="block">
                    <span className="text-sm">Explanation (optional)</span>
                    <input value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Short hint or explanation" className="mt-1 block w-full rounded-xl border border-white/10 bg-white/5 p-2 text-sm" />
                </label>

                {type === "mcq" && (
                    <div className="bg-white/3 rounded-xl p-3 border border-white/8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium">Options</h3>
                            <div className="flex items-center gap-2">
                                <button type="button" onClick={() => setShowOptions((s) => !s)} className="text-xs underline">{showOptions ? "Collapse" : "Expand"}</button>
                                <button
                                    type="button"
                                    onClick={() => setOptions((p) => [...p, ""])}
                                    className="text-xs bg-indigo-600 px-2 py-1 rounded-md text-white"
                                >
                                    + Add
                                </button>
                            </div>
                        </div>

                        {showOptions && (
                            <div className="mt-3 space-y-2">
                                <AiMCQOptions
                                    options={options}
                                    setOptions={setOptions}
                                    setCorrectAnswer={setCorrectAnswer}
                                />

                                <label className="block mt-2">
                                    <span className="text-xs">Correct answer (exact match)</span>
                                    <input value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} className="mt-1 block w-full rounded-lg border border-white/8 bg-white/3 p-2 text-sm" placeholder="Type the correct option's text" />
                                </label>
                            </div>
                        )}
                    </div>
                )}

                <div className="flex gap-2">
                    <motion.button whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="h-12 flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg disabled:opacity-60">
                        {isLoading ? "Asking…" : "Ask AI"}
                    </motion.button>

                    <button type="button" onClick={() => {
                        setQuestionText("");
                        setType("short");
                        setDifficulty("easy");
                        setOptions(["", ""]);
                        setCorrectAnswer("");
                        setExplanation("");
                        setError(null);
                    }} className="h-12 px-4 rounded-xl border border-white/8">Reset</button>
                </div>

                {error && <div className="text-xs text-red-400">{error}</div>}
            </form>
          
        </div>
    );
}
