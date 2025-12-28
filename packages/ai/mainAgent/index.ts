import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, modelCallLimitMiddleware } from "langchain";
import { curriculumGuardrail } from "../guardrails";
import { callCoverLetterCreatorSubagent } from "../tools/coverLetterCreator";
import { callCurriculumScorerSubagent } from "../tools/curriculumScorer";
import "dotenv-flow/config";

const model = new ChatGoogleGenerativeAI({
	model: "gemini-2.5-flash",
	apiKey: process.env.GOOGLE_API_KEY,
});

const mainAgent = createAgent({
	model,
	tools: [callCurriculumScorerSubagent, callCoverLetterCreatorSubagent],
	middleware: [
		curriculumGuardrail({ documentKey: "document" }),
		modelCallLimitMiddleware({
			threadLimit: 3,
			runLimit: 5,
			exitBehavior: "end",
		}),
	],
});

export { mainAgent };
