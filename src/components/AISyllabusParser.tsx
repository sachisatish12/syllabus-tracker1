"use client";

import { useRef, useState } from "react";
import type { ClassType, Exam, Assignment, Quiz } from "@/lib/types";

interface RawResponse {
	className: string;
	teacherName: string;
	teacherEmail: string;
	exams: Exam[];
	assignments: Assignment[];
	quizzes: Quiz[];
	officeHours: { time: string; location: string };
	taName: string;
	taEmail: string;
}

interface Props {
	onParsed: (data: ClassType) => void;
}

export default function AISyllabusParser({ onParsed }: Props) {
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);

	function mapAIToClassType(data: RawResponse): ClassType {
		return {
			className: data.className || "Untitled Class",
			teacherName: data.teacherName || "Unknown Instructor",
			teacherEmail: data.teacherEmail || "Unknown Instructor Email",
			exams: data.exams || [],
			assignments: data.assignments || [],
			quizzes: data.quizzes || [],
			officeHours: data.officeHours || { time: "TBD", location: "TBD" },
			taName: data.taName || "Unknown TA Name",
			taEmail: data.taEmail || "Unknown TA Email",
		};
	}

	async function handleUpload() {
		if (!file) {
			setError("Please select a PDF file first.");
			return;
		}

		setLoading(true);
		setError(null);

		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await fetch("/api/parse-syllabus", {
				method: "POST",
				body: formData,
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || data.details || `Request failed (${res.status})`);
			}

			console.log("Raw AI response:", data);

			const classData = mapAIToClassType(data as RawResponse);
			onParsed(classData);

			// Reset
			setFile(null);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
		} catch (err: any) {
			console.error(err);
			setError(err.message || "An unexpected error occurred.");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="space-y-4">
			<input
				type="file"
				accept="application/pdf"
				ref={fileInputRef}
				style={{ display: "none" }}
				onChange={(e) => {
					setFile(e.target.files?.[0] || null);
					setError(null);
				}}
			/>

			<button
				type="button"
				onClick={() => fileInputRef.current?.click()}
				className="w-full py-3 rounded-xl bg-gray-200 text-black hover:bg-gray-300 transition cursor-pointer"
			>
				{file ? (
					<>
						Selected: <span className="text-blue-400">'{file.name}'</span>
					</>
				) : (
					"Choose PDF"
				)}
			</button>

			{error && (
				<div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-200">{error}</div>
			)}

			<button
				onClick={handleUpload}
				disabled={loading || !file}
				className="w-full py-3 rounded-xl bg-black text-white hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{loading ? "Reading syllabus..." : "Upload & Parse PDF →"}
			</button>
		</div>
	);
}
