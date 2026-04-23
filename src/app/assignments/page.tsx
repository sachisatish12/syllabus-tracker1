"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Navigation/Sidebar";
import type { ClassType, Exam, Assignment, Quiz } from "@/lib/types";
import {
	FiCalendar,
	FiClock,
	FiBookOpen,
	FiAward,
	FiPlus,
	FiEdit2,
	FiTrash2,
	FiAlertCircle,
	FiCheckCircle,
	FiChevronDown,
	FiChevronRight,
} from "react-icons/fi";
import AddItemModal from "@/components/Modals/AddItemModal";
import EditItemModal from "@/components/Modals/EditItemModal";

interface DueItem {
	id: string;
	type: "exam" | "assignment" | "quiz";
	name: string;
	className: string;
	dueDate: string | null;
	weight: number;
	classIndex: number;
	itemIndex: number;
	completed: boolean;
}

export default function AllAssignments() {
	const [upcomingItems, setUpcomingItems] = useState<DueItem[]>([]);
	const [pastDueItems, setPastDueItems] = useState<DueItem[]>([]);
	const [undatedItems, setUndatedItems] = useState<DueItem[]>([]);
	const [completedItems, setCompletedItems] = useState<DueItem[]>([]);
	const [classes, setClasses] = useState<ClassType[]>([]);
	const [loading, setLoading] = useState(true);
	const [isAddModalOpen, setIsAddModalOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<DueItem | null>(null);

	// Collapsible state for each section
	const [showPastDue, setShowPastDue] = useState(true);
	const [showUpcoming, setShowUpcoming] = useState(true);
	const [showUndated, setShowUndated] = useState(true);
	const [showCompleted, setShowCompleted] = useState(false);

	const getCompletedMap = (): Record<string, boolean> => {
		const stored = localStorage.getItem("completedItems");
		return stored ? JSON.parse(stored) : {};
	};

	const saveCompletedMap = (map: Record<string, boolean>) => {
		localStorage.setItem("completedItems", JSON.stringify(map));
	};

	const loadData = () => {
		const stored = localStorage.getItem("classes");
		if (stored) {
			const parsedClasses: ClassType[] = JSON.parse(stored);
			setClasses(parsedClasses);
			const completedMap = getCompletedMap();
			const now = new Date();

			const upcoming: DueItem[] = [];
			const pastDue: DueItem[] = [];
			const undated: DueItem[] = [];
			const completed: DueItem[] = [];

			parsedClasses.forEach((cls, classIdx) => {
				cls.exams.forEach((exam, examIdx) => {
					const id = `${cls.className}-exam-${examIdx}`;
					const item: DueItem = {
						id,
						type: "exam",
						name: exam.name,
						className: cls.className,
						dueDate: exam.date || null,
						weight: exam.weight,
						classIndex: classIdx,
						itemIndex: examIdx,
						completed: completedMap[id] || false,
					};
					categorizeItem(item, now, upcoming, pastDue, undated, completed);
				});

				cls.assignments.forEach((assignment, assignIdx) => {
					const id = `${cls.className}-assignment-${assignIdx}`;
					const due = (assignment as any).dueDate;
					const item: DueItem = {
						id,
						type: "assignment",
						name: assignment.name,
						className: cls.className,
						dueDate: due || null,
						weight: assignment.weight,
						classIndex: classIdx,
						itemIndex: assignIdx,
						completed: completedMap[id] || false,
					};
					categorizeItem(item, now, upcoming, pastDue, undated, completed);
				});

				cls.quizzes.forEach((quiz, quizIdx) => {
					const id = `${cls.className}-quiz-${quizIdx}`;
					const item: DueItem = {
						id,
						type: "quiz",
						name: quiz.name || `Quiz ${quizIdx + 1}`,
						className: cls.className,
						dueDate: quiz.date || null,
						weight: quiz.weight,
						classIndex: classIdx,
						itemIndex: quizIdx,
						completed: completedMap[id] || false,
					};
					categorizeItem(item, now, upcoming, pastDue, undated, completed);
				});
			});

			upcoming.sort((a, b) => (a.dueDate! > b.dueDate! ? 1 : -1));
			pastDue.sort((a, b) => (a.dueDate! > b.dueDate! ? 1 : -1));
			completed.sort((a, b) => {
				if (a.dueDate && b.dueDate) return a.dueDate > b.dueDate ? 1 : -1;
				return 0;
			});

			setUpcomingItems(upcoming);
			setPastDueItems(pastDue);
			setUndatedItems(undated);
			setCompletedItems(completed);
		}
		setLoading(false);
	};

	const categorizeItem = (
		item: DueItem,
		now: Date,
		upcoming: DueItem[],
		pastDue: DueItem[],
		undated: DueItem[],
		completed: DueItem[],
	) => {
		if (item.completed) {
			completed.push(item);
		} else if (!item.dueDate) {
			undated.push(item);
		} else {
			const due = new Date(item.dueDate);
			due < now ? pastDue.push(item) : upcoming.push(item);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	const saveClasses = (updatedClasses: ClassType[]) => {
		localStorage.setItem("classes", JSON.stringify(updatedClasses));
		setClasses(updatedClasses);
		loadData();
	};

	const toggleComplete = (item: DueItem) => {
		const completedMap = getCompletedMap();
		completedMap[item.id] = !item.completed;
		saveCompletedMap(completedMap);
		loadData();
	};

	const handleAddItem = (newItem: {
		classIndex: number;
		type: "exam" | "assignment" | "quiz";
		name: string;
		dueDate: string;
		weight: number;
	}) => {
		const updatedClasses = [...classes];
		const targetClass = updatedClasses[newItem.classIndex];

		if (newItem.type === "exam") {
			targetClass.exams.push({
				name: newItem.name,
				date: newItem.dueDate || undefined,
				weight: newItem.weight,
			});
		} else if (newItem.type === "assignment") {
			targetClass.assignments.push({
				name: newItem.name,
				weight: newItem.weight,
				dueDate: newItem.dueDate || undefined,
			} as Assignment);
		} else if (newItem.type === "quiz") {
			targetClass.quizzes.push({
				name: newItem.name,
				weight: newItem.weight,
				date: newItem.dueDate || undefined,
			});
		}

		saveClasses(updatedClasses);
	};

	const handleDeleteItem = (item: DueItem) => {
		if (!confirm(`Delete ${item.name} from ${item.className}?`)) return;

		const updatedClasses = [...classes];
		const targetClass = updatedClasses[item.classIndex];

		if (item.type === "exam") {
			targetClass.exams.splice(item.itemIndex, 1);
		} else if (item.type === "assignment") {
			targetClass.assignments.splice(item.itemIndex, 1);
		} else if (item.type === "quiz") {
			targetClass.quizzes.splice(item.itemIndex, 1);
		}

		const completedMap = getCompletedMap();
		delete completedMap[item.id];
		saveCompletedMap(completedMap);

		saveClasses(updatedClasses);
	};

	const handleUpdateItem = (updatedItem: {
		classIndex: number;
		itemIndex: number;
		type: "exam" | "assignment" | "quiz";
		name: string;
		dueDate: string;
		weight: number;
	}) => {
		const updatedClasses = [...classes];
		const targetClass = updatedClasses[updatedItem.classIndex];

		if (updatedItem.type === "exam") {
			targetClass.exams[updatedItem.itemIndex] = {
				name: updatedItem.name,
				date: updatedItem.dueDate || undefined,
				weight: updatedItem.weight,
			};
		} else if (updatedItem.type === "assignment") {
			targetClass.assignments[updatedItem.itemIndex] = {
				name: updatedItem.name,
				weight: updatedItem.weight,
				dueDate: updatedItem.dueDate || undefined,
			} as Assignment;
		} else if (updatedItem.type === "quiz") {
			targetClass.quizzes[updatedItem.itemIndex] = {
				name: updatedItem.name,
				weight: updatedItem.weight,
				date: updatedItem.dueDate || undefined,
			};
		}

		saveClasses(updatedClasses);
		setEditingItem(null);
	};

	const getTypeIcon = (type: string) => {
		switch (type) {
			case "exam":
				return <FiAward className="text-blue-500" />;
			case "assignment":
				return <FiBookOpen className="text-green-500" />;
			default:
				return <FiClock className="text-purple-500" />;
		}
	};

	const formatDate = (dateStr: string | null) => {
		if (!dateStr) return "No due date";
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			month: "short",
			day: "numeric",
			year: "numeric",
		});
	};

	const isPastDue = (dateStr: string | null) => {
		if (!dateStr) return false;
		return new Date(dateStr) < new Date();
	};

	const renderItemCard = (item: DueItem) => (
		<div
			key={item.id}
			className="group bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition"
		>
			<div className="flex items-start justify-between">
				<div className="flex items-start gap-4">
					<button
						onClick={() => toggleComplete(item)}
						className="mt-1 text-gray-400 hover:text-green-500 transition"
						title={item.completed ? "Mark incomplete" : "Mark complete"}
					>
						<FiCheckCircle size={20} className={item.completed ? "text-green-500" : ""} />
					</button>
					<div>
						<h3
							className={`font-semibold ${item.completed ? "text-gray-400 line-through" : "text-gray-900"}`}
						>
							{item.name}
						</h3>
						<p className="text-sm text-gray-500">
							{item.className} • Weight: {item.weight}%
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2 text-sm">
						{item.dueDate ? (
							<>
								<FiClock
									className={
										isPastDue(item.dueDate) && !item.completed ? "text-red-500" : "text-gray-400"
									}
								/>
								<span
									className={`font-medium ${isPastDue(item.dueDate) && !item.completed ? "text-red-600" : "text-gray-700"}`}
								>
									{formatDate(item.dueDate)}
								</span>
							</>
						) : (
							<>
								<FiAlertCircle className="text-yellow-500" />
								<span className="text-yellow-600 font-medium">No due date</span>
							</>
						)}
					</div>
					<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
						<button
							onClick={() => setEditingItem(item)}
							className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
							title="Edit"
						>
							<FiEdit2 size={16} />
						</button>
						<button
							onClick={() => handleDeleteItem(item)}
							className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
							title="Delete"
						>
							<FiTrash2 size={16} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);

	const renderCollapsibleSection = (
		title: string,
		icon: React.ReactNode,
		items: DueItem[],
		emptyMessage: string,
		isExpanded: boolean,
		onToggle: () => void,
	) => (
		<section className="mb-6">
			<button
				onClick={onToggle}
				className="w-full flex items-center justify-between text-lg font-semibold text-gray-800 mb-3 hover:text-gray-900 transition"
			>
				<span className="flex items-center gap-2">
					{icon}
					{title}
					{items.length > 0 && (
						<span className="text-sm font-normal text-gray-400 ml-2">({items.length})</span>
					)}
				</span>
				{isExpanded ? <FiChevronDown size={20} /> : <FiChevronRight size={20} />}
			</button>
			{isExpanded && (
				<>
					{items.length === 0 ? (
						<div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-200">
							<div className="mx-auto text-gray-300 mb-2 text-3xl">{icon}</div>
							<p className="text-gray-500 text-sm">{emptyMessage}</p>
						</div>
					) : (
						<div className="space-y-3">{items.map(renderItemCard)}</div>
					)}
				</>
			)}
		</section>
	);

	return (
		<div className="min-h-screen flex bg-gray-50">
			<Sidebar />
			<main className="flex-1 p-6 max-w-6xl mx-auto">
				<div className="mb-6 flex items-center justify-between">
					<div>
						<h1 className="text-3xl font-bold text-gray-900">All Assignments & Exams</h1>
						<p className="text-gray-500 text-sm mt-1">Manage all graded items across your classes.</p>
					</div>
					<button
						onClick={() => setIsAddModalOpen(true)}
						className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-sm"
					>
						<FiPlus size={18} />
						<span>Add New</span>
					</button>
				</div>

				{loading ? (
					<div className="text-center py-12 text-gray-400">Loading...</div>
				) : (
					<>
						{renderCollapsibleSection(
							"Past Due",
							<FiAlertCircle className="text-red-500" />,
							pastDueItems,
							"No past due items — you're all caught up!",
							showPastDue,
							() => setShowPastDue(!showPastDue),
						)}

						{renderCollapsibleSection(
							"Upcoming",
							<FiCalendar className="text-blue-500" />,
							upcomingItems,
							"No upcoming due dates",
							showUpcoming,
							() => setShowUpcoming(!showUpcoming),
						)}

						{renderCollapsibleSection(
							"No Due Date",
							<FiClock className="text-yellow-500" />,
							undatedItems,
							"All items have due dates",
							showUndated,
							() => setShowUndated(!showUndated),
						)}

						{renderCollapsibleSection(
							"Completed",
							<FiCheckCircle className="text-green-500" />,
							completedItems,
							"No completed items yet",
							showCompleted,
							() => setShowCompleted(!showCompleted),
						)}
					</>
				)}

				<AddItemModal
					isOpen={isAddModalOpen}
					onClose={() => setIsAddModalOpen(false)}
					classes={classes}
					onAdd={handleAddItem}
				/>

				{editingItem && (
					<EditItemModal
						isOpen={true}
						onClose={() => setEditingItem(null)}
						classes={classes}
						item={editingItem}
						onUpdate={handleUpdateItem}
					/>
				)}
			</main>
		</div>
	);
}
