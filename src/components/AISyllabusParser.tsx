"use client";

import { useState } from "react";

export default function AISyllabusParser({ onParsed }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/parse-syllabus", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      onParsed(data);

      setFile(null);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="space-y-4">

      {/* file upload */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="w-full"
      />

      {/* button */}
      <button
        onClick={handleUpload}
        disabled={!file || loading}
        className="w-full py-3 rounded-xl bg-black text-white hover:bg-red-600 transition"
      >
        {loading ? "Reading syllabus..." : "Upload & Parse PDF →"}
      </button>

    </div>
  );
}