import OpenAI from "openai";
import { NextResponse } from "next/server";
import * as pdfParse from "pdf-parse";

export const runtime = "nodejs"; // IMPORTANT for Buffer + pdf-parse

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    // ✅ validate file properly
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No valid file uploaded" },
        { status: 400 }
      );
    }

    // convert file → buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // parse pdf
    const data = await (pdfParse as any)(buffer);
    const text = data.text;

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: "Could not extract text from PDF" },
        { status: 400 }
      );
    }

    // call OpenAI
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You extract structured syllabus data. Return ONLY valid JSON.",
        },
        {
          role: "user",
          content: `
Extract this syllabus into JSON:

{
  "className": "",
  "teacher": "",
  "exams": [
    { "name": "", "date": "", "weight": 0 }
  ],
  "assignments": [
    { "name": "", "weight": 0 }
  ],
  "quizzes": [
    { "weight": 0 }
  ]
}

Rules:
- return ONLY valid JSON
- no markdown
- no explanations
- weights must be numbers

Syllabus:
${text}
          `,
        },
      ],
      temperature: 0.2,
    });

    const output = response.choices[0]?.message?.content ?? "{}";

    let parsed;
    try {
      parsed = JSON.parse(output);
    } catch (err) {
      console.error("Invalid JSON from OpenAI:", output);

      return NextResponse.json(
        { error: "AI returned invalid JSON", raw: output },
        { status: 500 }
      );
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Route error:", err);

    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}