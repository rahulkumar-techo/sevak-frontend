"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Trash2, CheckCircle2, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

type Question = {
  questionText: string;
  options: string[];
  correctAnswer: string;
  type: "mcq" | "short" | "long";
  difficulty: "easy" | "medium" | "hard";
  explanation?: string;
};

type IQuestion ={
   onPreview: (q: Question[]) => void 
}

export default function QuestionForm({onPreview}:IQuestion) {
  const [noteId, setNoteId] = useState("");
  const [userId, setUserId] = useState("");
  const [questions, setQuestions] = useState<Question[]>([
    { questionText: "", options: ["", "", "", ""], correctAnswer: "", type: "mcq", difficulty: "easy" }
  ]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); 
  const [loading, setLoading] = useState(false);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleQuestionChange = (qIndex: number, field: keyof Question, value: any) => {
    const updated = [...questions];
    (updated[qIndex] as any)[field] = value;
    setQuestions(updated);
    onPreview(updated)
  };

  const handleOptionChange = (qIndex: number, optIndex: number, value: string) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
    onPreview(updated)
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      questionText: "",
      options: ["", "", "", ""],
      correctAnswer: "",
      type: "mcq",
      difficulty: "easy",
    };
    const updated: Question[] = [...questions, newQuestion];
    setQuestions(updated);
    setExpandedIndex(updated.length - 1);
    onPreview(updated);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      toast.error("Cannot remove the last question");
      return;
    }
    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
    onPreview(updated);

    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else if (expandedIndex !== null && expandedIndex > index) {
      setExpandedIndex(expandedIndex - 1);
    }
    toast.success("Question removed");
  };

  const handleSubmit = async () => {
    if (!noteId || !userId) {
      toast.error("Note ID and User ID are required");
      return;
    }
    const hasEmpty = questions.some(q => !q.questionText.trim());
    if (hasEmpty) {
      toast.error("Some questions are incomplete");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Questions saved!");
    }, 1000);
  };

  return (
    <div className="min-h-screen py-4 px-2 sm:px-4 md:px-8">
      <div className="space-y-4 sm:space-y-6">



        {/* Note & User IDs */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <Input
            placeholder="Note ID"
            value={noteId}
            onChange={(e) => setNoteId(e.target.value)}
            className="text-sm sm:text-base"
          />
          <Input
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="text-sm sm:text-base"
          />
        </div>

        {/* Questions */}
        {questions.map((q, idx) => (
          <Card key={idx} className="shadow-sm border hover:shadow-md">
            <CardHeader
              className="flex justify-between items-center cursor-pointer py-2 sm:py-3 px-2 sm:px-4"
              onClick={() => toggleExpand(idx)}
            >
              <div className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base truncate">
                <div className="font-bold">{idx + 1}.</div>
                <span>{q.questionText || "New Question"}</span>
              </div>
              <div className="flex gap-1 sm:gap-2">
                <Badge variant="outline" className="text-xs sm:text-sm">{q.type.toUpperCase()}</Badge>
                <Badge variant="outline" className="text-xs sm:text-sm">{q.difficulty}</Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => { e.stopPropagation(); removeQuestion(idx); }}
                >
                  <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </CardHeader>

            {expandedIndex === idx && (
              <CardContent className="space-y-2 sm:space-y-4 text-xs sm:text-sm">
                <Label className="text-xs sm:text-sm">Question Text</Label>
                <Textarea
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(idx, "questionText", e.target.value)}
                  className="text-xs sm:text-sm"
                />

                {q.type === "mcq" && (
                  <>
                    <Label className="text-xs sm:text-sm">Options</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                      {q.options.map((opt, i) => (
                        <Input
                          key={i}
                          value={opt}
                          onChange={(e) => handleOptionChange(idx, i, e.target.value)}
                          placeholder={`Option ${String.fromCharCode(65 + i)}`}
                          className="text-xs sm:text-sm"
                        />
                      ))}
                    </div>
                  </>
                )}

                <Label className="text-xs sm:text-sm">Correct Answer</Label>
                <Input
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(idx, "correctAnswer", e.target.value)}
                  className="text-xs sm:text-sm"
                />

                <Label className="text-xs sm:text-sm">Explanation (Optional)</Label>
                <Textarea
                  value={q.explanation || ""}
                  onChange={(e) => handleQuestionChange(idx, "explanation", e.target.value)}
                  className="text-xs sm:text-sm"
                />

                <div className="grid grid-cols-2 gap-1 sm:gap-2">
                  <Select
                    value={q.type}
                    onValueChange={(v: Question["type"]) => handleQuestionChange(idx, "type", v)}
                  >
                    <SelectTrigger className="text-xs sm:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">MCQ</SelectItem>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={q.difficulty}
                    onValueChange={(v: Question["difficulty"]) => handleQuestionChange(idx, "difficulty", v)}
                  >
                    <SelectTrigger className="text-xs sm:text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {/* Footer Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 justify-between">
          <Button onClick={addQuestion} variant="outline" className="text-xs sm:text-sm">
            <PlusCircle className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Add Question
          </Button>
          <Button onClick={handleSubmit} disabled={loading} className="text-xs sm:text-sm">
            {loading ? "Saving..." : <CheckCircle2 className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />}
            Save All
          </Button>
        </div>
      </div>
    </div>
  );
}
