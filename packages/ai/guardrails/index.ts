import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createMiddleware } from "langchain";

type CurriculumGuardrailOptions = {
	documentKey?: string;
	classifierModel?: ChatGoogleGenerativeAI;
};

function normalizeText(input: string) {
	return input
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.toLowerCase();
}

function curriculumHeuristicScore(raw: string) {
	const text = normalizeText(raw);

	// Rejeições rápidas
	if (text.trim().length < 300) {
		return {
			score: 0,
			strongSignals: 0,
			reasons: ["texto_muito_curto"] as const,
		};
	}

	let score = 0;
	let strongSignals = 0;
	const reasons: string[] = [];

	const bump = (reason: string, points = 1, strong = false) => {
		score += points;
		if (strong) strongSignals += 1;
		reasons.push(reason);
	};

	// Seções típicas
	if (/(experience|experiencia)\b/.test(text))
		bump("secao_experiencia", 2, true);
	if (/(educacao|formacao|formacao academica|academic)\b/.test(text))
		bump("secao_educacao", 2, true);
	if (/(habilidades|skills|competenc|competencia)\b/.test(text))
		bump("secao_habilidades", 2, true);
	if (/(projetos|projects)\b/.test(text)) bump("secao_projetos", 1);
	if (/(certification|certificacoes)\b/.test(text))
		bump("secao_certificacoes", 1);
	if (/(idiomas|languages)\b/.test(text)) bump("secao_idiomas", 1);
	if (/(resumo|summary|perfil|objetivo)\b/.test(text)) bump("secao_resumo", 1);

	// Padrões de contato / presença online
	if (/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(raw))
		bump("email", 1, true);
	if (/(linkedin\.com\/in\/|linkedin\.com\/pub\/)/i.test(raw))
		bump("linkedin", 1, true);
	if (/(github\.com\/|gitlab\.com\/)/i.test(raw)) bump("github_gitlab", 1);

	// Datas comuns em histórico profissional (anos, ranges)
	if (/\b(19|20)\d{2}\b/.test(text)) bump("anos_presentes", 1);
	if (/\b(19|20)\d{2}\s*[-–]\s*(19|20)\d{2}\b/.test(text))
		bump("range_anos", 2, true);
	if (/\b(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\b/.test(text))
		bump("meses_pt", 1);

	// Sinais negativos fortes (documentos que não são currículo)
	if (/\b(receita|invoice|nota fiscal|boleto|fatura)\b/.test(text)) score -= 3;
	if (/\b(contrato|clausula|partes|vigencia)\b/.test(text)) score -= 2;
	if (
		/\b(termos de uso|politica de privacidade|privacy policy|terms of service)\b/.test(
			text,
		)
	)
		score -= 3;

	return { score, strongSignals, reasons };
}

function extractFirstJsonObject(text: string) {
	const cleaned = text
		.replace(/```(?:json)?/gi, "")
		.replace(/```/g, "")
		.trim();
	const start = cleaned.indexOf("{");
	if (start === -1) return null;

	let depth = 0;
	for (let i = start; i < cleaned.length; i += 1) {
		const ch = cleaned[i];
		if (ch === "{") depth += 1;
		else if (ch === "}") depth -= 1;

		if (depth === 0) {
			const candidate = cleaned.slice(start, i + 1);
			try {
				return JSON.parse(candidate) as unknown;
			} catch {
				return null;
			}
		}
	}
	return null;
}

async function llmClassifyIsCurriculum(
	document: string,
	model: ChatGoogleGenerativeAI,
) {
	const system = [
		"Você é um classificador estrito.",
		"Determine se o texto fornecido é um CURRÍCULO/CV.",
		"Responda APENAS com um JSON válido (sem markdown) no formato:",
		'{"isCurriculum": boolean, "confidence": number, "reason": string}',
		"- confidence deve ser de 0 a 1.",
		"- reason deve ser curta.",
	].join("\n");

	// Limita o tamanho para reduzir custo/latência (mantém começo+fim, onde geralmente estão seções e contatos)
	const trimmed =
		document.length <= 12000
			? document
			: `${document.slice(0, 8000)}\n\n...[cortado]...\n\n${document.slice(-4000)}`;

	const human = `Texto do documento:\n\n${trimmed}`;

	// Compatível com LangChain ChatModel: array de mensagens como tuplas.
	const res = await model.invoke([
		["system", system],
		["human", human],
	]);

	const content =
		typeof res.content === "string" ? res.content : String(res.content);
	const parsed = extractFirstJsonObject(content);
	if (!parsed || typeof parsed !== "object") return null;

	const obj = parsed as Record<string, unknown>;
	const isCurriculum = obj.isCurriculum;
	const confidence = obj.confidence;
	if (typeof isCurriculum !== "boolean") return null;
	if (typeof confidence !== "number" || !Number.isFinite(confidence))
		return null;

	return {
		isCurriculum,
		confidence: Math.max(0, Math.min(1, confidence)),
		reason: typeof obj.reason === "string" ? obj.reason : "",
	};
}

const curriculumGuardrail = (options: CurriculumGuardrailOptions = {}) => {
	const documentKey = options.documentKey ?? "document";
	const classifierModel =
		options.classifierModel ??
		new ChatGoogleGenerativeAI({
			model: "gemini-2.5-flash",
			apiKey: process.env.GOOGLE_API_KEY,
		});

	return createMiddleware({
		name: "CurriculumGuardrail",
		beforeAgent: {
			hook: async (state: Record<string, unknown>) => {
				// Tenta obter o documento do state primeiro
				let document = state[documentKey];
				
				// Se não encontrar no state, tenta extrair da primeira mensagem do usuário
				if (typeof document !== "string") {
					const messages = state.messages;
					if (Array.isArray(messages) && messages.length > 0) {
						const firstMessage = messages[0];
						if (
							firstMessage &&
							typeof firstMessage === "object" &&
							"content" in firstMessage &&
							typeof firstMessage.content === "string"
						) {
							document = firstMessage.content;
						}
					}
				}
				
				if (typeof document !== "string") {
					throw new Error(
						"Documento inválido: envie apenas currículo (texto).",
					);
				}

				const { score, strongSignals } = curriculumHeuristicScore(document);

				// Aceita direto
				if (strongSignals >= 2 || score >= 6) return;

				// Rejeita direto
				if (score <= 1) {
					throw new Error("Documento inválido: envie apenas currículo.");
				}

				// Caso ambíguo: fallback LLM
				const verdict = await llmClassifyIsCurriculum(
					document,
					classifierModel,
				);
				if (verdict?.isCurriculum && verdict.confidence >= 0.6) return;

				throw new Error("Documento inválido: envie apenas currículo.");
			},
		},
	});
};

export { curriculumGuardrail };
