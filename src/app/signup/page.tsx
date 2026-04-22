"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Signup() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    setError("");
    setLoading(true);

    const res = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed");
      setLoading(false);
      return;
    }

    // auto login
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">

      <div className="card w-full max-w-md p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Create account
        </h1>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <div className="space-y-3">

          <input
            className="w-full p-3 border rounded-xl"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="w-full p-3 border rounded-xl"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 border rounded-xl"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full mt-5 p-3 bg-red-600 text-white rounded-xl"
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        <p
          onClick={() => router.push("/login")}
          className="text-center text-sm text-gray-500 mt-4 cursor-pointer"
        >
          Already have an account?
        </p>

      </div>
    </div>
  );
}