"use client";

import { motion } from "motion/react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
	weight: "400",
	subsets: ["latin"],
});

export default function Hero() {
	return (
		<div className="relative flex h-dvh flex-col items-center justify-center overflow-hidden">
			<div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background/20" />
			
			<div className="relative z-10 flex flex-col items-center gap-6 px-4">
				<div className="flex flex-row items-center gap-4 md:gap-6">
					<motion.div
						className="h-0.5 bg-linear-to-l from-white to-transparent"
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: "min(400px, 30vw)", opacity: 1 }}
						transition={{ 
							duration: 1.5, 
							delay: 0.3,
							ease: [0.16, 1, 0.3, 1]
						}}
					/>
					
					<motion.div
						className={`${bebasNeue.className} flex items-baseline font-bold tracking-tight text-foreground`}
						initial={{ opacity: 0, scale: 0.8, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						transition={{ 
							duration: 0.8, 
							delay: 0.5,
							ease: [0.16, 1, 0.3, 1]
						}}
					>
						<span
							className="text-6xl md:text-[110px] lg:text-[140px]"
						>
							H
						</span>
						<span
							className="text-5xl md:text-8xl lg:text-9xl"
						>
							irion
						</span>
					</motion.div>
					
					<motion.div
						className="h-0.5 bg-linear-to-r from-white to-transparent"
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: "min(400px, 30vw)", opacity: 1 }}
						transition={{ 
							duration: 1.5, 
							delay: 0.3,
							ease: [0.16, 1, 0.3, 1]
						}}
					/>
				</div>

				<motion.p
					className="max-w-2xl text-center text-sm font-light text-muted-foreground md:text-base lg:text-lg"
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ 
						duration: 0.6, 
						delay: 1.2,
						ease: [0.16, 1, 0.3, 1]
					}}
				>
					Experience hiring before it happens.
				</motion.p>

				<motion.div
					className="mt-8 flex gap-2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5, delay: 1.5 }}
				>
					{[0, 1, 2].map((i) => (
						<motion.div
							key={i}
							className="h-2 w-2 rounded-full bg-foreground/30"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{
								duration: 0.3,
								delay: 1.6 + i * 0.1,
								ease: [0.16, 1, 0.3, 1]
							}}
						/>
					))}
				</motion.div>
			</div>

			<motion.div
				className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-foreground/5 blur-3xl"
				animate={{
					scale: [1, 1.2, 1],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					duration: 8,
					repeat: Infinity,
					ease: "easeInOut",
				}}
			/>
			<motion.div
				className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-foreground/5 blur-3xl"
				animate={{
					scale: [1, 1.3, 1],
					opacity: [0.3, 0.5, 0.3],
				}}
				transition={{
					duration: 10,
					repeat: Infinity,
					ease: "easeInOut",
					delay: 1,
				}}
			/>
		</div>
	);
}
