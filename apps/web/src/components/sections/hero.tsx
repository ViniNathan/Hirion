import { motion } from "motion/react";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
	weight: "400",
	subsets: ["latin"],
});

export default function Hero() {
	return (
		<div className="flex h-dvh flex-row items-center justify-center">
			<div className="flex flex-row items-center gap-2">
                <motion.div className="h-0.5 w-100 bg-linear-to-l from-white to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "400px" }}
                transition={{ duration: 2 }}
                />
				<motion.div
                    className={`${bebasNeue.className} font-bold text-8xl tracking-tight`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
				>
					<span className="text-[110px]">H</span>irion
				</motion.div>
                <motion.div className="h-0.5 w-100 bg-linear-to-r from-white to-transparent"
                initial={{ width: 0 }}
                animate={{ width: "400px" }}
                transition={{ duration: 2 }}
                />
			</div>
		</div>
	);
}
