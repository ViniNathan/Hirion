export type { QueueName as QueueNameType } from "./bullmq/queues";

export {
	closeAllQueues,
	getAIQueue,
	QUEUE_PREFIX,
	QueueName,
} from "./bullmq/queues";
export type {
	JobActiveEvent,
	JobCancelledEvent,
	JobCompletedEvent,
	JobEvent,
	JobEventType as JobEventTypeEnum,
	JobFailedEvent,
	JobProgress,
	JobProgressEvent,
} from "./contracts/events";
export {
	createJobEvent,
	JobActiveEventSchema,
	JobCancelledEventSchema,
	JobCompletedEventSchema,
	JobEventSchema,
	JobEventType,
	JobFailedEventSchema,
	JobProgressEventSchema,
	JobProgressSchema,
} from "./contracts/events";
export type {
	CoverLetterCreateJob,
	CurriculumProcessJob,
	JobPayload,
	JobType as JobTypeEnum,
	TraceContext,
} from "./contracts/jobs";
export {
	CoverLetterCreateJobSchema,
	CurriculumProcessJobSchema,
	JobType,
	TraceContextSchema,
	validateJobPayload,
} from "./contracts/jobs";
export { createRedisConnection, getRedisConnection } from "./redis/connection";
