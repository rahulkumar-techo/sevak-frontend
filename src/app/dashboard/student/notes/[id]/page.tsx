"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

import NoteForm, { NoteData } from "@/components/notes/NoteForm";
import { useGetSingleNoteQuery, useUpdateNoteMutation } from "@/redux/features/note/noteApi";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const EditNotePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const noteId = params?.id as string;

  const { data, isFetching, error } = useGetSingleNoteQuery({ id: noteId });
  const [updateNote, { isLoading, isSuccess, error: updateError }] = useUpdateNoteMutation();

  const { manageDeleteItems } = useSelector((state: RootState) => state.note);

  const [initialData, setInitialData] = useState<NoteData | undefined>();

  useEffect(() => {
    if (data?.data) {
      const note = data.data;
      setInitialData({
        title: note.title,
        subject: note.subject,
        description: note.description,
        notesFiles: note.notesFiles || [],
        category: note.category,
      });
    }
  }, [data]);

  useEffect(() => {
    if (updateError) {
      toast.error((updateError as any)?.data?.message || "Failed to update note");
    }
    if (isSuccess) {
      toast.success("Note updated successfully!");
      router.push("/notes");
    }
  }, [updateError, isSuccess]);

  const handleUpdate = async (formData: NoteData) => {
    try {
      // Separate files into image[] and pdf (same format as createNote)
      const imageFiles = formData.notesFiles
        ?.filter((f) => f.file && f.type === "image")
        .map((f) => f.file!) as File[];

      const pdfFile = formData.notesFiles?.find((f) => f.file && f.type === "pdf")?.file || null;

      await updateNote({
        id: noteId,
        title: formData.title!,
        description: formData.description!,
        subject: formData.subject,
        category: formData.category,
        files: {
          noteImages: imageFiles,
          notePdf: pdfFile,
        },
        deleteItems: manageDeleteItems, // ✅ send deleted file IDs
      }).unwrap();
    } catch (err) {
      console.error("Update note failed:", err);
    }
  };

  if (isFetching || !initialData) {
    return (
      <div className="dark:bg-black min-h-screen flex items-center justify-center text-white">
        Loading note...
      </div>
    );
  }

  return (
    <div className="dark:bg-black min-h-screen flex flex-col">
      <main className="mt-2 px-4 max-w-4xl mx-auto">
        <NoteForm
          initialData={initialData}
          onSave={handleUpdate}
          isEdit={true}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default EditNotePage;
