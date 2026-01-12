export { createRedisConnection, getRedisConnection } from "./redis/connection";

export {
	getAIQueue,
	closeAllQueues,
	QueueName,
	QUEUE_PREFIX,
} from "./bullmq/queues";
export type { QueueName as QueueNameType } from "./bullmq/queues";

export {
	JobType,
	CurriculumProcessJobSchema,
	CoverLetterCreateJobSchema,
	TraceContextSchema,
	validateJobPayload,
} from "./contracts/jobs";
export type {
	JobType as JobTypeEnum,
	CurriculumProcessJob,
	CoverLetterCreateJob,
	TraceContext,
	JobPayload,
} from "./contracts/jobs";

export {
	JobEventType,
	JobProgressSchema,
	JobProgressEventSchema,
	JobActiveEventSchema,
	JobCompletedEventSchema,
	JobFailedEventSchema,
	JobCancelledEventSchema,
	JobEventSchema,
	createJobEvent,
} from "./contracts/events";
export type {
	JobEventType as JobEventTypeEnum,
	JobProgress,
	JobProgressEvent,
	JobActiveEvent,
	JobCompletedEvent,
	JobFailedEvent,
	JobCancelledEvent,
	JobEvent,
} from "./contracts/events";
