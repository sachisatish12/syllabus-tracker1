"use client";

import { useState } from "react";
import type { ClassType, Exam, Assignment, Quiz } from "@/lib/types";

interface EditClassModalProps {
	classData: ClassType;
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedClass: ClassType) => void;
}

export default function EditClassModal({ classData, isOpen, onClose, onSave }: EditClassModalProps) {
	const [formData, setFormData] = useState<ClassType>(classData);

	if (!isOpen) return null;

	const handleChange = (field: keyof ClassType, value: any) => {
		setFormData((prev) => ({ ...prev, [field]: value }));
	};

	const handleOfficeHoursChange = (field: "time" | "location", value: string) => {
		setFormData((prev) => ({
			...prev,
			officeHours: { ...prev.officeHours, [field]: value },
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(formData);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/30" onClick={onClose} />
			<div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
				<h2 className="text-xl font-bold mb-4">Edit {classData.className}</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Class Name</label>
						<input
							type="text"
							value={formData.className}
							onChange={(e) => handleChange("className", e.target.value)}
							className="w-full border rounded-lg px-3 py-2"
							required
						/>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium mb-1">Professor Name</label>
							<input
								type="text"
								value={formData.teacherName}
								onChange={(e) => handleChange("teacherName", e.target.value)}
								className="w-full border rounded-lg px-3 py-2"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Professor Email</label>
							<input
								type="text"
								value={formData.teacherEmail}
								onChange={(e) => handleChange("teacherEmail", e.target.value)}
								className="w-full border rounded-lg px-3 py-2"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium mb-1">TA Name</label>
							<input
								type="text"
								value={formData.taName}
								onChange={(e) => handleChange("taName", e.target.value)}
								className="w-full border rounded-lg px-3 py-2"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">TA Email</label>
							<input
								type="text"
								value={formData.taEmail}
								onChange={(e) => handleChange("taEmail", e.target.value)}
								className="w-full border rounded-lg px-3 py-2"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3">
						<div>
							<label className="block text-sm font-medium mb-1">Office Hours Time</label>
							<input
								type="text"
								value={formData.officeHours.time}
								onChange={(e) => handleOfficeHoursChange("time", e.target.value)}
								className="w-full border rounded-lg px-3 py-2"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-1">Office Hours Location</label>
							<input
								type="text"
								value={formData.officeHours.location}
								onChange={(e) => handleOfficeHoursChange("location", e.target.value)}
								className="w-full border rounded-lg px-3 py-2"
							/>
						</div>
					</div>

					{/* You can expand with Exams, Assignments, Quizzes editors if needed */}

					<div className="flex justify-end gap-2 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
						>
							Cancel
						</button>
						<button type="submit" className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700">
							Save Changes
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
