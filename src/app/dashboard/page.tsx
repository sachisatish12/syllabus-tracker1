"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import ClassCard from "@/components/ClassCard";
import ClassModal from "@/components/ClassModal";
import type { ClassType } from "@/lib/types";

export default function Dashboard() {
	const [classes, setClasses] = useState<ClassType[]>([]);
	const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const stored = localStorage.getItem("classes");
		if (stored) {
			setClasses(JSON.parse(stored));
		}
	}, []);

	const handleClassClick = (classData: ClassType) => {
		setSelectedClass(classData);
		setIsModalOpen(true);
	};

	const handleRemoveClass = (className: string) => {
		const updated = classes.filter((c) => c.className !== className);
		setClasses(updated);
		localStorage.setItem("classes", JSON.stringify(updated));
	};

	return (
		<div className="min-h-screen flex bg-linear-to-b from-white via-red-50 to-white">
			<Sidebar />
			<div className="flex-1 p-6 max-w-5xl mx-auto">
				{/* HEADER */}
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-black">Dashboard</h1>
						<p className="text-gray-500 text-sm">View all your classes below.</p>
					</div>
					<Link
						href="/add-class"
						className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
					>
						Add Class
					</Link>
				</div>

				{/* CLASSES */}
				<div>
					<h2 className="text-lg font-semibold text-black mb-3">Your Classes</h2>
					{classes.length === 0 ? (
						<p className="text-gray-400 text-sm">No classes yet. Click "Add Class" to get started.</p>
					) : (
						<div className="space-y-3">
							{classes.map((c) => (
								<div key={c.className} onClick={() => handleClassClick(c)} className="cursor-pointer">
									<ClassCard classData={c} />
								</div>
							))}
						</div>
					)}
				</div>

				{/* MODAL */}
				{selectedClass && (
					<ClassModal
						classData={selectedClass}
						isOpen={isModalOpen}
						onClose={() => setIsModalOpen(false)}
						onRemove={handleRemoveClass}
					/>
				)}
			</div>
		</div>
	);
}
