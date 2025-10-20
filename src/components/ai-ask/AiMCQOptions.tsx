"use client";

import React from "react";

type Props = {
  options: string[];
  setOptions: (opts: string[]) => void;
  setCorrectAnswer?: (val: string) => void;
};

export default function AiMCQOptions({ options, setOptions, setCorrectAnswer }: Props) {
  const handleChange = (index: number, value: string) => {
    const copy = options.slice();
    copy[index] = value;
    setOptions(copy);
  };

  const addOption = () => setOptions([...options, ""]);
  const removeOption = (index: number) => {
    const copy = options.slice();
    copy.splice(index, 1);
    setOptions(copy);
    // if the removed option was the correct answer (passed up), caller can handle it separately
  };

  return (
    <div className="space-y-2">
      {options.map((opt, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={opt}
            onChange={(e) => handleChange(i, e.target.value)}
            placeholder={`Option ${i + 1}`}
            className="flex-1 rounded-lg border border-white/8 bg-white/3 p-2 text-sm"
          />
          <button type="button" onClick={() => removeOption(i)} className="px-2 py-1 rounded-md bg-red-600/80 text-white text-sm">Remove</button>
        </div>
      ))}

      <div className="flex gap-2 mt-1">
        <button type="button" onClick={addOption} className="text-xs bg-indigo-600 px-3 py-1 rounded-md text-white">+ Add option</button>
        <div className="text-xs opacity-80 flex-1">Tip: Keep 2–5 options for best results.</div>
      </div>
    </div>
  );
}
