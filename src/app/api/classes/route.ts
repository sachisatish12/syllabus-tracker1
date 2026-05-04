import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import ClassModel, { IClass } from "@/lib/models/Class";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const classes = await ClassModel.find({ userId: session.user.id });
  return NextResponse.json(classes);
}

export async function POST(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const newClass: Partial<IClass> = {
    userId: session.user.id,
    className: body.className,
    instructor: body.instructor,
    exams: body.exams || [],
    assignments: body.assignments || [],
    quizzes: body.quizzes || [],
  };

  const created = await ClassModel.create(newClass);
  return NextResponse.json(created);
}

export async function PUT(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { _id, ...rest } = body;

  const updated = await ClassModel.findOneAndUpdate(
    { _id, userId: session.user.id },
    rest,
    { new: true }
  );

  if (!updated) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing class ID" }, { status: 400 });
  }

  const deleted = await ClassModel.findOneAndDelete({ _id: id, userId: session.user.id });
  if (!deleted) {
    return NextResponse.json({ error: "Class not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}