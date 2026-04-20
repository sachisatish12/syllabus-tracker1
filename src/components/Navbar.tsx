"use client";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-between items-center px-6 py-4 bg-black text-white">
      <div className="text-xl font-bold text-red-600">
        🎓 Syllabus Tracker
      </div>

      <div className="flex gap-4 text-sm">
        <button className="hover:text-red-500">Login</button>
        <button className="bg-red-600 px-3 py-1 rounded hover:bg-red-700">
          Sign Up
        </button>
      </div>
    </nav>
  );
}