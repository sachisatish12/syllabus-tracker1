"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Navigation/Sidebar";
import ClassCard from "@/components/ClassCard";
import ClassModal from "@/components/Modals/ClassModal";
import EditClassModal from "@/components/Modals/EditClassModal";
import type { ClassType } from "@/lib/types";

export default function Dashboard() {
	const [classes, setClasses] = useState<ClassType[]>([]);
  	const [selectedClass, setSelectedClass] = useState<ClassType | null>(null);
  	const [editingClass, setEditingClass] = useState<ClassType | null>(null);
  	const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  	const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  	useEffect(() => {
    	async function fetchClasses() {
			const res = await fetch("/api/classes", {
  			method: "GET",
  			credentials: "include",
			});
      		if (!res.ok) return;
      		const data = await res.json();
      		setClasses(data);
    	}
		fetchClasses();
  	}, []);

	useEffect(() => {
		const stored = localStorage.getItem("classes");
		if (stored) {
			setClasses(JSON.parse(stored));
		}
	}, []);

	const saveClasses = (updated: ClassType[]) => {
		setClasses(updated);
		localStorage.setItem("classes", JSON.stringify(updated));
	};

	const handleClassClick = (classData: ClassType) => {
		setSelectedClass(classData);
		setIsViewModalOpen(true);
	};

	const handleEdit = (classData: ClassType) => {
		setEditingClass(classData);
		setIsEditModalOpen(true);
	};

	const handleRemove = async (id: string) => {
    	const res = await fetch('/api/classes/${id}', {
  			method: "DELETE",
  			credentials: "include",
		});;
		if (!res.ok) return;
		setClasses((prev) => prev.filter((c) => c._id !== id));
  	};

	const handleSaveEdit = async (updatedClass: ClassType) => {
		const res = await fetch(`/api/classes/${updatedClass._id}`, {
  			method: "PUT",
  			headers: { "Content-Type": "application/json" },
  			body: JSON.stringify(updatedClass),
  			credentials: "include",
		});
		if (!res.ok) return;
		
		setClasses((prev) =>
			prev.map((c) => (c._id === updatedClass._id ? updatedClass : c))
		);
  	};

	return (
		<div className="min-h-screen flex bg-linear-to-b from-white via-red-50 to-white">
			<Sidebar />
			<div className="flex-1 p-6 max-w-5xl mx-auto">
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

				<div>
					<h2 className="text-lg font-semibold text-black mb-3">Your Classes</h2>
					{classes.length === 0 ? (
						<p className="text-gray-400 text-sm">No classes yet. Click "Add Class" to get started.</p>
					) : (
						<div className="space-y-3">
							{classes.map((c) => (
								<div key={c.className}>
									<ClassCard
										classData={c}
										onClick={handleClassClick}
										onEdit={handleEdit}
										onRemove={handleRemove}
									/>
								</div>
							))}
						</div>
					)}
				</div>

				{selectedClass && (
					<ClassModal
						classData={selectedClass}
						isOpen={isViewModalOpen}
						onClose={() => setIsViewModalOpen(false)}
						onRemove={handleRemove}
					/>
				)}

				{editingClass && (
					<EditClassModal
						classData={editingClass}
						isOpen={isEditModalOpen}
						onClose={() => setIsEditModalOpen(false)}
						onSave={handleSaveEdit}
					/>
				)}
			</div>
		</div>
	);
}