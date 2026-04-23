import type { ClassType } from "@/lib/types";

interface Props {
	classData: ClassType;
}

export default function ClassCard({ classData }: Props) {
	return (
		<div className="bg-white border rounded-2xl p-5 mb-3 cursor-pointer hover:shadow-md transition">
			<h3 className="font-bold">{classData.className}</h3>
			<p className="text-sm text-gray-500">Professor: {classData.teacherName}</p>
			<p className="text-xs text-gray-400">📧 {classData.teacherEmail}</p>
			<p className="text-xs text-gray-400">
				TA: {classData.taName} ({classData.taEmail})
			</p>
			<p className="text-xs text-gray-400 mt-2">
				Office Hours: {classData.officeHours.time} @ {classData.officeHours.location}
			</p>
		</div>
	);
}
