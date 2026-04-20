"use client";

import Button from "./Button";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 border-b">
      {/* Logo */}
      <div className="text-xl font-bold">
        Syllabus Tracker
      </div>

      {/* Links */}
      <div className="flex gap-3">
        <Button text="Login" variant="secondary" />
        <Button text="Sign Up" variant="primary" />
      </div>
    </nav>
  );
}