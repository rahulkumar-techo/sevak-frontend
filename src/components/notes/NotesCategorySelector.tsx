"use client";

import React, { useState, useEffect } from "react";

export type NoteLevel = "school" | "college" | "personal" | "competition";

export type NoteCategory = {
  level: NoteLevel;
  institutionName?: string;
  classOrSemester?: string;
  subject?: string;
  year?: number;
  competitionName?: string;
};

type Props = {
  selectedCategory?: Partial<NoteCategory>;
  onCategorySelect: (category: NoteCategory) => void;
  dynamicInstitutions?: {
    school?: string[];
    college?: string[];
    competition?: string[];
  };
};

const NoteCategorySelector: React.FC<Props> = ({
  onCategorySelect,
  selectedCategory,
  dynamicInstitutions = {},
}) => {
  const [level, setLevel] = useState<NoteLevel>(selectedCategory?.level || "school");
  const [institutionName, setInstitutionName] = useState(selectedCategory?.institutionName || "");
  const [classOrSemester, setClassOrSemester] = useState(selectedCategory?.classOrSemester || "");
  const [subject, setSubject] = useState(selectedCategory?.subject || "");
  const [year, setYear] = useState(selectedCategory?.year || new Date().getFullYear());
  const [competitionName, setCompetitionName] = useState(selectedCategory?.competitionName || "");
  const [customInstitution, setCustomInstitution] = useState("");

  console.log({institutionName})

  const schoolClasses = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const collegeSemesters = Array.from({ length: 8 }, (_, i) => `Semester ${i + 1}`);
  const subjects = ["Math", "Science", "Physics", "Chemistry", "English", "History", "CS"];
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  // Notify parent on change
  useEffect(() => {
    onCategorySelect({
      level,
      institutionName: customInstitution || institutionName,
      classOrSemester,
      subject,
      year,
      competitionName,
    });
  }, [level, institutionName, classOrSemester, subject, year, competitionName, customInstitution]);

  const getInstitutions = () => {
    switch (level) {
      case "school": return dynamicInstitutions.school || [];
      case "college": return dynamicInstitutions.college || [];
      case "competition": return dynamicInstitutions.competition || [];
      default: return [];
    }
  };

  const resetFields = () => {
    setInstitutionName("");
    setCustomInstitution("");
    setClassOrSemester("");
    setSubject("");
    setCompetitionName("");
  };

  return (
    <div className="flex flex-col gap-3 w-full p-4 rounded-lg shadow-md">
      <h2 className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-200">Select Note Category</h2>

      {/* Level */}
      <div className="flex flex-wrap gap-2">
        {(["school","college","personal","competition"] as NoteLevel[]).map(lvl => (
          <button
            key={lvl}
            onClick={() => { setLevel(lvl); resetFields(); }}
            className={`px-3 py-1 rounded-full text-xs sm:text-sm border ${
              level === lvl
                ? "bg-green-500 text-white border-green-500"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            }`}
          >
            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
          </button>
        ))}
      </div>

      {/* Institution / Custom input */}
      {["school", "college", "competition"].includes(level) && (
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex flex-wrap gap-2">
            {getInstitutions().map(inst => (
              <button
                key={inst}
                onClick={() => { setInstitutionName(inst); setCustomInstitution(""); }}
                className={`px-3 py-1 rounded-full text-xs sm:text-sm border ${
                  institutionName === inst ? "bg-green-500 text-white border-green-500" :
                  "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                }`}
              >
                {inst}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder={`Or type ${level === "competition" ? "competition name" : level + " name"}`}
            value={institutionName||customInstitution}
            onChange={(e) => setCustomInstitution(e.target.value)}
            className="w-full p-2 text-xs sm:text-sm rounded border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      )}

      {/* Class / Semester */}
      {(level === "school" || level === "college") && (
        <div className="flex flex-wrap gap-2 mt-2">
          {(level === "school" ? schoolClasses : collegeSemesters).map(val => (
            <button
              key={val}
              onClick={() => setClassOrSemester(val)}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm border ${
                classOrSemester === val ? "bg-green-500 text-white border-green-500" :
                "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      )}

      {/* Subject */}
      {level === "school" && (
        <div className="flex flex-wrap gap-2 mt-2">
          {subjects.map(sub => (
            <button
              key={sub}
              onClick={() => setSubject(sub)}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm border ${
                subject === sub ? "bg-green-500 text-white border-green-500" :
                "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* Competition */}
      {level === "competition" && (
        <div className="flex flex-wrap gap-2 mt-2">
          {["NTSE","JEE","NEET","Olympiad","Other"].map(comp => (
            <button
              key={comp}
              onClick={() => setCompetitionName(comp)}
              className={`px-3 py-1 rounded-full text-xs sm:text-sm border ${
                competitionName === comp ? "bg-green-500 text-white border-green-500" :
                "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      )}

      {/* Year */}
      <div className="flex flex-wrap gap-2 mt-2">
        {years.map(y => (
          <button
            key={y}
            onClick={() => setYear(y)}
            className={`px-3 py-1 rounded-full text-xs sm:text-sm border ${
              year === y ? "bg-green-500 text-white border-green-500" :
              "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
            }`}
          >
            {y}
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoteCategorySelector;
