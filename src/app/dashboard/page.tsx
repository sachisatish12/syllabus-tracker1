"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import AISyllabusParser from "@/components/AISyllabusParser";
import GradeGoalPredictor from "@/components/GradeGoalPredictor";
import ProgressBar from "@/components/ProgressBar";

type ClassType = {
  className: string;
  teacher: string;
  assignments: any[];
};

export default function Dashboard() {
  const [classes, setClasses] = useState<ClassType[]>([]);

  function handleParsed(data: any) {
    setClasses((prev) => [...prev, data]);
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-white via-red-50 to-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-black">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm">
            Track your classes, grades, and deadlines in one place.
          </p>
        </div>

        {/* LAYOUT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT / MAIN COLUMN */}
          <div className="lg:col-span-2 space-y-6">

            {/* AI SYLLABUS PARSER */}
            <div className="bg-white/80 backdrop-blur-md border rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-red-600 mb-3">
                AI Syllabus Parser
              </h2>

              <AISyllabusParser onParsed={handleParsed} />
            </div>

            {/* CLASS CARDS */}
            <div className="space-y-4">

              <h2 className="text-lg font-semibold text-black">
                Your Classes
              </h2>

              {classes.length === 0 ? (
                <div className="text-gray-400 text-sm">
                  No classes yet. Paste a syllabus to get started.
                </div>
              ) : (
                classes.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur-md border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-black">
                        {c.className || "Untitled Class"}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 mb-3">
                      {c.teacher || "Unknown Instructor"}
                    </p>

                    <ProgressBar value={70} />

                  </div>
                ))
              )}
            </div>

          </div>

          {/* RIGHT PANEL */}
          <div className="space-y-6">

            {/* GRADE PREDICTOR */}
            <div className="bg-white/80 backdrop-blur-md border rounded-2xl p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-red-600 mb-3">
                Grade Predictor
              </h2>

              <GradeGoalPredictor current={85} />
            </div>

            {/* QUICK STATS */}
            <div className="bg-white/80 backdrop-blur-md border rounded-2xl p-5 shadow-sm">

              <h2 className="text-lg font-semibold text-black mb-3">
                Overview
              </h2>

              <div className="space-y-2 text-sm text-gray-600">

                <p>📚 Classes: {classes.length}</p>
                <p>📊 Avg Progress: 70%</p>
                <p>⚡ AI Ready</p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}