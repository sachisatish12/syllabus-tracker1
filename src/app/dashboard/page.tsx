"use client";

import { useState } from "react";

export default function Dashboard() {
  const [classes, setClasses] = useState<any[]>([]);

  // CLASS INFO
  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");

  // ASSIGNMENT INFO
  const [assignment, setAssignment] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");

  function addClass() {
    if (!className || !teacher) return;

    const newClass = {
      className,
      teacher,
      assignments: assignment
        ? [{ assignment, weight, date }]
        : [],
      officeHours: "",
    };

    setClasses([...classes, newClass]);

    setClassName("");
    setTeacher("");
    setAssignment("");
    setWeight("");
    setDate("");
  }

  return (
    <div className="min-h-screen flex bg-gray-50">

      {/* SIDEBAR */}
      <div className="w-64 bg-black text-white p-6">
        <h1 className="text-xl font-bold text-red-500 mb-6">
          🎓 Syllabus Tracker
        </h1>

        <div className="space-y-3 text-sm">
          <p>Dashboard</p>
          <p>Classes</p>
          <p>Office Hours</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="flex-1 p-8">

        <h2 className="text-3xl font-bold mb-6">
          Your Dashboard 📊
        </h2>

        {/* ADD CLASS CARD */}
        <div className="bg-white p-6 rounded-xl shadow border mb-8">

          <h3 className="font-semibold text-red-600 mb-4">
            Add Class
          </h3>

          <div className="grid grid-cols-2 gap-4">

            <input
              className="border p-2 rounded"
              placeholder="Class Name"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Professor Name"
              value={teacher}
              onChange={(e) => setTeacher(e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Assignment (optional)"
              value={assignment}
              onChange={(e) => setAssignment(e.target.value)}
            />

            <input
              className="border p-2 rounded"
              placeholder="Weight %"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />

            {/* DATE OPTIONAL (CLEARLY LABELED) */}
            <div className="col-span-2">
              <input
                className="border p-2 rounded w-full"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <p className="text-xs text-gray-400 mt-1">
                Date is optional — leave blank if not applicable
              </p>
            </div>

          </div>

          <button
            onClick={addClass}
            className="mt-4 bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
          >
            Add Class
          </button>
        </div>

        {/* OFFICE HOURS SECTION (SEPARATE CARDS) */}
        <h3 className="text-xl font-semibold mb-3">
          Office Hours 🕒
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {classes.map((c, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <p className="font-bold">{c.className}</p>
              <p className="text-gray-600 text-sm">
                Prof. {c.teacher}
              </p>

              <p className="mt-3 text-blue-700 font-medium">
                Office Hours: Not set yet
              </p>
            </div>
          ))}

        </div>

        {/* ASSIGNMENTS SECTION */}
        <h3 className="text-xl font-semibold mt-8 mb-3">
          Assignments 📚
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {classes.map((c, i) => (
            <div
              key={i}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <p className="font-bold">{c.className}</p>

              {c.assignments?.length > 0 ? (
                c.assignments.map((a: any, idx: number) => (
                  <div
                    key={idx}
                    className="border-t mt-3 pt-2 text-sm"
                  >
                    <div className="flex justify-between">
                      <span>{a.assignment || "Unnamed assignment"}</span>
                      <span className="text-red-600">
                        {a.weight}%
                      </span>
                    </div>

                    {/* DATE OPTIONAL (FIXED) */}
                    {a.date ? (
                      <p className="text-xs text-gray-500">
                        Due: {a.date}
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400">
                        No due date provided
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-sm mt-2">
                  No assignments yet
                </p>
              )}
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}