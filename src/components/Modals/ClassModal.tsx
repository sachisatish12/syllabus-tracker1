"use client";

import type { ClassType } from "@/lib/types";

interface ClassModalProps {
	classData: ClassType;
	isOpen: boolean;
	onClose: () => void;
	onRemove: (className: string) => void;
	onEdit?: (classData: ClassType) => void; // Optional direct edit from modal
}

export default function ClassModal({ classData, isOpen, onClose, onRemove, onEdit }: ClassModalProps) {
	if (!isOpen) return null;

	const handleRemove = () => {
		if (confirm(`Remove ${classData.className}?`)) {
			onRemove(classData.className);
			onClose();
		}
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/30" onClick={onClose} />
			<div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
				<div className="flex items-start justify-between mb-4">
					<h2 className="text-2xl font-bold text-gray-900">{classData.className}</h2>
					<button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
						×
					</button>
				</div>

				{/* Basic Info */}
				<div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-xl">
					<div>
						<p className="text-sm font-medium text-gray-700">Professor</p>
						<p className="text-gray-900">{classData.teacherName}</p>
						<p className="text-xs text-gray-500">{classData.teacherEmail}</p>
					</div>
					<div>
						<p className="text-sm font-medium text-gray-700">Office Hours</p>
						<p className="text-gray-900">{classData.officeHours.time}</p>
						<p className="text-xs text-gray-500">{classData.officeHours.location}</p>
					</div>
					{classData.taName && (
						<div className="col-span-2">
							<p className="text-sm font-medium text-gray-700">Teaching Assistant</p>
							<p className="text-gray-900">
								{classData.taName} ({classData.taEmail})
							</p>
						</div>
					)}
				</div>

				{/* Exams Section */}
				{classData.exams.length > 0 && (
					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
							<span className="text-blue-600">|</span> Exams
						</h3>
						<div className="space-y-2">
							{classData.exams.map((exam, idx) => (
								<div key={idx} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
									<div>
										<p className="font-medium">{exam.name}</p>
										{exam.date && <p className="text-sm text-gray-600">{exam.date}</p>}
									</div>
									<span className="font-semibold text-blue-700">{exam.weight}%</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Assignments Section */}
				{classData.assignments.length > 0 && (
					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
							<span className="text-green-600">|</span> Assignments
						</h3>
						<div className="space-y-2">
							{classData.assignments.map((assignment, idx) => (
								<div key={idx} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
									<p className="font-medium">{assignment.name}</p>
									<span className="font-semibold text-green-700">{assignment.weight}%</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Quizzes Section */}
				{classData.quizzes.length > 0 && (
					<div className="mb-6">
						<h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
							<span className="text-purple-600">|</span> Quizzes
						</h3>
						<div className="space-y-2">
							{classData.quizzes.map((quiz, idx) => (
								<div
									key={idx}
									className="flex justify-between items-center p-3 bg-purple-50 rounded-lg"
								>
									<p className="font-medium">Quiz {idx + 1}</p>
									<span className="font-semibold text-purple-700">{quiz.weight}%</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Action Buttons */}
				<div className="flex justify-end gap-3 mt-6 pt-4 border-t">
					{onEdit && (
						<button
							onClick={() => {
								onEdit(classData);
								onClose();
							}}
							className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
						>
							Edit
						</button>
					)}
					<button
						onClick={handleRemove}
						className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
					>
						Remove
					</button>
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
