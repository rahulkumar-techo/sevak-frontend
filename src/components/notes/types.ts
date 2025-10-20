// src/types/notes.ts

export type NoteLevel = "school" | "college" | "personal" | "competition";

export type NoteFile = {
  file?: File;          // for newly uploaded files
  url?: string;         // for existing files (already uploaded)
  fileId?: string;      // for existing files
  type: "pdf" | "image"; // required
};

export type NoteCategory = {
  level: NoteLevel;
  classOrSemester?: string;
  subject?: string;
  year?: number;
  competitionName?: string;
  institutionName?: string;
};

export type NoteData = {
  title?: string;
  subject?: string;
  description?: string;
  notesFiles?: NoteFile[];
  category?: NoteCategory;
};
