import "dotenv/config";
import { createContext } from "@Hirion/api/context";
import { appRouter } from "@Hirion/api/routers/index";
import { auth } from "@Hirion/auth";
import {
	extractTextFromFile,
	validateFileSize,
	validateFileType,
} from "@Hirion/api/utils/documentExtractor";
import { agentCall } from "@Hirion/ai";
import { cors } from "@elysiajs/cors";
import { OpenAPIHandler } from "@orpc/openapi/fetch";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { Elysia } from "elysia";

const port = Number(process.env.PORT ?? 3000);
if (!Number.isFinite(port) || port <= 0) {
	throw new Error(`Invalid PORT: ${process.env.PORT}`);
}

const rpcHandler = new RPCHandler(appRouter, {
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});
const apiHandler = new OpenAPIHandler(appRouter, {
	plugins: [
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}),
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

new Elysia()
	.use(
		cors({
			origin: process.env.CORS_ORIGIN || "",
			methods: ["GET", "POST", "OPTIONS"],
			allowedHeaders: ["Content-Type", "Authorization"],
			credentials: true,
		}),
	)
	.all("/api/auth/*", async (context) => {
		const { request, status } = context;
		if (["POST", "GET"].includes(request.method)) {
			return auth.handler(request);
		}
		return status(405);
	})
	.post("/api/curriculum/process", async (context) => {
		const { request } = context;
		const session = await auth.api.getSession({
			headers: request.headers,
		});

		if (!session?.user) {
			return new Response(
				JSON.stringify({ error: "Não autorizado" }),
				{
					status: 401,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		try {
			const formData = await request.formData();
			const file = formData.get("file") as File | null;
			const jobDescription = formData.get("jobDescription") as string | null;

			if (!file) {
				return new Response(
					JSON.stringify({
						error: "Arquivo não fornecido",
					}),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			if (!jobDescription || jobDescription.trim().length === 0) {
				return new Response(
					JSON.stringify({
						error: "Descrição da vaga não fornecida",
					}),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			if (!validateFileType(file.type)) {
				return new Response(
					JSON.stringify({
						error: `Tipo de arquivo não suportado: ${file.type}. Use PDF ou DOCX.`,
					}),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			if (!validateFileSize(file.size)) {
				return new Response(
					JSON.stringify({
						error: "Arquivo muito grande (máx. 10MB).",
					}),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			const arrayBuffer = await file.arrayBuffer();
			const buffer = Buffer.from(arrayBuffer);
			const extracted = await extractTextFromFile(buffer, file.type);

			if (!extracted.text || extracted.text.trim().length === 0) {
				return new Response(
					JSON.stringify({
						error: "Não foi possível extrair texto do arquivo.",
					}),
					{
						status: 400,
						headers: { "Content-Type": "application/json" },
					},
				);
			}

			const aiResponse = await agentCall(extracted.text, jobDescription);

			return new Response(
				JSON.stringify({
					success: true,
					data: {
						extractedText: extracted.text,
						metadata: extracted.metadata,
						aiResponse,
					},
				}),
				{
					status: 200,
					headers: { "Content-Type": "application/json" },
				},
			);
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Erro interno";
			console.error("Erro ao processar currículo:", error);
			return new Response(
				JSON.stringify({
					error: "Erro interno do servidor",
					message: errorMessage,
				}),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				},
			);
		}
	})
	.all("/rpc*", async (context) => {
		const { response } = await rpcHandler.handle(context.request, {
			prefix: "/rpc",
			context: await createContext({ context }),
		});
		return response ?? new Response("Not Found", { status: 404 });
	})
	.all("/api*", async (context) => {
		const { response } = await apiHandler.handle(context.request, {
			prefix: "/api-reference",
			context: await createContext({ context }),
		});
		return response ?? new Response("Not Found", { status: 404 });
	})
	.get("/", () => "OK")
	.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});
