export type Assignment = {
  assignment: string;
  weight: number;
  date?: string;
  score?: number;
};

export type ClassType = {
  className: string;
  teacher: string;
  assignments: Assignment[];
};