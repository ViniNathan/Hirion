import { mainAgent } from "./mainAgent";

const agentCall = (document: string) =>
	mainAgent.invoke({
		messages: [
			{
				role: "user",
				content: document,
			},
		],
	});

export { agentCall };
