"use client";

import { useState } from "react";

interface Props {
	onPreview: (data: any) => void;
}

export default function ManualClassForm({ onPreview }: Props) {
	const [form, setForm] = useState({
		className: "",
		teacherName: "",
		teacherEmail: "",
		taName: "",
		taEmail: "",
		officeTime: "",
		officeLocation: "",
	});

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		if (!form.className || !form.teacherName) return;

		onPreview({
			className: form.className,
			teacherName: form.teacherName,
			teacherEmail: form.teacherEmail,
			taName: form.taName,
			taEmail: form.taEmail,
			officeHours: {
				time: form.officeTime,
				location: form.officeLocation,
			},
			exams: [],
			assignments: [],
			quizzes: [],
		});
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-3">
			<input
				name="className"
				placeholder="Class Name *"
				value={form.className}
				onChange={handleChange}
				className="w-full border p-2 rounded"
				required
			/>

			<input
				name="teacherName"
				placeholder="Professor Name *"
				value={form.teacherName}
				onChange={handleChange}
				className="w-full border p-2 rounded"
				required
			/>

			<input
				name="teacherEmail"
				placeholder="Professor Email"
				value={form.teacherEmail}
				onChange={handleChange}
				className="w-full border p-2 rounded"
			/>

			<input
				name="taName"
				placeholder="TA Name"
				value={form.taName}
				onChange={handleChange}
				className="w-full border p-2 rounded"
			/>

			<input
				name="taEmail"
				placeholder="TA Email"
				value={form.taEmail}
				onChange={handleChange}
				className="w-full border p-2 rounded"
			/>

			<input
				name="officeTime"
				placeholder="Office Hours (e.g. Mon 2–4pm)"
				value={form.officeTime}
				onChange={handleChange}
				className="w-full border p-2 rounded"
			/>

			<input
				name="officeLocation"
				placeholder="Office Location"
				value={form.officeLocation}
				onChange={handleChange}
				className="w-full border p-2 rounded"
			/>

			<button
				type="submit"
				className="w-full bg-black text-white py-2 rounded hover:bg-red-600 transition cursor-pointer"
			>
				Preview Class
			</button>
		</form>
	);
}
