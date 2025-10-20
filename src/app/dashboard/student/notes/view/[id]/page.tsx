"use client";

import React from "react";
import { useParams } from "next/navigation";
import ViewNoteDetail from "@/components/notes/ViewNote";
import { useGetSingleNoteQuery } from "@/redux/features/note/noteApi";

const NotePage: React.FC = () => {
  const params = useParams();
  const noteId = params?.id as string;

  const { data, isLoading, isError } = useGetSingleNoteQuery({ id: noteId });

  if (isLoading) return <p className="text-center mt-8 text-white">Loading note...</p>;
  if (isError || !data?.data) return <p className="text-center mt-8 text-red-500">Note not found</p>;

  const note = data.data;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <ViewNoteDetail note={note} />
    </div>
  );
};

export default NotePage;
