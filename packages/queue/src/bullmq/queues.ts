import type { QueueOptions } from "bullmq";
import { Queue } from "bullmq";
import { getRedisConnection } from "../redis/connection";

export const QUEUE_PREFIX = process.env.QUEUE_PREFIX || "hirion";

export const QueueName = {
	AI: `${QUEUE_PREFIX}:ai`,
} as const;

export type QueueName = (typeof QueueName)[keyof typeof QueueName];

const defaultJobOptions: NonNullable<QueueOptions["defaultJobOptions"]> = {
	attempts: 3,
	backoff: {
		type: "exponential",
		delay: 2000,
	},
	removeOnComplete: {
		age: 3600,
		count: 1000,
	},
	removeOnFail: {
		age: 24 * 3600,
		count: 2000,
	},
};

let aiQueue: Queue | null = null;

export function getAIQueue(): Queue {
	if (!aiQueue) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		aiQueue = new Queue(QueueName.AI, {
			connection: getRedisConnection() as any,
			defaultJobOptions,
		});
	}
	return aiQueue;
}

export async function closeAllQueues(): Promise<void> {
	const queues = [aiQueue].filter(Boolean) as Queue[];
	await Promise.all(queues.map((queue) => queue.close()));
	aiQueue = null;
}
