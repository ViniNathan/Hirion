import { mainAgent } from "./mainAgent";

const agentCall = (document: string, jobDescription: string) =>
	mainAgent.invoke({
		messages: [
			{
				role: "user",
				content: `Currículo do candidato:\n\n${document}\n\n---\n\nDescrição da vaga:\n\n${jobDescription}`,
			},
		],
		document, // Passa o documento no state para o guardrail
	});

export { agentCall };
