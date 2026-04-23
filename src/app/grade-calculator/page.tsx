"use client";

import { useState } from "react";
import { calculateGrade } from "@/lib/grade";
import Sidebar from "@/components/Navigation/Sidebar";
import { FiPlus, FiTrash2 } from "react-icons/fi";

export default function GradeCalculatorPage() {
	const [assignments, setAssignments] = useState([{ name: "", score: "", weight: "" }]);
	const [result, setResult] = useState<number | null>(null);

	function handleChange(idx: number, field: string, value: string) {
		const updated = assignments.map((a, i) => (i === idx ? { ...a, [field]: value } : a));
		setAssignments(updated);
	}

	function addRow() {
		setAssignments([...assignments, { name: "", score: "", weight: "" }]);
	}

	function removeRow(idx: number) {
		if (assignments.length === 1) return;
		const updated = assignments.filter((_, i) => i !== idx);
		setAssignments(updated);
	}

	function calculate() {
		const parsed = assignments.map((a) => ({
			...a,
			score: parseFloat(a.score) || 0,
			weight: parseFloat(a.weight) || 0,
		}));
		setResult(calculateGrade(parsed));
	}

	const totalWeight = assignments.reduce((sum, a) => sum + (parseFloat(a.weight) || 0), 0);

	return (
		<div className="min-h-screen bg-gray-50">
			<Sidebar />
			<main className="pl-64 p-6">
				<div className="max-w-4xl mx-auto">
					<div className="mb-6">
						<h1 className="text-3xl font-bold text-gray-900">Grade Calculator</h1>
						<p className="text-gray-500 text-sm mt-1">
							Calculate your final grade by entering your assignments and their weights.
						</p>
					</div>

					<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
						<div className="p-6">
							<table className="w-full">
								<thead>
									<tr className="border-b border-gray-200">
										<th className="text-left pb-3 text-sm font-medium text-gray-500">Assignment</th>
										<th className="text-left pb-3 text-sm font-medium text-gray-500">Score (%)</th>
										<th className="text-left pb-3 text-sm font-medium text-gray-500">Weight (%)</th>
										<th className="w-10"></th>
									</tr>
								</thead>
								<tbody>
									{assignments.map((a, idx) => (
										<tr key={idx} className="border-b border-gray-100 last:border-0">
											<td className="py-3 pr-3">
												<input
													className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
													value={a.name}
													onChange={(e) => handleChange(idx, "name", e.target.value)}
													placeholder="e.g., Homework 1"
												/>
											</td>
											<td className="py-3 pr-3">
												<input
													className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
													type="number"
													value={a.score}
													onChange={(e) => handleChange(idx, "score", e.target.value)}
													placeholder="95"
													min="0"
													max="100"
												/>
											</td>
											<td className="py-3 pr-3">
												<input
													className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
													type="number"
													value={a.weight}
													onChange={(e) => handleChange(idx, "weight", e.target.value)}
													placeholder="20"
													min="0"
													max="100"
												/>
											</td>
											<td className="py-3">
												<button
													onClick={() => removeRow(idx)}
													disabled={assignments.length === 1}
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
								Add Assignment
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
								{totalWeight !== 100 && (
									<span className="text-gray-400 ml-2 text-xs">(should equal 100%)</span>
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
