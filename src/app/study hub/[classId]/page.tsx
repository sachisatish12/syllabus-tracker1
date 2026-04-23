"use client";

import { getClassByName } from "@/lib/store";
import { useState } from "react";

export default function StudyHub({ params }: any) {
  const classData = getClassByName(decodeURIComponent(params.classId));

  const [assignments, setAssignments] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);

  if (!classData) {
    return (
      <div className="p-6">
        Class not found
      </div>
    );
  }

  // 🎯 GRADE CALCULATION
  function calculateGrade() {
    let total = 0;
    let weightSum = 0;

    const allItems = [
      ...assignments,
      ...exams,
      ...quizzes,
    ];

    allItems.forEach((item) => {
      if (item.grade !== undefined) {
        total += item.grade * item.weight;
        weightSum += item.weight;
      }
    });

    if (weightSum === 0) return 0;

    return (total / weightSum).toFixed(2);
  }

  function updateItem(
    type: string,
    index: number,
    value: number
  ) {
    const setterMap: any = {
      assignment: setAssignments,
      exam: setExams,
      quiz: setQuizzes,
    };

    const stateMap: any = {
      assignment: assignments,
      exam: exams,
      quiz: quizzes,
    };

    const updated = [...stateMap[type]];
    updated[index].grade = value;
    setterMap[type](updated);
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">

      {/* HEADER */}
      <h1 className="text-3xl font-bold">
        {classData.className}
      </h1>

      <p className="text-gray-600">
        Professor: {classData.teacher}
      </p>

      {/* CONTACT INFO */}
      <div className="mt-3 space-y-1 text-sm text-gray-500">

        {classData.teacherEmail && (
          <p>📧 {classData.teacherEmail}</p>
        )}

        {classData.taName && (
          <p>🧑‍🏫 TA: {classData.taName} ({classData.taEmail})</p>
        )}

      </div>

      {/* OFFICE HOURS */}
      {classData.officeHours && (
        <div className="mt-4 p-3 bg-white border rounded-xl">
          <p className="font-semibold">Office Hours</p>
          <p>{classData.officeHours.time}</p>
          <p>{classData.officeHours.location}</p>
        </div>
      )}

      {/* CURRENT GRADE */}
      <div className="mt-6 bg-white border rounded-xl p-4">
        <p className="text-lg font-bold">
          Current Grade: {calculateGrade()}%
        </p>
      </div>

      {/* ASSIGNMENTS */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">Assignments</h2>

        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-white p-3 mb-2 rounded border">

            <p>Assignment {i + 1}</p>

            <input
              type="number"
              placeholder="Grade %"
              className="border p-1 mt-1"
              onChange={(e) =>
                updateItem("assignment", i, Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

      {/* EXAMS */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">Exams</h2>

        {[1, 2].map((_, i) => (
          <div key={i} className="bg-white p-3 mb-2 rounded border">

            <p>Exam {i + 1}</p>

            <input
              type="number"
              placeholder="Grade %"
              className="border p-1 mt-1"
              onChange={(e) =>
                updateItem("exam", i, Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

      {/* QUIZZES */}
      <div className="mt-6">
        <h2 className="font-bold mb-2">Quizzes</h2>

        {[1, 2, 3].map((_, i) => (
          <div key={i} className="bg-white p-3 mb-2 rounded border">

            <p>Quiz {i + 1}</p>

            <input
              type="number"
              placeholder="Grade %"
              className="border p-1 mt-1"
              onChange={(e) =>
                updateItem("quiz", i, Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

    </div>
  );
}