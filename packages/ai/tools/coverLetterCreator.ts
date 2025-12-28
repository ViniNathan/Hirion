import { createAgent, HumanMessage, tool } from "langchain";
import { z } from "zod";
import { prompts } from "../prompts";

const coverLetterCreatorSubagent = createAgent({
	model: "gemini-2.5-flash",
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
		const response = await coverLetterCreatorSubagent.invoke({
			messages: [
				prompts.coverLetterCreator,
				new HumanMessage(
					`Currículo do candidato:\n\n${curriculum}\n\n---\n\nDescrição da vaga:\n\n${jobDescription}`,
				),
			],
		});
		return response;
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
