"use client";

import { useState } from "react";

export default function ManualClassForm({ onAdd }: any) {
	const [form, setForm] = useState({
		className: "",
		teacher: "",
		teacherEmail: "",
		taName: "",
		taEmail: "",
		officeTime: "",
		officeLocation: "",
	});

	function handleChange(e: any) {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit() {
		if (!form.className || !form.teacher) return;

		onAdd({
			className: form.className,
			teacher: form.teacher,
			teacherEmail: form.teacherEmail,
			taName: form.taName,
			taEmail: form.taEmail,
			officeHours: {
				time: form.officeTime,
				location: form.officeLocation,
			},
		});

		setForm({
			className: "",
			teacher: "",
			teacherEmail: "",
			taName: "",
			taEmail: "",
			officeTime: "",
			officeLocation: "",
		});
	}

	return (
		<div className="space-y-3">
			<input
				name="className"
				placeholder="Class Name"
				value={form.className}
				onChange={handleChange}
				className="w-full border p-2 rounded"
			/>

			<input
				name="teacher"
				placeholder="Professor Name"
				value={form.teacher}
				onChange={handleChange}
				className="w-full border p-2 rounded"
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
				onClick={handleSubmit}
				className="w-full bg-black text-white py-2 rounded hover:bg-red-600 transition cursor-pointer"
			>
				Add Class
			</button>
		</div>
	);
}
