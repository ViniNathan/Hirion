import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, HumanMessage, tool } from "langchain";
import { z } from "zod";
import { prompts } from "../prompts";
import "dotenv-flow/config";

const coverLetterCreatorSubagent = createAgent({
	model: new ChatGoogleGenerativeAI({
		model: "gemini-2.5-flash",
		apiKey: process.env.GOOGLE_API_KEY,
	}),
	tools: [],
});

const callCoverLetterCreatorSubagent = tool(
	async ({
		curriculum,
		jobDescription,
	}: {
		curriculum: string;
		jobDescription: string;
	}) => {
		try {
			const response = await coverLetterCreatorSubagent.invoke({
				messages: [
					prompts.coverLetterCreator,
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
			throw new Error(`Erro ao criar carta de apresentação: ${errorMessage}`);
		}
	},
	{
		name: "CoverLetterCreatorSubagent",
		description:
			"Cover letter creator subagent to create a cover letter for a given curriculum and job description",
		schema: z.object({
			curriculum: z.string(),
			jobDescription: z.string(),
		}),
	},
);

export { callCoverLetterCreatorSubagent };
