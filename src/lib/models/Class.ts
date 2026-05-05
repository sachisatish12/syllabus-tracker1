import mongoose, { Schema, model, models } from "mongoose";

export interface Item {
    name: string;
    date?: string;
    dueDate?: string;
    weight: number;
    completed?: boolean;
}

export interface IClass {
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
    exams: Item[];
    assignments: Item[];
    quizzes: Item[];
}

const ItemSchema = new Schema<Item>({
    name: { type: String, required: true },
    date: String,
    dueDate: String,
    weight: { type: Number, required: true },
    completed: { type: Boolean, default: false },
});

const ClassSchema = new Schema<IClass>(
    {
        userId: { type: String, required: true },
        className: { type: String, required: true },

        teacherName: String,
        teacherEmail: String,

        officeHours: {
            time: String,
            location: String
        },

        taName: String,
        taEmail: String,

        exams: [ItemSchema],
        assignments: [ItemSchema],
        quizzes: [ItemSchema],
    },
    { timestamps: true }
);

export default models.Class || model<IClass>("Class", ClassSchema);