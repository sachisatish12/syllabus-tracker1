"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="w-full flex justify-between items-center px-8 py-5 border-b bg-white">
      
      {/* LOGO */}
      <div className="text-xl font-bold text-black tracking-tight">
        <span className="text-red-600">Syllabus</span>Tracker
      </div>

      {/* LINKS */}
      <div className="flex gap-6 items-center text-sm">
        <button
          onClick={() => router.push("/login")}
          className="text-black hover:text-red-600 transition"
        >
          Login
        </button>

        <button
          onClick={() => router.push("/signup")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}