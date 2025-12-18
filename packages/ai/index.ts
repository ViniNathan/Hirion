import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent } from "langchain";
import { curriculumGuardrail } from "./guardrails";

const model = new ChatGoogleGenerativeAI({
	model: "gemini-2.5-flash",
	apiKey: process.env.GOOGLE_API_KEY,
});

const agent = createAgent({
	model,
	tools: [],
	middleware: [curriculumGuardrail({ documentKey: "document" })],
});

export { agent };
