import Redis from "ioredis";

export function createRedisConnection(): Redis {
	const redisUrl = process.env.REDIS_URL;

	if (redisUrl) {
		return new Redis(redisUrl, {
			maxRetriesPerRequest: null,
			enableReadyCheck: false,
			lazyConnect: true,
		});
	}

	// Fallback para variáveis individuais
	const host = process.env.REDIS_HOST || "localhost";
	const port = parseInt(process.env.REDIS_PORT || "6379", 10);
	const password = process.env.REDIS_PASSWORD;
	const tls = process.env.REDIS_TLS === "true" ? {} : undefined;

	return new Redis({
		host,
		port,
		password,
		tls,
		maxRetriesPerRequest: null,
		enableReadyCheck: false,
		lazyConnect: true,
	});
}

let redisConnection: Redis | null = null;

export function getRedisConnection(): Redis {
	if (!redisConnection) {
		redisConnection = createRedisConnection();
	}
	return redisConnection;
}
