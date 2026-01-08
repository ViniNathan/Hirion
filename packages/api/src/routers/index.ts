import { protectedProcedure, publicProcedure } from "../index";
import type { RouterClient } from "@orpc/server";
import { z } from "zod";
import { agentCall } from "@Hirion/ai";
import { ORPCError } from "@orpc/server";

export const appRouter = {
	healthCheck: publicProcedure.handler(() => {
		return "OK";
	}),
	privateData: protectedProcedure.handler(({ context }) => {
		return {
			message: "This is private",
			user: context.session?.user,
		};
	}),
	processCurriculum: protectedProcedure
		.input(
			z.object({
				document: z.string().min(1, "O documento não pode estar vazio"),
				jobDescription: z.string().min(1, "A descrição da vaga não pode estar vazia"),
			}),
		)
		.handler(async ({ input }) => {
			try {
				const response = await agentCall(input.document, input.jobDescription);
				return response;
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: typeof error === "string"
							? error
							: "Erro desconhecido ao processar o currículo";
				throw new ORPCError("INTERNAL_SERVER_ERROR", {
					message: `Erro ao processar currículo: ${errorMessage}`,
				});
			}
		}),
};
export type AppRouter = typeof appRouter;
export type AppRouterClient = RouterClient<typeof appRouter>;
