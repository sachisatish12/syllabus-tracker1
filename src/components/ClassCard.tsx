"use client";

import type { ClassType } from "@/lib/types";
import { FiEdit2, FiTrash2, FiUser, FiMail, FiClock } from "react-icons/fi";

interface Props {
	classData: ClassType;
	onEdit: (classData: ClassType) => void;
	onRemove: (className: string) => void;
	onClick: (classData: ClassType) => void; // ✅ New prop for card click
}

export default function ClassCard({ classData, onEdit, onRemove, onClick }: Props) {
	const handleCardClick = () => {
		onClick(classData);
	};

	const handleRemoveClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (confirm(`Remove ${classData.className}?`)) {
			onRemove(classData.className);
		}
	};

	const handleEditClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		onEdit(classData);
	};

	return (
		<div
			onClick={handleCardClick}
			className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:border-red-200 cursor-pointer"
		>
			{/* Top row: Class name and action buttons */}
			<div className="flex items-start justify-between">
				<h3 className="text-lg font-bold text-gray-900">{classData.className}</h3>
				<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
					<button
						onClick={handleEditClick}
						className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
						title="Edit class"
					>
						<FiEdit2 size={16} />
					</button>
					<button
						onClick={handleRemoveClick}
						className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
						title="Remove class"
					>
						<FiTrash2 size={16} />
					</button>
				</div>
			</div>

			{/* Professor info */}
			<div className="mt-3 space-y-2">
				<div className="flex items-center gap-2 text-sm text-gray-700">
					<FiUser className="text-gray-400 shrink-0" size={14} />
					<span className="font-medium">{classData.teacherName}</span>
				</div>
				<div className="flex items-center gap-2 text-xs text-gray-500">
					<FiMail className="text-gray-400 shrink-0" size={12} />
					<span>{classData.teacherEmail}</span>
				</div>

				{classData.taName && (
					<div className="flex items-center gap-2 text-xs text-gray-500">
						<FiUser className="text-gray-400 shrink-0" size={12} />
						<span>
							TA: {classData.taName}
							{classData.taEmail && ` (${classData.taEmail})`}
						</span>
					</div>
				)}

				<div className="flex items-start gap-2 text-xs text-gray-500">
					<FiClock className="text-gray-400 shrink-0 mt-0.5" size={12} />
					<span>
						{classData.officeHours.time} @ {classData.officeHours.location}
					</span>
				</div>
			</div>

			{/* Stats row */}
			<div className="mt-4 flex gap-3 text-xs">
				{classData.exams.length > 0 && (
					<span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
						| {classData.exams.length} Exam{classData.exams.length !== 1 && "s"}
					</span>
				)}
				{classData.assignments.length > 0 && (
					<span className="px-2 py-1 bg-green-50 text-green-700 rounded-full">
						| {classData.assignments.length} Assignment{classData.assignments.length !== 1 && "s"}
					</span>
				)}
				{classData.quizzes.length > 0 && (
					<span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-full">
						| {classData.quizzes.length} Quiz{classData.quizzes.length !== 1 && "zes"}
					</span>
				)}
			</div>
		</div>
	);
}
