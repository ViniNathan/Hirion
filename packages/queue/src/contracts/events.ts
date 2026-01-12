import { z } from "zod";

export const JobEventType = {
	PROGRESS: "progress",
	ACTIVE: "active",
	COMPLETED: "completed",
	FAILED: "failed",
	CANCELLED: "cancelled",
} as const;

export type JobEventType = (typeof JobEventType)[keyof typeof JobEventType];

export const JobProgressSchema = z.object({
	step: z
		.string()
		.describe("Nome da etapa atual (ex: 'scoring', 'cover_letter')"),
	pct: z.number().min(0).max(100).describe("Percentual de conclusão (0-100)"),
	message: z
		.string()
		.optional()
		.describe("Mensagem opcional sobre o progresso"),
});

export type JobProgress = z.infer<typeof JobProgressSchema>;

export const JobProgressEventSchema = z.object({
	jobId: z.uuid(),
	type: z.literal(JobEventType.PROGRESS),
	progress: JobProgressSchema,
	timestamp: z.number().describe("Timestamp Unix em milissegundos"),
});

export type JobProgressEvent = z.infer<typeof JobProgressEventSchema>;

export const JobActiveEventSchema = z.object({
	jobId: z.uuid(),
	type: z.literal(JobEventType.ACTIVE),
	timestamp: z.number(),
});

export type JobActiveEvent = z.infer<typeof JobActiveEventSchema>;

export const JobCompletedEventSchema = z.object({
	jobId: z.uuid(),
	type: z.literal(JobEventType.COMPLETED),
	result: z.unknown().optional().describe("Resultado do processamento"),
	timestamp: z.number(),
});

export type JobCompletedEvent = z.infer<typeof JobCompletedEventSchema>;

export const JobFailedEventSchema = z.object({
	jobId: z.uuid(),
	type: z.literal(JobEventType.FAILED),
	error: z.object({
		message: z.string(),
		stack: z.string().optional(),
		code: z.string().optional(),
	}),
	timestamp: z.number(),
});

export type JobFailedEvent = z.infer<typeof JobFailedEventSchema>;

export const JobCancelledEventSchema = z.object({
	jobId: z.uuid(),
	type: z.literal(JobEventType.CANCELLED),
	timestamp: z.number(),
});

export type JobCancelledEvent = z.infer<typeof JobCancelledEventSchema>;

export type JobEvent =
	| JobProgressEvent
	| JobActiveEvent
	| JobCompletedEvent
	| JobFailedEvent
	| JobCancelledEvent;

export const JobEventSchema = z.discriminatedUnion("type", [
	JobProgressEventSchema,
	JobActiveEventSchema,
	JobCompletedEventSchema,
	JobFailedEventSchema,
	JobCancelledEventSchema,
]);

export function createJobEvent(
	type: JobEventType,
	jobId: string,
	data?: Partial<JobEvent>,
): JobEvent {
	const base = {
		jobId,
		type,
		timestamp: Date.now(),
	};

	switch (type) {
		case JobEventType.PROGRESS:
			return {
				...base,
				type: JobEventType.PROGRESS,
				progress: (data as JobProgressEvent).progress,
			} as JobProgressEvent;

		case JobEventType.ACTIVE:
			return {
				...base,
				type: JobEventType.ACTIVE,
			} as JobActiveEvent;

		case JobEventType.COMPLETED:
			return {
				...base,
				type: JobEventType.COMPLETED,
				result: (data as JobCompletedEvent).result,
			} as JobCompletedEvent;

		case JobEventType.FAILED:
			return {
				...base,
				type: JobEventType.FAILED,
				error: (data as JobFailedEvent).error,
			} as JobFailedEvent;

		case JobEventType.CANCELLED:
			return {
				...base,
				type: JobEventType.CANCELLED,
			} as JobCancelledEvent;

		default:
			throw new Error(`Tipo de evento desconhecido: ${type}`);
	}
}
