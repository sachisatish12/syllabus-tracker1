"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      username: email, // IMPORTANT: matches your backend (username field)
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid credentials");
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative">

      {/* background accents */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-red-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-black/10 rounded-full blur-3xl" />

      <div className="card w-full max-w-md p-8 shadow-xl">

        {/* logo */}
        <div className="text-center mb-6">
          <Image src="/logo.png" alt="logo" width={50} height={50} className="mx-auto" />
          <h1 className="text-2xl font-bold mt-3">Welcome back</h1>
          <p className="text-sm text-gray-500">Sign in to continue</p>
        </div>

        {/* error */}
        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* inputs */}
        <div className="space-y-3">
          <input
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500"
            placeholder="Email / Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-red-500"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-5 p-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
        >
          {loading ? "Logging in..." : "Sign in"}
        </button>

        {/* links */}
        <div className="text-center mt-5 text-sm">
          <p
            onClick={() => router.push("/signup")}
            className="text-red-600 cursor-pointer hover:underline"
          >
            Create account
          </p>

          <p
            onClick={() => router.push("/")}
            className="text-gray-400 mt-2 cursor-pointer"
          >
            ← Back home
          </p>
        </div>

      </div>
    </div>
  );
}