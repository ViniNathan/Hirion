import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, HumanMessage, tool } from "langchain";
import { z } from "zod";
import { prompts } from "../prompts";
import "dotenv-flow/config";

const curriculumScorerSubagent = createAgent({
	model: new ChatGoogleGenerativeAI({
		model: "gemini-2.5-flash",
		apiKey: process.env.GOOGLE_API_KEY,
	}),
	tools: [],
});

const callCurriculumScorerSubagent = tool(
	async ({
		curriculum,
		jobDescription,
	}: {
		curriculum: string;
		jobDescription: string;
	}) => {
		try {
			const response = await curriculumScorerSubagent.invoke({
				messages: [
					prompts.curriculumScorer,
					new HumanMessage(
						`Currículo do candidato:\n\n${curriculum}\n\n---\n\nDescrição da vaga:\n\n${jobDescription}`,
					),
				],
			});
			return response;
		} catch (err) {
			const errorMessage =
				err instanceof Error
					? err.message
					: typeof err === "string"
						? err
						: "Erro desconhecido ao processar o currículo";
			throw new Error(
				`Erro ao avaliar o currículo: ${errorMessage}`,
			);
		}
	},
	{
		name: "CurriculumScorerSubagent",
		description: "Curriculum scorer subagent to score the curriculum",
		schema: z.object({
			curriculum: z.string(),
			jobDescription: z.string(),
		}),
	},
);

export { callCurriculumScorerSubagent };
