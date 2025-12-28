import { createAgent, tool } from "langchain";
import { z } from "zod";

const curriculumScorerSubagent = createAgent({
	model: "gemini-2.5-flash",
	tools: [],
});
