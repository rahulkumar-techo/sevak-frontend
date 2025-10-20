"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import NoteForm, { NoteData } from "@/components/notes/NoteForm";
import { useCreateNoteMutation } from "@/redux/features/note/noteApi";

const CreateNotePage: React.FC = () => {
  const router = useRouter();
  const [createNote, { isLoading, isSuccess, error }] = useCreateNoteMutation();

  useEffect(() => {
    if (error) {
      const msg = (error as any)?.data?.message || "Something went wrong";
      toast.error(msg);
    }
    if (isSuccess) {
      toast.success("Note created successfully!");
      router.push("/notes");
    }
  }, [error, isSuccess]);

  const handleSave = async (data: NoteData) => {
    try {
      await createNote({
        title: data.title||"",
        subject: data.subject||"",
        description: data.description||"",
        category: data.category,
        files: {
          noteImages: data.notesFiles?.filter(f => f.file && f.type === "image").map(f => f.file!) || [],
          notePdf: data.notesFiles?.find(f => f.file && f.type === "pdf")?.file || null,
        },
      }).unwrap();
    } catch (err) {
      console.error("Create note failed:", err);
    }
  };

  return (
    <div className="dark:bg-black min-h-screen flex flex-col p-4">
      <NoteForm onSave={handleSave} isEdit={false} isLoading={isLoading} />
    </div>
  );
};

export default CreateNotePage;
