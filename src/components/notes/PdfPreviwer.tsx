"use client";

import React from "react";
import { Download } from "lucide-react";

type Props = {
  url: string;
};

export default function PdfViewer({ url }: Props) {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">PDF Preview</h2>

      {/* Embed PDF */}
      <iframe
        src={url}
        className="w-full h-[600px] border rounded"
        title="PDF Preview"
      />

      {/* Download button */}
      <a
        href={url}
        download
        className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded"
      >
        <Download className="w-4 h-4" /> Download PDF
      </a>
    </div>
  );
}
