import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
    email: string;
    password: string;
    name?: string;
}

const UserSchema = new Schema<IUser>(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        name: { type: String },
    },
    { timestamps: true }
);

export default models.User || model<IUser>("User", UserSchema);