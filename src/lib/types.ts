export type Exam = {
	name: string;
	date?: string;
	weight: number;
};

export type Assignment = {
	name: string;
	weight: number;
};

export type Quiz = {
	weight: number;
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
