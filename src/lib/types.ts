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

export interface ClassType {
  _id: string;
  userId: string;
  className: string;
  teacherName?: string;
  teacherEmail?: string;
  officeHours?: {
    time: string;
    location: string;
  };
  taName?: string;
  taEmail?: string;
  exams: Exam[];
  assignments: Assignment[];
  quizzes: Quiz[];
}

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}