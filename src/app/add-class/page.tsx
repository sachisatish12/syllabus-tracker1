"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { addClass } from "@/lib/store";
import Sidebar from "@/components/Sidebar";
import AISyllabusParser from "@/components/AISyllabusParser";
import ManualClassForm from "@/components/ManualClassForm";
import type { ClassType } from "@/lib/types";

export default function AddClass() {
	const router = useRouter();
	const [classes, setClasses] = useState<ClassType[]>([]);

	// TEMP: while we dont have a backend
	function saveToLocalStorage(newClass: ClassType) {
		const existing = JSON.parse(localStorage.getItem("classes") || "[]");
		const updated = [...existing, newClass];
		localStorage.setItem("classes", JSON.stringify(updated));
	}

	function handleParsed(data: ClassType) {
		// addClass(data);
		saveToLocalStorage(data);
		setClasses((prev) => [...prev, data]);
		router.push("/dashboard");
	}

	function handleManualAdd(data: ClassType) {
		// addClass(data);
		saveToLocalStorage(data);
		setClasses((prev) => [...prev, data]);
		router.push("/dashboard");
	}

	return (
		<div className="min-h-screen flex bg-white">
			<Sidebar />
			<div className="flex-1 p-6 max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold mb-6 text-black">Add a Class</h1>
				<div className="bg-white border rounded-2xl p-5 shadow-sm mb-6">
					<h2 className="text-lg font-semibold text-red-600 mb-3">Upload Syllabus (PDF)</h2>
					<AISyllabusParser onParsed={handleParsed} />
				</div>
				<div className="bg-white border rounded-2xl p-5 shadow-sm mb-6">
					<h2 className="text-lg font-semibold text-black mb-3">Or Enter Manually</h2>
					<ManualClassForm onAdd={handleManualAdd} />
				</div>
			</div>
		</div>
	);
}
