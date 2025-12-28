import { SystemMessage } from "@langchain/core/messages";
import { mainAgent } from "./mainAgent";

const agentCall = (document: string, jobDescription: string) =>
	mainAgent.invoke({
		messages: [
			new SystemMessage({
				content: `Você é um assistente que processa currículos e descrições de vagas.
						
				Quando receber um currículo e uma descrição de vaga, você DEVE:
				1. Primeiro, chamar a ferramenta CurriculumScorerSubagent para avaliar o currículo
				2. Depois, chamar a ferramenta CoverLetterCreatorSubagent para criar uma carta de apresentação

				Sempre chame AMBAS as ferramentas nesta ordem. Não retorne a resposta até ter chamado ambas.`,
			}),
			{
				role: "user",
				content: `Currículo do candidato:\n\n${document}\n\n---\n\nDescrição da vaga:\n\n${jobDescription}`,
			},
		],
		document, // Passa o documento no state para o guardrail
	});

export { agentCall };
