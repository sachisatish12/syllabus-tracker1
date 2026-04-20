"use client";

import Button from "./Button";

export default function Hero() {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-24 px-4">
      
      <h1 className="text-4xl font-bold mb-4">
        Welcome to Syllabus Tracker!
      </h1>

      <p className="text-gray-600 max-w-md mb-8">
        Track your classes, manage syllabus weights, and instantly see what
        you need to score your target grade.
      </p>

      <div className="flex gap-4">
        <Button text="Login" variant="secondary" />
        <Button text="Create Account" variant="primary" />
      </div>
    </div>
  );
}