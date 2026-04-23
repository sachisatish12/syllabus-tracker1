import Link from "next/link";

export default function Sidebar() {
	return (
		<div className="w-64 bg-black text-white p-5 min-h-screen">
			<h2 className="text-red-500 font-bold mb-8 text-xl">Syllabus Tracker</h2>

			<nav className="space-y-4 text-sm">
				<Link href="/dashboard" className="block hover:text-red-400">
					Dashboard
				</Link>
				<Link href="/add-class" className="block hover:text-red-400">
					Add Classes
				</Link>
				<Link href="/grade-calculator" className="block hover:text-red-400">
					Grade Calculator
				</Link>
				<Link href="/" className="block hover:text-red-400">
					Logout
				</Link>
			</nav>
		</div>
	);
}
