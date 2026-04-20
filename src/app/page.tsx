"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 flex flex-col">

      {/* NAV BAR */}
      <div className="flex justify-between items-center px-8 py-5 border-b bg-white">
        <div className="flex items-center gap-3">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <span className="font-bold text-xl text-black">
            Syllabus Tracker
          </span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => router.push("/login")}
            className="text-black hover:text-red-600"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="flex flex-1 flex-col items-center justify-center text-center px-6">

        <div className="mb-6">
          <Image src="/logo.png" alt="logo" width={110} height={110} />
        </div>

        <h1 className="text-5xl font-bold text-black leading-tight">
          Welcome to <span className="text-red-600">Syllabus Tracker</span>
        </h1>

        <p className="mt-4 text-gray-600 max-w-xl text-lg">
          Track your classes, office hours, and assignment weights so you always know
          exactly what you need to succeed.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => router.push("/login")}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800"
          >
            Login
          </button>

          <button
            onClick={() => router.push("/signup")}
            className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700"
          >
            Create Account
          </button>
        </div>
      </div>

      {/* FOOTER STYLE DECOR */}
      <div className="text-center text-xs text-gray-400 pb-4">
        Built for UGA students 🎓
      </div>
    </div>
  );
}