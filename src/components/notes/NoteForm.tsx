"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import DescriptionField from "./DescriptionField";
import MultiFileUploader from "./FileSelect";
import NoteCategorySelector from "./NotesCategorySelector";

export type NoteFile = {
  url?: string;
  file?: File;
  type: "image" | "pdf";
};

export type NoteData = {
  title?: string;
  subject?: string;
  description?: string;
  notesFiles?: NoteFile[];
  category?: any;
};

type Props = {
  initialData?: Partial<NoteData>;
  isEdit?: boolean;
  isLoading?: boolean;
  onSave: (data: NoteData) => void;
};

const NoteForm: React.FC<Props> = ({ initialData, isEdit = false, isLoading = false, onSave }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [subject, setSubject] = useState(initialData?.subject || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [files, setFiles] = useState<NoteFile[]>(initialData?.notesFiles || []);
  const [category, setCategory] = useState(initialData?.category);

  console.log(files)

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setSubject(initialData.subject || "");
      setDescription(initialData.description || "");
      setFiles(initialData.notesFiles || []);
      setCategory(initialData.category);
    }
  }, [initialData]);

  const handleSave = () => {
    if (!title.trim() || !subject.trim()) return alert("Title and Subject are required!");
    onSave({ title, subject, description, notesFiles: files, category });
  };

  return (
    <div className="flex flex-col gap-4 bg-black-900 p-4 rounded-xl shadow-lg">
      <h2 className="text-lg font-bold text-white">{isEdit ? "Edit Note" : "Create Note"}</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        disabled={isLoading}
        className="p-2 rounded border border-gray-700 bg-black-800 text-white"
      />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        disabled={isLoading}
        className="p-2 rounded border border-gray-700 bg-black-800 text-white"
      />

      <NoteCategorySelector onCategorySelect={setCategory} selectedCategory={category} />

      <MultiFileUploader initialFiles={files} onFilesSelect={setFiles} />

      <DescriptionField initialText={description} onTextChange={setDescription} />

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? (isEdit ? "Updating..." : "Saving...") : isEdit ? "Update Note" : "Save Note"}
        </Button>
      </div>
    </div>
  );
};

export default NoteForm;
