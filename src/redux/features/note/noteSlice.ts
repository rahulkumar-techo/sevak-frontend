
/**
 * Redux Slice - Notes
 * Manages Notes state (selected note, loading, search, pagination)
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note } from "@/components/notes/NoteCard";

interface NotesState {
  selectedNote?: Note | null;
  searchQuery: string;
  manageDeleteItems?:string[];
  currentPage: number;
  notesPerPage: number;
}

const initialState: NotesState = {
  selectedNote: null,
  searchQuery: "",
  currentPage: 1,
  notesPerPage: 10,
  manageDeleteItems:[]
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setSelectedNote: (state, action: PayloadAction<Note | null>) => {
      state.selectedNote = action.payload;
    },
    setManageDeleteItems: (state, action: PayloadAction<string[] | []>) => {
      state.manageDeleteItems = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.currentPage = 1; // reset page when search changes
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setNotesPerPage: (state, action: PayloadAction<number>) => {
      state.notesPerPage = action.payload;
      state.currentPage = 1; // reset page when page size changes
    },
    resetNotesState: (state) => {
      state.selectedNote = null;
      state.searchQuery = "";
      state.currentPage = 1;
      state.notesPerPage = 10;
    },
  },
});

export const {
  setSelectedNote,
  setSearchQuery,
  setCurrentPage,
  setNotesPerPage,
  resetNotesState,
  setManageDeleteItems
} = notesSlice.actions;

export default notesSlice.reducer;
