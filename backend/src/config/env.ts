import z from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	NODE_ENV: z.enum(["development", "production"]).default("development"),
	DATABASE_URL: z.string(),
	REDIS_URL: z.string(),
	SUPABASE_PROJECT_REF: z.string(),
	SUPABASE_JWKS_URL: z.string(),
	LANGSMITH_API_KEY: z.string(),
	LANGSMITH_PROJECT: z.string(),
	LANGSMITH_TRACING: z.boolean().default(true),
	OPENAI_API_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
