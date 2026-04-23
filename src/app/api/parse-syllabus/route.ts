import { NextResponse } from "next/server";
import { extractText } from "unpdf";
import Groq from "groq-sdk";

export const runtime = "nodejs";

const groq = new Groq({
	apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: Request) {
	try {
		const formData = await req.formData();
		const file = formData.get("file");

		if (!file || typeof file === "string" || !(file as any).arrayBuffer) {
			return NextResponse.json({ error: "No valid file uploaded" }, { status: 400 });
		}

		const blob = file as Blob;
		const buffer = Buffer.from(await blob.arrayBuffer());

		const { text } = await extractText(new Uint8Array(buffer), { mergePages: true });

		if (!text || text.trim().length === 0) {
			return NextResponse.json({ error: "Could not extract text from PDF" }, { status: 400 });
		}

		const prompt = `
      You are an expert at extracting structured data from university course syllabi. Read the following syllabus text and extract the requested information into a JSON object.

      IMPORTANT EXTRACTION RULES:
      - "className": Look for the course title, subject code, or header (e.g., "CSCI 2720", "Software Engineering"). If multiple, use the most specific.
      - "teacherName": Look for "Instructor:", "Professor:", or similar. Extract the full name.
      - "teacherEmail": Look for an email address associated with the instructor (usually contains "@uga.edu" or similar).
      - "exams": Find any tests, midterms, or finals. Look for mentions of "Test", "Exam", "Midterm", "Final". For each, extract a "name" (e.g., "Midterm Exam"), "date" if mentioned (else empty string), and "weight" as a percentage number (e.g., 20). Include ALL exams mentioned, not just one.
      - "assignments": Find homework or individual projects. Look for "Homework", "Assignments", "Project". For each distinct assignment category or individual assignment, extract "name" (e.g., "Homework 1", "Individual Project") and "weight" (percentage). If multiple homeworks are grouped with a total weight, create a single entry with that total weight. Include ALL assignments mentioned.
      - "quizzes": Find any quizzes or in-class exercises that count toward the grade. Extract "weight" as a number. If there are multiple quiz categories (e.g., weekly quizzes, pop quizzes), list each with its weight. Include ALL quizzes mentioned.
      - "officeHours": Look for "Office hours:", "Office Hours:", or similar. Extract the "time" and "location".
      - "taName": Look for "Teaching assistant", "TA:", or similar. If not specified, use empty string.
      - "taEmail": Look for TA email; if not found, empty string.

      GRADING BREAKDOWN SECTION (if present):
      - Locate a table or list showing percentages for components. Use those numbers directly.
      - If weights are given as ranges (e.g., "Each: 2%-5%"), you can use the average or the first number.

      Return ONLY a valid JSON object with this exact structure:

      {
        "className": "",
        "teacherName": "",
        "teacherEmail": "",
        "exams": [
          { "name": "", "date": "", "weight": 0 }
        ],
        "assignments": [
          { "name": "", "weight": 0, dueDate: "" }
        ],
        "quizzes": [
          { "weight": 0, dueDate: "" }
        ],
        "officeHours": {
          "time": "",
          "location": ""
        },
        "taName": "",
        "taEmail": ""
      }

      Remember: The arrays can contain multiple items. Include every exam, assignment, and quiz you find.

      If a field cannot be found, use an empty string or empty array. For numeric weights, if a percentage is mentioned, use that number (without the % sign). If not found, use 0.

      Syllabus text begins here:
      ${text}
    `;

		const completion = await groq.chat.completions.create({
			model: "llama-3.3-70b-versatile", // Free tier, very capable
			messages: [{ role: "user", content: prompt }],
			temperature: 0.1,
			response_format: { type: "json_object" }, // ✅ Groq supports JSON mode!
		});

		const output = completion.choices[0]?.message?.content ?? "{}";

		console.log("raw response: ", output);

		let parsed;
		try {
			parsed = JSON.parse(output);
		} catch (err) {
			console.error("Invalid JSON from Groq:", output);
			return NextResponse.json({ error: "AI returned invalid JSON", raw: output }, { status: 500 });
		}

		return NextResponse.json(parsed);
	} catch (err: any) {
		console.error("Route error:", err);
		return NextResponse.json(
			{
				error: "Failed to process PDF",
				details: err.message || String(err),
			},
			{ status: 500 },
		);
	}
}
