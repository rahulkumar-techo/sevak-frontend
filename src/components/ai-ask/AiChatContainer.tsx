"use client";

import React, { useState } from "react";
import AiChatHeader from "./AiChatHeader";
import AiQuestionForm, { QuestionPayload } from "./AiQuestionForm";
import AiResponseBubble from "./AiResponseBubble";
import AiLoader from "./AiLoader";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { History } from "lucide-react";

export default function AiChatContainer() {
    const [aiResponse, setAiResponse] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [lastQuestion, setLastQuestion] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const askAi = async (payload: QuestionPayload) => {
        setError(null);
        setAiResponse(null);
        setIsLoading(true);
        setLastQuestion(payload.questionText);

        try {
            const res = await fetch("/api/ai/answer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || `Server responded ${res.status}`);
            }

            const data = await res.json();
            // Expect { answer: string } from your backend
            setAiResponse(data.answer ?? JSON.stringify(data));
        } catch (err: any) {
            console.error(err);
            setError(err?.message ?? "Unknown error contacting AI");
        } finally {
            setIsLoading(false);
        }
    };

    const router = useRouter()

    return (
        <div className="min-h-screen bg-gradient-to-b dark:bg-black from-[#003222] via-black to-[#000000] text-white">


            <AiChatHeader />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                >
                    <section className="lg:col-span-1">

                        <AiQuestionForm onSubmit={askAi} isLoading={isLoading} />
                                                <Link
                            href={"/ai-ask/history"}
                            className="px-3 py-1 underline underline-offset-2 flex gap-1 text-sm"
                        >
                            <History />
                         <span>   View History</span>
                        </Link>
                    </section>

                    <section className="lg:col-span-2">
                        <div className="rounded-2xl p-4 sm:p-6 bg-white/6 border border-white/6 shadow-md backdrop-blur-md min-h-[320px]">
                            <div className="flex items-center justify-between">
                                <h2 className="text-md font-semibold">AI Response</h2>
                                <div className="text-xs opacity-80">Powered by your AI backend</div>
                            </div>

                            <div className="mt-4 space-y-4">
                                {/* last question preview */}
                                {lastQuestion ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="max-w-xl self-end"
                                    >
                                        <div className="inline-block rounded-2xl bg-white/8 p-3 text-sm mr-2 shadow-sm text-black/90">
                                            {lastQuestion}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="text-sm text-white/60">No question yet — ask something to see the AI's reply.</div>
                                )}

                                {/* loader */}
                                {isLoading && (
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold">AI</div>
                                        <div className="flex-1">
                                            <AiLoader />
                                        </div>
                                    </div>
                                )}

                                {/* AI response */}
                                {!isLoading && aiResponse && (
                                    <AiResponseBubble response={aiResponse} />
                                )}

                                {!isLoading && !aiResponse && !error && (
                                    <div className="text-sm text-white/60">AI answers will appear here. Try asking a 'short' or 'mcq' question.</div>
                                )}

                                {error && <div className="text-sm text-red-400">Error: {error}</div>}
                            </div>
                        </div>

                        <div className="mt-4 text-xs text-white/70">
                            <div className="rounded-xl p-3 bg-white/3 border border-white/6">
                                Note: This UI calls <code className="text-[.7rem]">/api/ai/answer</code>. Implement a server route that forwards payload to your AI provider and returns <code className="text-[.7rem]">{`{ answer: string }`}</code>.
                            </div>
                        </div>
                    </section>
                </motion.div>
            </main>
            <footer className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 text-center text-xs text-white/60">
                Made with ❤️ — NovaNoteX · Mobile-first, dark-ready
            </footer>
        </div>
    );
}
