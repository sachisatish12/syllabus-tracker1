"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* NAV */}
      <div className="flex justify-between items-center px-8 py-5 border-b">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <span className="font-bold text-xl text-black">
            Syllabus <span className="text-red-600">Tracker</span>
          </span>
        </div>

        <div className="flex gap-4">
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
      </div>

      {/* HERO */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">

        <Image src="/logo.png" alt="logo" width={110} height={110} />

        <h1 className="text-5xl font-bold mt-6 text-black">
          Master your{" "}
          <span className="text-red-600">Syllabus</span> in one place
        </h1>

        <p className="mt-4 text-gray-600 max-w-xl text-lg">
          Track assignments, predict grades, and stay ahead of deadlines with a modern AI-powered dashboard.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => router.push("/login")}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition"
          >
            Create Account
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center text-xs text-gray-400 pb-4">
        Built for UGA students 🎓
      </div>
    </div>
  );
}