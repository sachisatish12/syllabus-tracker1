import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import { connectDB } from "@/lib/db";
import Class from "@/lib/models/Class";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const body = await req.json();

  const newClass = await Class.create({
    userId,
    name: body.name,
    professor: body.professor,
    assignments: [],
  });

  return NextResponse.json(newClass);
}

export async function GET() {
  const session = await getServerSession(authOptions);

  const userId = (session?.user as any)?.id;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const classes = await Class.find({
    userId,
  });

  return NextResponse.json(classes);
}