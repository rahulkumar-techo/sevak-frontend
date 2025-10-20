"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import toast from "react-hot-toast";

import NoteForm, { NoteData } from "@/components/notes/NoteForm";
import { useGetSingleNoteQuery, useUpdateNoteMutation } from "@/redux/features/note/noteApi";

const EditNotePage: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const noteId = params?.id as string;

  const { data, isFetching, error } = useGetSingleNoteQuery({ id: noteId });
  const [updateNote, { isLoading, isSuccess, error: updateError }] = useUpdateNoteMutation();

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

  console.log({initialData:initialData?.category})

  useEffect(() => {
    if (updateError) {
      toast.error((updateError as any)?.data?.message || "Failed to update note");
    }
    if (isSuccess) {
      toast.success("Note updated successfully!");
      router.push("/notes");
    }
  }, [updateError, isSuccess]);

  const handleUpdate = async (data: NoteData) => {
    try {
      // await updateNote({

      //   id: noteId,
      //   title: data.title||"",
      //   subject: data.subject||"",
      //   description: data.description||"",
      //   category: data.category,
      //   files: {
      //     noteImages: data.notesFiles?.filter(f => f.file && f.type === "image").map(f => f.file!) || [],
      //     notePdf: data.notesFiles?.find(f => f.file && f.type === "pdf")?.file || null,
      //   },
      // }).unwrap();

      console.log(data)
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
