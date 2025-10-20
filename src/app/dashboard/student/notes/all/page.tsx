"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NoteCard, { Note } from "@/components/notes/NoteCard";
import { useGetNotesQuery } from "@/redux/features/note/noteApi";

const NOTES_PER_PAGE = 10;

const NotesDashboard: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState(""); // for controlled input

  // Fetch notes from API
  const { data, isLoading, isError } = useGetNotesQuery({
    page: currentPage,
    limit: NOTES_PER_PAGE,
    search,
  });

  // Extract notes and totalPages safely
  const notes: Note[] = data?.data?.data || [];
  const totalPages: number = data?.data?.totalPages || 1;

  console.log(notes)

  // Handle pagination
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Handle search
  const handleSearch = () => {
    setCurrentPage(1);
    setSearch(searchInput.trim());
  };

  // Handlers for edit & delete
  const handleDelete = (_id: string) => alert(`Implement delete API for note: ${_id}`);
  const handleEdit = (_id: string) => alert(`Redirect to edit note: ${_id}`);

  if (isLoading) return <div className="text-white text-center mt-10">Loading notes...</div>;
  if (isError) return <div className="text-red-500 text-center mt-10">Failed to load notes.</div>;

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Notes Dashboard</h1>

      {/* Search */}
      <div className="flex justify-center mb-6 gap-2">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search notes..."
          className="px-4 py-2 rounded w-full max-w-md border-2 "
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} variant="outline">Search</Button>
      </div>

      {/* Notes Grid */}
      {notes.length === 0 ? (
        <p className="text-center text-gray-400 mt-10">No notes found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard key={note._id} note={note} onDelete={handleDelete} onEdit={handleEdit} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {notes.length > 0 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button onClick={handlePrev} disabled={currentPage === 1} variant="outline">
            Previous
          </Button>
          <span className="text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <Button onClick={handleNext} disabled={currentPage === totalPages} variant="outline">
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotesDashboard;
