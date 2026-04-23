"use client";

import { useState } from "react";
import { calculateGrade } from "@/lib/grade";
import Sidebar from "@/components/Sidebar";

export default function GradeCalculatorPage() {
  const [assignments, setAssignments] = useState([
    { name: "", score: "", weight: "" },
  ]);
  const [result, setResult] = useState<number | null>(null);

  function handleChange(idx: number, field: string, value: string) {
    const updated = assignments.map((a, i) =>
      i === idx ? { ...a, [field]: value } : a
    );
    setAssignments(updated);
  }

  function addRow() {
    setAssignments([...assignments, { name: "", score: "", weight: "" }]);
  }

  function calculate() {
    const parsed = assignments.map((a) => ({
      ...a,
      score: parseFloat(a.score),
      weight: parseFloat(a.weight),
    }));
    setResult(calculateGrade(parsed));
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
        <div className="flex-1 flex flex-col items-center justify-center p-10">

        <h1 className="text-3xl font-bold mb-6 text-red-600">Grade Calculator</h1>

        <div className="w-full max-w-xl bg-gray-50 p-6 rounded shadow">
          <table className="w-full mb-4">
            <thead>
              <tr>
                <th className="text-left">Assignment</th>
                <th className="text-left">Score (%)</th>
                <th className="text-left">Weight (%)</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a, idx) => (
                <tr key={idx}>
                  <td>
                    <input
                      className="border p-1 rounded w-full"
                      value={a.name}
                      onChange={(e) => handleChange(idx, "name", e.target.value)}
                      placeholder="e.g. Homework 1"
                    />
                  </td>
                  <td>
                    <input
                      className="border p-1 rounded w-full"
                      type="number"
                      value={a.score}
                      onChange={(e) => handleChange(idx, "score", e.target.value)}
                      placeholder="e.g. 95"
                    />
                  </td>
                  <td>
                    <input
                      className="border p-1 rounded w-full"
                      type="number"
                      value={a.weight}
                      onChange={(e) => handleChange(idx, "weight", e.target.value)}
                      placeholder="e.g. 20"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition mr-2"
            onClick={addRow}
          >
            Add Assignment
          </button>

          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
            onClick={calculate}
          >
            Calculate Grade
          </button>

          {result !== null && (
            <div className="mt-4 text-lg font-semibold">
              Final Grade: <span className="text-red-600">{result.toFixed(2)}%</span>
            </div>
          )}
          </div>
        </div>
      </div>
    
  );
}