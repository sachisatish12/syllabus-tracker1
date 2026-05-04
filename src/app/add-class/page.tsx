"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Navigation/Sidebar";
import AISyllabusParser from "@/components/AISyllabusParser";
import ManualClassForm from "@/components/ManualClassForm";
import ReviewClassModal from "@/components/Modals/ReviewClassModal";
import type { ClassType } from "@/lib/types";

export default function AddClass() {
	const router = useRouter();
	const [modalData, setModalData] = useState<ClassType | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

  	async function saveClass(classData: ClassType) {
    	setLoading(true);
    	setError("");

    	try {
      	const res = await fetch("/api/classes", {
  			method: "POST",
  			headers: { "Content-Type": "application/json" },
  			body: JSON.stringify(classData),
  			credentials: "include",
		});

      	if (!res.ok) {
        	const data = await res.json();
        	throw new Error(data.error || "Failed to save class");
      	}

      	router.push("/dashboard");
    	}
		catch (err: any) {
      	setError(err.message);
    	}
		finally {
      	setLoading(false);
    	}
  	}

  	function handlePreview(data: ClassType) {
    	setModalData(data);
    	setIsModalOpen(true);
  	}

  	function handleConfirm(updatedData: ClassType) {
    	saveClass(updatedData);
    	setIsModalOpen(false);
    	setModalData(null);
  	}

  	function handleCloseModal() {
    	setIsModalOpen(false);
    	setModalData(null);
  	}

  	return (
		<div className="min-h-screen flex bg-white">
			<Sidebar />
			<div className="flex-1 p-6 max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold mb-6 text-black">Add a Class</h1>

				<div className="bg-white border rounded-2xl p-5 shadow-sm mb-6">
					<h2 className="text-lg font-semibold text-red-600 mb-3">Upload Syllabus (PDF)</h2>
					<AISyllabusParser onParsed={handlePreview} />
				</div>

				<div className="bg-white border rounded-2xl p-5 shadow-sm">
					<h2 className="text-lg font-semibold text-black mb-3">Or Enter Manually</h2>
					<ManualClassForm onPreview={handlePreview} />
				</div>

				{modalData && (
					<ReviewClassModal
						initialData={modalData}
						isOpen={isModalOpen}
						onClose={handleCloseModal}
						onConfirm={handleConfirm}
					/>
				)}
			</div>
		</div>
	);
}