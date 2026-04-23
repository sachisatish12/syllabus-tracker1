export type Exam = {
	name: string;
	date?: string;
	weight: number;
};

export type Assignment = {
	name: string;
	weight: number;
	dueDate?: string;
};

export type Quiz = {
	name: string;
	weight: number;
	date?: string;
};

export type ClassType = {
	className: string;
	teacherName: string;
	teacherEmail: string;
	exams: Exam[];
	assignments: Assignment[];
	quizzes: Quiz[];
	officeHours: {
		time: string;
		location: string;
	};
	taName: string;
	taEmail: string;
};
