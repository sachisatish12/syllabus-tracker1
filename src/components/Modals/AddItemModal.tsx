"use client";

import { useState } from "react";
import type { ClassType } from "@/lib/types";

interface AddItemModalProps {
	isOpen: boolean;
	onClose: () => void;
	classes: ClassType[];
	onAdd: (item: {
		classIndex: number;
		type: "exam" | "assignment" | "quiz";
		name: string;
		dueDate: string; // empty string allowed
		weight: number;
	}) => void;
}

export default function AddItemModal({ isOpen, onClose, classes, onAdd }: AddItemModalProps) {
	const [classIndex, setClassIndex] = useState<number>(0);
	const [type, setType] = useState<"exam" | "assignment" | "quiz">("exam");
	const [name, setName] = useState("");
	const [dueDate, setDueDate] = useState("");
	const [weight, setWeight] = useState<number>(0);

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || weight <= 0) return;

		onAdd({
			classIndex,
			type,
			name: name.trim(),
			dueDate, // may be empty
			weight,
		});

		setName("");
		setDueDate("");
		setWeight(0);
		setType("exam");
		setClassIndex(0);
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
			<div className="absolute inset-0 bg-black/30" onClick={onClose} />
			<div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
				<h2 className="text-xl font-bold mb-4">Add New Item</h2>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block text-sm font-medium mb-1">Class</label>
						<select
							value={classIndex}
							onChange={(e) => setClassIndex(parseInt(e.target.value))}
							className="w-full border rounded-lg px-3 py-2"
							required
						>
							{classes.length === 0 ? (
								<option disabled>No classes available</option>
							) : (
								classes.map((cls, idx) => (
									<option key={cls.className} value={idx}>
										{cls.className}
									</option>
								))
							)}
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Type</label>
						<select
							value={type}
							onChange={(e) => setType(e.target.value as any)}
							className="w-full border rounded-lg px-3 py-2"
						>
							<option value="exam">Exam</option>
							<option value="assignment">Assignment</option>
							<option value="quiz">Quiz</option>
						</select>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Name</label>
						<input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder={type === "exam" ? "Midterm Exam" : "Homework 1"}
							className="w-full border rounded-lg px-3 py-2"
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Due Date (optional)</label>
						<input
							type="date"
							value={dueDate}
							onChange={(e) => setDueDate(e.target.value)}
							className="w-full border rounded-lg px-3 py-2"
						/>
					</div>

					<div>
						<label className="block text-sm font-medium mb-1">Weight (%)</label>
						<input
							type="number"
							min="0"
							max="100"
							step="0.1"
							value={weight}
							onChange={(e) => setWeight(parseFloat(e.target.value))}
							className="w-full border rounded-lg px-3 py-2"
							required
						/>
					</div>

					<div className="flex justify-end gap-2 pt-4">
						<button
							type="button"
							onClick={onClose}
							className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
							disabled={classes.length === 0}
						>
							Add Item
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
