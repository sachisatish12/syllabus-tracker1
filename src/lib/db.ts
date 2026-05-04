import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI!;

if (!MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
}

let cached = globalThis as any;

if (!cached.mongoose) {
    cached.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.mongoose.conn) {
        return cached.mongoose.conn;
    }
    
    if (!cached.mongoose.promise) {
        cached.mongoose.promise = mongoose.connect(MONGO_URI).then((mongoose) => mongoose);
    }
    
    cached.mongoose.conn = await cached.mongoose.promise;
    return cached.mongoose.conn;
}