"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AISyllabusParser from "@/components/AISyllabusParser";

type ClassType = {
  className: string;
  teacher: string;
  exams: any[];
  assignments: any[];
  quizzes: any[];
};

export default function Dashboard() {
  const [classes, setClasses] = useState<ClassType[]>([]);

  function handleParsed(data: ClassType) {
    setClasses((prev) => [...prev, data]);
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white via-red-50 to-white">
      
      <Sidebar />

      <div className="flex-1 p-6 max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">Dashboard</h1>
          <p className="text-gray-500 text-sm">
            Upload your syllabus or enter class details manually.
          </p>
        </div>

        {/* AI PARSER */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-red-600 mb-3">
            Upload Syllabus (PDF)
          </h2>
          <AISyllabusParser onParsed={handleParsed} />
        </div>

        {/* MANUAL INPUT (we'll build next) */}
        <div className="bg-white border rounded-2xl p-5 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-black mb-3">
            Or Enter Manually
          </h2>
          <p className="text-sm text-gray-400">
            (Manual form coming next)
          </p>
        </div>

        {/* CLASSES */}
        <div>
          <h2 className="text-lg font-semibold text-black mb-3">
            Your Classes
          </h2>

          {classes.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No classes yet. Upload a syllabus to get started.
            </p>
          ) : (
            classes.map((c, i) => (
              <div
                key={i}
                className="bg-white border rounded-2xl p-5 mb-3"
              >
                <h3 className="font-bold">{c.className}</h3>
                <p className="text-sm text-gray-500">{c.teacher}</p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}