import { z } from "zod";

export const JobType = {
	CURRICULUM_PROCESS: "curriculum_process",
	COVER_LETTER_CREATE: "cover_letter_create",
} as const;

export type JobType = (typeof JobType)[keyof typeof JobType];

export const TraceContextSchema = z.object({
	traceId: z.string().optional(),
	runId: z.string().optional(),
	parentRunId: z.string().optional(),
});

export type TraceContext = z.infer<typeof TraceContextSchema>;

export const CurriculumProcessJobSchema = z.object({
	jobId: z.uuid("jobId deve ser um UUID válido"),
	userId: z.string().min(1, "userId é obrigatório"),
	documentText: z.string().min(1, "documentText não pode estar vazio"),
	jobDescription: z.string().min(1, "jobDescription não pode estar vazio"),
	source: z
		.string()
		.optional()
		.describe("Origem do documento (ex: 'upload', 'paste')"),
	traceContext: TraceContextSchema.optional(),
});

export type CurriculumProcessJob = z.infer<typeof CurriculumProcessJobSchema>;

export const CoverLetterCreateJobSchema = z.object({
	jobId: z.uuid("jobId deve ser um UUID válido"),
	userId: z.string().min(1, "userId é obrigatório"),
	curriculumText: z.string().min(1, "curriculumText não pode estar vazio"),
	jobDescription: z.string().min(1, "jobDescription não pode estar vazio"),
	traceContext: TraceContextSchema.optional(),
});

export type CoverLetterCreateJob = z.infer<typeof CoverLetterCreateJobSchema>;

export type JobPayload = CurriculumProcessJob | CoverLetterCreateJob;

export function validateJobPayload(
	type: JobType,
	payload: unknown,
): { success: true; data: JobPayload } | { success: false; error: z.ZodError } {
	let schema: z.ZodSchema<JobPayload>;

	switch (type) {
		case JobType.CURRICULUM_PROCESS:
			schema = CurriculumProcessJobSchema;
			break;
		case JobType.COVER_LETTER_CREATE:
			schema = CoverLetterCreateJobSchema;
			break;
		default:
			return {
				success: false,
				error: new z.ZodError([
					{
						code: "custom",
						message: `Tipo de job desconhecido: ${type}`,
						path: [],
					},
				]),
			};
	}

	const result = schema.safeParse(payload);
	if (result.success) {
		return { success: true, data: result.data };
	}
	return { success: false, error: result.error };
}
