"use client";

import React, { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FileText, Download, Pencil } from "lucide-react";
import { BookOpen, Award, Building, User, Calendar } from "lucide-react";
import fileDownload from "js-file-download";
import { Button } from "../ui/button";
import PdfPreviwer from "./PdfPreviwer";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { setSelectedNote } from "@/redux/features/note/noteSlice";

export type NoteFile = {
  url: string;
  fileId: string;
  type?: "pdf" | "image"; // optional, fallback on URL folder or extension
};

export type NoteCategory = {
  classOrSemester?: string;
  competitionName?: string;
  institutionName?: string;
  level?: string;
  year?: string;
};

export type Note = {
  _id: string;
  title: string;
  subject: string;
  description: string;
  createdAt: string | Date;
  institute?: string;
  notesFiles?: NoteFile[];
  category?: NoteCategory;
};

type Props = {
  note: Note;
};

const ViewNoteDetail: React.FC<Props> = ({ note }) => {
  const files = note.notesFiles || [];
  const router = useRouter()

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(setSelectedNote(note))
  }, [note])
  // Detect PDF files
  const pdfFile = files.find(
    (f) =>
      f.type === "pdf" ||
      f.url.includes("/pdfs/") ||
      f.url.match(/\.pdf$/i)
  );

  // Convert Cloudinary raw URL to proper preview URL
  const inlinePdfUrl = pdfFile?.url.endsWith(".pdf")

  // Detect image files
  const imageFiles = files.filter(
    (f) =>
      f.type === "image" ||
      f.url.match(/\.(png|jpg|jpeg|gif)$/i) ||
      f.url.includes("/images/")
  );

  return (
    <div className="p-4 max-w-4xl mx-auto space-y-6">
      {/* Note Info */}
      <Card>
        <CardHeader className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-green-500" />
          <CardTitle>{note.title}</CardTitle>
        </CardHeader>
        {note.subject && (
          <CardHeader>
            <CardTitle className="text-sm text-gray-500">{note.subject}</CardTitle>
          </CardHeader>
        )}
        <CardContent className="space-y-2">
          <p className="text-gray-700">{note.description}</p>
          {note.institute && (
            <p className="text-sm text-gray-500">Institute: {note.institute}</p>
          )}
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Calendar className="w-4 h-4" />{" "}
            {new Date(note.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </CardContent>
      </Card>

      {/* PDF */}
      {pdfFile && inlinePdfUrl && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">PDF</h2>
          <PdfPreviwer url={pdfFile?.url}
          />
        </div>
      )}

      {/* Images */}
      {imageFiles.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Images</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {imageFiles.map((img) => (
              <div key={img.fileId} className="flex flex-col gap-2">
                <img
                  src={img.url}
                  alt={note.title}
                  className="w-full h-48 object-contain rounded border"
                />
                <Button
                  className=" bg-green-500 text-white"
                  onClick={async () => {
                    try {
                      const response = await fetch(img.url);
                      const blob = await response.blob();
                      fileDownload(blob, `note-image-${img.fileId}.png`);
                    } catch (error) {
                      console.error("Download failed:", error);
                    }
                  }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download Image</span>
                </Button>


              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category */}
      {note.category && (
        <div className="space-y-2">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-gray-600" /> Category
          </h2>

          {note.category.classOrSemester && (
            <p className="flex items-center gap-2 text-gray-700">
              <BookOpen className="w-4 h-4 text-gray-500" /> Class/Semester: {note.category.classOrSemester}
            </p>
          )}

          {note.category.competitionName && (
            <p className="flex items-center gap-2 text-gray-700">
              <Award className="w-4 h-4 text-gray-500" /> Competition: {note.category.competitionName}
            </p>
          )}

          {note.category.institutionName && (
            <p className="flex items-center gap-2 text-gray-700">
              <Building className="w-4 h-4 text-gray-500" /> Institution: {note.category.institutionName}
            </p>
          )}

          {note.category.level && (
            <p className="flex items-center gap-2 text-gray-700">
              <User className="w-4 h-4 text-gray-500" /> Level: {note.category.level}
            </p>
          )}

          {note.category.year && (
            <p className="flex items-center gap-2 text-gray-700">
              <Calendar className="w-4 h-4 text-gray-500" /> Year: {note.category.year}
            </p>
          )}
        </div>
      )}


      <Button
        size="sm"
        variant="outline"
        className="flex items-center gap-1 text-yellow-400 border-yellow-400 hover:bg-yellow-500 hover:text-white"
        onClick={() => router.push(`/dashboard/student/notes/${note?._id}`)}
      >
        <Pencil className="w-4 h-4" /> Edit
      </Button>
    </div>
  );
};

export default ViewNoteDetail;
