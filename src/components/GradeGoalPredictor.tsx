"use client";

import { useState } from "react";
import { neededOnFinal } from "@/lib/grade";

export default function GradeGoalPredictor({ current }: any) {
  const [target, setTarget] = useState(90);
  const [finalWeight, setFinalWeight] = useState(30);

  const needed = neededOnFinal(current, target, finalWeight);

  return (
    <div className="p-4 border rounded bg-white mt-4">
      <h3 className="font-bold text-red-600">🎯 Grade Goal</h3>

      <input
        type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        className="border p-1 mt-2"
      />

      <p className="mt-2">
        You need <b>{needed.toFixed(2)}%</b> on final
      </p>
    </div>
  );
}