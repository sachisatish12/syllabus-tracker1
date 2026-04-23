"use client";

import { useRouter } from "next/navigation";
import type { ClassType } from "@/lib/types";

interface ClassModalProps {
	classData: ClassType;
	isOpen: boolean;
	onClose: () => void;
	onRemove: (className: string) => void;
}

export default function ClassModal({ classData, isOpen, onClose, onRemove }: ClassModalProps) {
	const router = useRouter();

	if (!isOpen) return null;

	const handleEdit = () => {
		onClose();
		router.push(`/edit-class?name=${encodeURIComponent(classData.className)}`);
	};

	const handleRemove = () => {
		if (confirm(`Are you sure you want to remove ${classData.className}?`)) {
			onRemove(classData.className);
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			{/* Overlay */}
			<div className="absolute inset-0 bg-black/30" onClick={onClose} />

			{/* Modal Content */}
			<div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
				<h2 className="text-2xl font-bold text-gray-900 mb-4">{classData.className}</h2>

				<div className="space-y-3 text-sm">
					<p>
						<span className="font-semibold">Professor:</span> {classData.teacherName} (
						{classData.teacherEmail})
					</p>
					{classData.taName && (
						<p>
							<span className="font-semibold">TA:</span> {classData.taName} ({classData.taEmail})
						</p>
					)}
					<p>
						<span className="font-semibold">Office Hours:</span> {classData.officeHours.time} @{" "}
						{classData.officeHours.location}
					</p>

					{/* Exams */}
					{classData.exams.length > 0 && (
						<div>
							<h3 className="font-semibold mt-4">Exams</h3>
							<ul className="list-disc pl-5 mt-1">
								{classData.exams.map((exam, idx) => (
									<li key={idx}>
										{exam.name} {exam.date && `(${exam.date})`} — {exam.weight}%
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Assignments */}
					{classData.assignments.length > 0 && (
						<div>
							<h3 className="font-semibold mt-4">Assignments</h3>
							<ul className="list-disc pl-5 mt-1">
								{classData.assignments.map((assign, idx) => (
									<li key={idx}>
										{assign.name} — {assign.weight}%
									</li>
								))}
							</ul>
						</div>
					)}

					{/* Quizzes */}
					{classData.quizzes.length > 0 && (
						<div>
							<h3 className="font-semibold mt-4">Quizzes</h3>
							<ul className="list-disc pl-5 mt-1">
								{classData.quizzes.map((quiz, idx) => (
									<li key={idx}>
										Quiz {idx + 1}: {quiz.weight}%
									</li>
								))}
							</ul>
						</div>
					)}
				</div>

				<div className="mt-6 flex justify-end gap-3">
					<button
						onClick={handleRemove}
						className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition cursor-pointer"
					>
						Remove
					</button>
					<button
						onClick={handleEdit}
						className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer"
					>
						Edit
					</button>
					<button
						onClick={onClose}
						className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition cursor-pointer"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
