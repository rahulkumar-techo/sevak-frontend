"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Eye, Pencil, Trash, PlusCircle, FileQuestionMark } from "lucide-react";
import { useRouter } from "next/navigation";

export type Note = {
  _id: string;
  title: string;
  subject: string;
   createdAt: string | Date;
  description: string;
  institute?: string; // School / College / Personal / Competition
};

type Props = {
  note: Note;
  onDelete: (_id: string) => void;
  onEdit: (_id: string) => void;
};

const NoteCard: React.FC<Props> = ({ note, onDelete, onEdit }) => {
  const router = useRouter();
 // Format date nicely
const formattedDate = note.createdAt
  ? new Date(note.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
  : "N/A";

  return (
    <Card className="bg-black hover:bg-transparent hover:backdrop:bg-gray-900 transition shadow-lg rounded-xl">
      <CardHeader className="flex items-center gap-2">
        <FileText className="w-6 h-6 text-green-500" />
        <CardTitle className="truncate">{note.title}</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2">
        <CardDescription className="text-gray-400 text-sm truncate">{note.description}</CardDescription>
        {note.institute && (
          <span className="text-xs text-gray-500">Institute: {note.institute}</span>
        )}

        <div className="flex justify-between items-center text-gray-400 text-sm mt-2 flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" /> {formattedDate}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 text-blue-400 border-blue-400 hover:bg-blue-600 hover:text-white"
              onClick={() => router.push(`/dashboard/student/notes/view/${note._id}`)}
            >
              <Eye className="w-4 h-4" /> View
            </Button>


            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 text-red-500 border-red-500 hover:bg-red-600 hover:text-white"
              onClick={() => onDelete(note._id)}
            >
              <Trash className="w-4 h-4" /> Delete
            </Button>

            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1 text-green-400 border-green-400 hover:bg-green-600 hover:text-white"
              onClick={() => router.push(`/dashboard/student/questions/`)}
            >
                <FileQuestionMark className="w-4 h-4" />
            Create Question
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NoteCard;
