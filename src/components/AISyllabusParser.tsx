"use client";

import { useState } from "react";

export default function AISyllabusParser({ onParsed }: any) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    console.log("UPLOAD CLICKED");
    console.log("file at upload time:", file);

    if (!file) {
      console.log("No file selected");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/parse-syllabus", {
        method: "POST",
        body: formData,
      });

      console.log("API status:", res.status);

      const data = await res.json();

      console.log("API response:", data);

      onParsed(data);

      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
    }

    setLoading(false);
  }

  return (
    <div className="space-y-4">

      {/* file upload */}
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          console.log("Selected file:", selectedFile);
          setFile(selectedFile || null);
        }}
        className="w-full"
      />

      {/* button */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-black text-white hover:bg-red-600 transition"
      >
        {loading ? "Reading syllabus..." : "Upload & Parse PDF →"}
      </button>

    </div>
  );
}