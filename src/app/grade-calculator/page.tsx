"use client";

import { useState, useEffect } from "react";
import { calculateGrade } from "@/lib/grade";
import Sidebar from "@/components/Navigation/Sidebar";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import type { ClassType } from "@/lib/types";

interface GradeItem {
	name: string;
	score: string;
	weight: string;
}

export default function GradeCalculatorPage() {
	const [classes, setClasses] = useState<ClassType[]>([]);
	const [selectedClass, setSelectedClass] = useState<string>("");
	const [items, setItems] = useState<GradeItem[]>([{ name: "", score: "", weight: "" }]);
	const [result, setResult] = useState<number | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem("classes");
		if (stored) {
			const parsed = JSON.parse(stored);
			setClasses(parsed);
		}
	}, []);

	const handleClassSelect = (className: string) => {
		setSelectedClass(className);
		const targetClass = classes.find((c) => c.className === className);
		if (!targetClass) return;

		const newItems: GradeItem[] = [];

		targetClass.exams.forEach((exam) => {
			newItems.push({
				name: exam.name || "Exam",
				score: "",
				weight: exam.weight.toString(),
			});
		});

		targetClass.assignments.forEach((assignment) => {
			newItems.push({
				name: assignment.name || "Assignment",
				score: "",
				weight: assignment.weight.toString(),
			});
		});

		targetClass.quizzes.forEach((quiz) => {
			newItems.push({
				name: quiz.name || "Quiz",
				score: "",
				weight: quiz.weight.toString(),
			});
		});

		if (newItems.length === 0) {
			setItems([{ name: "", score: "", weight: "" }]);
		} else {
			setItems(newItems);
		}
		setResult(null);
	};

	function handleChange(idx: number, field: keyof GradeItem, value: string) {
		const updated = items.map((item, i) => (i === idx ? { ...item, [field]: value } : item));
		setItems(updated);
	}

	function addRow() {
		setItems([...items, { name: "", score: "", weight: "" }]);
	}

	function removeRow(idx: number) {
		if (items.length === 1) return;
		const updated = items.filter((_, i) => i !== idx);
		setItems(updated);
	}

	function calculate() {
		let parsed = items.map((item) => ({
			name: item.name,
			score: parseFloat(item.score) || 0,
			weight: parseFloat(item.weight) || 0,
		}));

		const totalWeight = parsed.reduce((sum, item) => sum + item.weight, 0);

		// If no weights provided, treat all items as equally weighted
		if (totalWeight === 0 && parsed.length > 0) {
			const equalWeight = 100 / parsed.length;
			parsed = parsed.map((item) => ({
				...item,
				weight: equalWeight,
			}));
		}

		setResult(calculateGrade(parsed));
	}

	const totalWeight = items.reduce((sum, item) => sum + (parseFloat(item.weight) || 0), 0);

	return (
		<div className="min-h-screen bg-gray-50">
			<Sidebar />
			<main className="pl-64 p-6">
				<div className="max-w-4xl mx-auto">
					<div className="mb-6">
						<h1 className="text-3xl font-bold text-gray-900">Grade Calculator</h1>
						<p className="text-gray-500 text-sm mt-1">
							Select a class to load its assignments, or enter items manually.
						</p>
					</div>

					<div className="mb-4">
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Load from Class (Optional)
						</label>
						<div className="flex gap-3">
							<select
								value={selectedClass}
								onChange={(e) => handleClassSelect(e.target.value)}
								className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
							>
								<option value="">-- Select a class --</option>
								{classes.map((cls) => (
									<option key={cls.className} value={cls.className}>
										{cls.className}
									</option>
								))}
							</select>
							{selectedClass && (
								<button
									onClick={() => {
										setSelectedClass("");
										setItems([{ name: "", score: "", weight: "" }]);
										setResult(null);
									}}
									className="text-sm text-gray-500 hover:text-gray-700"
								>
									Clear
								</button>
							)}
						</div>
					</div>

					<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
						<div className="p-6">
							<table className="w-full">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="text-left pb-3 text-sm font-medium text-gray-500">Item</th>
										<th className="text-left pb-3 text-sm font-medium text-gray-500">Score (%)</th>
										<th className="text-left pb-3 text-sm font-medium text-gray-500">Weight (%)</th>
										<th className="w-10"></th>
									</tr>
								</thead>
								<tbody>
									{items.map((item, idx) => (
										<tr key={idx} className="border-b border-gray-100 last:border-0">
											<td className="py-3 pr-3">
												<input
													className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
													value={item.name}
													onChange={(e) => handleChange(idx, "name", e.target.value)}
													placeholder="e.g., Midterm"
												/>
											</td>
											<td className="py-3 pr-3">
												<input
													className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
													type="number"
													value={item.score}
													onChange={(e) => handleChange(idx, "score", e.target.value)}
													placeholder="85"
													min="0"
													max="100"
												/>
											</td>
											<td className="py-3 pr-3">
												<input
													className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
													type="number"
													value={item.weight}
													onChange={(e) => handleChange(idx, "weight", e.target.value)}
													placeholder="20"
													min="0"
													max="100"
												/>
											</td>
											<td className="py-3">
												<button
													onClick={() => removeRow(idx)}
													disabled={items.length === 1}
													className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-400 transition"
													title="Remove"
												>
													<FiTrash2 size={16} />
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>

							<button
								onClick={addRow}
								className="mt-4 flex items-center gap-2 text-sm text-red-600 hover:text-red-700 font-medium transition"
							>
								<FiPlus size={16} />
								Add Custom Item
							</button>
						</div>

						<div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
							<div className="text-sm">
								<span className="text-gray-500">Total Weight: </span>
								<span
									className={`font-medium ${totalWeight === 100 ? "text-green-600" : "text-yellow-600"}`}
								>
									{totalWeight}%
								</span>
								{totalWeight !== 100 && totalWeight > 0 && (
									<span className="text-gray-400 ml-2 text-xs">(should equal 100%)</span>
								)}
								{totalWeight === 0 && items.length > 0 && (
									<span className="text-gray-400 ml-2 text-xs">(all items weighted equally)</span>
								)}
							</div>

							<div className="flex items-center gap-4">
								{result !== null && (
									<div className="text-lg font-semibold">
										Final Grade: <span className="text-red-600">{result.toFixed(2)}%</span>
									</div>
								)}
								<button
									onClick={calculate}
									className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition font-medium"
								>
									Calculate Grade
								</button>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
