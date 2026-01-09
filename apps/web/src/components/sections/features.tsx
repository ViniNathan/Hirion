"use client";

import { FileText, MessageSquare, Sparkles, Target } from "lucide-react";
import { BentoGrid, type BentoItem } from "@/components/ui/bento-grid";

const hiringFeatures: BentoItem[] = [
	{
		title: "AI-Powered Resume ATS",
		meta: "Optimize your CV",
		description:
			"Get your resume analyzed and optimized by AI to pass through Applicant Tracking Systems and reach recruiters.",
		icon: <FileText className="h-4 w-4 text-amber-700" />,
		status: "AI-Powered",
		tags: ["ATS", "Optimization"],
		colSpan: 2,
		hasPersistentHover: true,
	},
	{
		title: "Cover Letter Generator",
		meta: "Personalized",
		description:
			"Generate tailored cover letters using AI that match each job application and highlight your relevant experience.",
		icon: <MessageSquare className="h-4 w-4 text-emerald-600" />,
		status: "AI-Generated",
		tags: ["Cover Letter", "Personalization"],
	},
	{
		title: "Resume Content Suggestions",
		meta: "Job matching",
		description:
			"Receive AI-powered suggestions on what content to add or modify in your resume to better match specific job postings.",
		icon: <Target className="h-4 w-4 text-amber-500" />,
		status: "Smart Matching",
		tags: ["Content", "Matching"],
		colSpan: 2,
	},
	{
		title: "AI Interview Simulation",
		meta: "Initial screening",
		description:
			"Practice your initial screening interviews with AI to prepare for real interviews and improve your performance.",
		icon: <Sparkles className="h-4 w-4 text-indigo-600" />,
		status: "Practice Mode",
		tags: ["Interview", "Simulation"],
	},
];

export default function FeaturesSection() {
	return (
		<section className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/20" />

			<div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-8 sm:gap-12">
				<div className="space-y-3 text-center">
					<p className="text-muted-foreground text-xs uppercase tracking-[0.3em]">
						Features
					</p>
					<h2 className="font-semibold text-3xl text-foreground tracking-tight sm:text-4xl">
						AI-powered tools to boost your career
					</h2>
					<p className="mx-auto max-w-2xl text-muted-foreground text-sm">
						Everything you need to position yourself better in the market. From
						resume optimization to interview preparation, powered by AI to help
						developers land their dream jobs.
					</p>
				</div>
				<BentoGrid items={hiringFeatures} />
			</div>
		</section>
	);
}
