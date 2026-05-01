import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";

export async function POST(req: Request) {
  try {
    const { username, email, password } = await req.json();

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User created", user });
  } catch (error) {
    return NextResponse.json({ error: "Signup failed" }, { status: 500 });
  }
}