import mongoose, { Schema, models, model } from "mongoose";

const AssignmentSchema = new Schema({
    title: String,
    grade: Number,
    dueDate: Date,
});

const ClassSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    professor: String,
    assignments: [AssignmentSchema],
});

export default models.Class || model("Class", ClassSchema);