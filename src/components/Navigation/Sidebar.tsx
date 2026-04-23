"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiPlusCircle, FiBarChart2, FiLogOut, FiCalendar } from "react-icons/fi";

export default function Sidebar() {
	const pathname = usePathname();

	const navItems = [
		{ href: "/dashboard", label: "Dashboard", icon: FiHome },
		{ href: "/add-class", label: "Add Class", icon: FiPlusCircle },
		{ href: "/assignments", label: "All Assignments", icon: FiCalendar },
		{ href: "/grade-calculator", label: "Grade Calculator", icon: FiBarChart2 },
	];

	const isActive = (href: string) => pathname === href;

	return (
		<aside className="fixed top-0 left-0 w-64 h-screen bg-black text-gray-300 flex flex-col border-r border-gray-800 overflow-y-auto">
			{/* Logo / Brand - Now clickable */}
			<div className="p-5 border-b border-gray-800 shrink-0">
				<Link href="/dashboard" className="block">
					<div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
						<div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-xl">S</span>
						</div>
						<span className="text-white font-semibold text-lg tracking-tight">
							Syllabus<span className="text-red-500">Tracker</span>
						</span>
					</div>
				</Link>
			</div>

			{/* Navigation Links */}
			<nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
				{navItems.map(({ href, label, icon: Icon }) => (
					<Link
						key={href}
						href={href}
						className={`
              flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
              ${
					isActive(href)
						? "bg-red-600 text-white shadow-md shadow-red-900/30"
						: "text-gray-300 hover:bg-gray-800 hover:text-white"
				}
            `}
					>
						<Icon size={18} />
						<span>{label}</span>
					</Link>
				))}
			</nav>

			{/* Footer: Logout button above user info */}
			<div className="p-4 border-t border-gray-800 shrink-0">
				<button
					className="w-full flex items-center justify-center gap-2 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg cursor-pointer transition"
					onClick={() => signOut({ callbackUrl: "/login" })}
				>
					<FiLogOut size={16} />
					<span>Logout</span>
				</button>
			</div>
		</aside>
	);
}
