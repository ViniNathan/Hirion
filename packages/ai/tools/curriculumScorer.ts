import { createAgent, tool } from "langchain";
import { z } from "zod";

const curriculumScorerSubagent = createAgent({
	model: "gemini-2.5-flash",
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
		const response = await curriculumScorerSubagent.invoke({
			messages: [
				{
					role: "user",
					content: `Currículo do candidato:\n\n${curriculum}\n\n---\n\nDescrição da vaga:\n\n${jobDescription}`,
				},
			],
		});
		return response;
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
