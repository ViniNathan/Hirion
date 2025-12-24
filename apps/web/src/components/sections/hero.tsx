"use client";

import { motion } from "motion/react";
import { Bebas_Neue, Montserrat } from "next/font/google";
import { HoverButton } from "@/components/ui/hover-button";

const bebasNeue = Bebas_Neue({
	weight: "400",
	subsets: ["latin"],
});

const montserrat = Montserrat({
	weight: "400",
	subsets: ["latin"],
});

export default function Hero() {
	return (
		<div className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-4 sm:px-6">
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/20" />

			<div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-4 sm:gap-6">
				<div className="flex flex-row items-center gap-2 sm:gap-4 md:gap-6">
					<motion.div
						className="hidden h-0.5 bg-linear-to-l from-white to-transparent sm:block"
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: "min(400px, 20vw)", opacity: 1 }}
						transition={{
							duration: 1.5,
							delay: 0.3,
							ease: [0.16, 1, 0.3, 1],
						}}
					/>

					<motion.div
						className={`${bebasNeue.className} flex items-baseline font-bold text-foreground tracking-tight`}
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{
							duration: 0.8,
							delay: 0.5,
							ease: [0.16, 1, 0.3, 1],
						}}
					>
						<span className="text-9xl md:text-8xl lg:text-[110px] xl:text-[200px]">
							H
						</span>
						<span className="text-8xl md:text-7xl lg:text-8xl xl:text-[180px]">
							irion
						</span>
					</motion.div>

					<motion.div
						className="hidden h-0.5 bg-linear-to-r from-white to-transparent sm:block"
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: "min(400px, 20vw)", opacity: 1 }}
						transition={{
							duration: 1.5,
							delay: 0.3,
							ease: [0.16, 1, 0.3, 1],
						}}
					/>
				</div>

				<motion.p
					className={`${montserrat.className} max-w-2xl px-2 text-center font-light text-md text-muted-foreground sm:px-0 md:text-base lg:text-lg xl:text-2xl`}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.6,
						delay: 1.2,
						ease: [0.16, 1, 0.3, 1],
					}}
				>
					Experience hiring before it happens.
				</motion.p>

				<motion.div
					className="mt-2 sm:mt-0"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{
						duration: 0.6,
						delay: 1.4,
						ease: [0.16, 1, 0.3, 1],
					}}
				>
					<HoverButton>Get Hired</HoverButton>
				</motion.div>
			</div>

			<motion.div
				className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-foreground/5 blur-3xl sm:h-48 sm:w-48 md:h-64 md:w-64"
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					duration: 8,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				className="absolute right-1/4 bottom-1/4 h-48 w-48 rounded-full bg-foreground/5 blur-3xl sm:h-72 sm:w-72 md:h-96 md:w-96"
				animate={{
					scale: [1, 1.3, 1],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					duration: 10,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut",
					delay: 1,
				}}
			/>
		</div>
	);
}
