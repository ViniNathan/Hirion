import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, modelCallLimitMiddleware } from "langchain";
import { curriculumGuardrail } from "../guardrails";
import { prompts } from "../prompts";
import "dotenv-flow/config";

const model = new ChatGoogleGenerativeAI({
	model: "gemini-2.5-flash",
	apiKey: process.env.GOOGLE_API_KEY,
});

const mainAgent = createAgent({
	model,
	tools: [],
	middleware: [
		curriculumGuardrail({ documentKey: "document" }),
		modelCallLimitMiddleware({
			threadLimit: 3,
			runLimit: 5,
			exitBehavior: "end",
		}),
	],
	systemPrompt: prompts.curriculumScorer,
});

export { mainAgent };
