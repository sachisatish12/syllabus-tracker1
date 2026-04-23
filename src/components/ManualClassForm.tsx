"use client";

import { useState } from "react";

type Props = {
  onAdd: (data: any) => void;
};

export default function ManualClassForm({ onAdd }: Props) {
  const [className, setClassName] = useState("");
  const [teacher, setTeacher] = useState("");

  const [type, setType] = useState("Assignment");
  const [itemName, setItemName] = useState("");
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");

  const [officeTime, setOfficeTime] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");

  function handleSubmit() {
    const newClass = {
      className,
      teacher,
      exams: [],
      assignments: type === "Assignment" ? [{ name: itemName, weight, date }] : [],
      quizzes: type === "Quiz" ? [{ name: itemName, weight }] : [],
      officeHours: {
        time: officeTime,
        location: officeLocation,
      },
    };

    onAdd(newClass);

    // reset
    setClassName("");
    setTeacher("");
    setItemName("");
    setWeight("");
    setDate("");
    setOfficeTime("");
    setOfficeLocation("");
  }

  return (
    <div className="space-y-4">

      {/* CLASS INFO */}
      <input
        placeholder="Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Professor Name"
        value={teacher}
        onChange={(e) => setTeacher(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* TYPE */}
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option>Assignment</option>
        <option>Exam</option>
        <option>Quiz</option>
      </select>

      {/* ITEM */}
      <input
        placeholder="Name (Exam/Assignment/Quiz)"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Weight (%)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* OPTIONAL DATE */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* OFFICE HOURS */}
      <input
        placeholder="Office Hours Time (e.g. Mon 2-4pm)"
        value={officeTime}
        onChange={(e) => setOfficeTime(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        placeholder="Office Location"
        value={officeLocation}
        onChange={(e) => setOfficeLocation(e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full bg-black text-white py-2 rounded hover:bg-red-600"
      >
        Add Class
      </button>

    </div>
  );
}