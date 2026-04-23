import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-black text-white p-5 min-h-screen">

      <h2 className="text-red-500 font-bold mb-8 text-xl">
        StudyAI
      </h2>

      <nav className="space-y-4 text-sm">

        <Link href="/dashboard" className="block hover:text-red-400">
          Dashboard
        </Link>

        <Link href="/grade-calculator" className="block hover:text-red-400">
          Grade Calculator
        </Link>

        <Link href="/study-hub" className="block hover:text-red-400">
          Study Hub
        </Link>

        <Link href="/" className="block hover:text-red-400">
          Logout / Homepage
        </Link>

      </nav>
    </div>
  );
}