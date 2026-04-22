import OpenAI from "openai";
import { NextResponse } from "next/server";
import * as pdfParse from "pdf-parse";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // ✅ FIXED PDF PARSING
    const data = await (pdfParse as any)(buffer);
    const text = data.text;

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
Convert this syllabus into JSON:

{
  "className": "",
  "teacher": "",
  "assignments": [
    { "name": "", "weight": "", "date": "" }
  ]
}

Syllabus:
${text}
          `,
        },
      ],
      temperature: 0.2,
    });

    const output = response.choices[0].message.content;

    return NextResponse.json(JSON.parse(output || "{}"));
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to process PDF" },
      { status: 500 }
    );
  }
}