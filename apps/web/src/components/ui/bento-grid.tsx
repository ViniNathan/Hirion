"use client";

import { CheckCircle, Globe, TrendingUp, Video } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BentoItem {
	title: string;
	description: string;
	icon: ReactNode;
	status?: string;
	tags?: string[];
	meta?: string;
	cta?: string;
	colSpan?: number;
	hasPersistentHover?: boolean;
}

export type BentoItems = BentoItem[];

interface BentoGridProps {
	items: BentoItem[];
}

const itemsSample: BentoItem[] = [
	{
		title: "Analytics Dashboard",
		meta: "v2.4.1",
		description:
			"Real-time metrics with AI-powered insights and predictive analytics",
		icon: <TrendingUp className="h-4 w-4 text-blue-500" />,
		status: "Live",
		tags: ["Statistics", "Reports", "AI"],
		colSpan: 2,
		hasPersistentHover: true,
	},
	{
		title: "Task Manager",
		meta: "84 completed",
		description: "Automated workflow management with priority scheduling",
		icon: <CheckCircle className="h-4 w-4 text-emerald-500" />,
		status: "Updated",
		tags: ["Productivity", "Automation"],
	},
	{
		title: "Media Library",
		meta: "12GB used",
		description: "Cloud storage with intelligent content processing",
		icon: <Video className="h-4 w-4 text-purple-500" />,
		tags: ["Storage", "CDN"],
		colSpan: 2,
	},
	{
		title: "Global Network",
		meta: "6 regions",
		description: "Multi-region deployment with edge computing",
		icon: <Globe className="h-4 w-4 text-sky-500" />,
		status: "Beta",
		tags: ["Infrastructure", "Edge"],
	},
];

function BentoGrid({ items = itemsSample }: BentoGridProps) {
	return (
		<div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 p-4 md:grid-cols-3">
			{items.map((item, index) => (
				<div
					key={index}
					className={cn(
						"group relative isolate overflow-hidden rounded-3xl p-4 transition-all duration-300",
						"bg-[rgba(43,55,80,0.1)] backdrop-blur-lg",
						"will-change-transform hover:-translate-y-0.5",
						"before:absolute before:inset-0 before:content-['']",
						"before:pointer-events-none before:rounded-[inherit]",
						"before:z-[1]",
						"before:shadow-[inset_0_0_0_1px_rgba(170,202,255,0.2),inset_0_0_16px_0_rgba(170,202,255,0.1),inset_0_-3px_12px_0_rgba(170,202,255,0.15),0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.45)]",
						"before:mix-blend-multiply before:transition-transform before:duration-300",
						item.colSpan || "col-span-1",
						item.colSpan === 2 ? "md:col-span-2" : "",
						{
							"-translate-y-0.5": item.hasPersistentHover,
						},
					)}
				>
					<div className="relative z-10 flex flex-col space-y-3">
						<div className="flex items-center justify-between">
							<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 transition-all duration-300 group-hover:bg-gradient-to-br dark:bg-white/10">
								{item.icon}
							</div>
							<span className="rounded-lg bg-black/5 px-2 py-1 font-medium text-gray-600 text-xs backdrop-blur-sm transition-colors duration-300 group-hover:bg-black/10 dark:bg-white/10 dark:text-gray-300 dark:group-hover:bg-white/20">
								{item.status || "Active"}
							</span>
						</div>

						<div className="space-y-2">
							<h3 className="font-medium text-[15px] text-gray-900 tracking-tight dark:text-gray-100">
								{item.title}
								{item.meta && (
									<span className="ml-2 font-normal text-gray-500 text-xs dark:text-gray-400">
										{item.meta}
									</span>
								)}
							</h3>
							<p className="font-[425] text-gray-600 text-sm leading-snug dark:text-gray-300">
								{item.description}
							</p>
						</div>

						<div className="mt-2 flex items-center justify-between">
							<div className="flex items-center space-x-2 text-gray-500 text-xs dark:text-gray-400">
								{item.tags?.map((tag, i) => (
									<span
										key={i}
										className="rounded-md bg-black/5 px-2 py-1 backdrop-blur-sm transition-all duration-200 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20"
									>
										#{tag}
									</span>
								))}
							</div>
							<span className="text-gray-500 text-xs opacity-0 transition-opacity group-hover:opacity-100 dark:text-gray-400">
								{item.cta || "Explore →"}
							</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export { BentoGrid };
