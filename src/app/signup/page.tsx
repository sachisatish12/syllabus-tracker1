"use client";

import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-6">Create Account</h1>

      <input className="border p-2 w-64 mb-3" placeholder="Name" />
      <input className="border p-2 w-64 mb-3" placeholder="Email" />
      <input className="border p-2 w-64 mb-3" placeholder="Password" type="password" />

      <button
        onClick={() => router.push("/dashboard")}
        className="bg-red-600 text-white px-6 py-2 rounded"
      >
        Sign Up
      </button>
    </div>
  );
}