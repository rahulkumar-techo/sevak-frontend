"use client";
import React, { useState, useEffect } from "react";

type Props = {
  initialText?: string;
  onTextChange?: (text: string) => void;
  rows?: number;
};

const DescriptionField: React.FC<Props> = ({
  initialText = "",
  onTextChange,
  rows = 4,
}) => {
  const [text, setText] = useState<string>(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onTextChange?.(e.target.value);
  };

  return (
    <div className="bg-gray-50 dark:bg-black py-4 rounded-lg shadow-sm flex-1">
      <textarea
        className="w-full p-2 text-xs sm:text-sm bg-gray-50 dark:bg-black resize-none border-[0.5px] dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
        value={text}
        onChange={handleChange}
        rows={rows}
        placeholder="Write your description here..."
      />
    </div>
  );
};

export default DescriptionField;
