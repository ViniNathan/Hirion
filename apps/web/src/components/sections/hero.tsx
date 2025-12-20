import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
	weight: "400",
	subsets: ["latin"],
});

export default function Hero() {
	return (
		<div className="flex h-dvh flex-row items-center justify-center">
			<div className="flex flex-row items-center gap-2">
				<div className="h-0.5 w-100 bg-linear-to-l from-white to-transparent" />
				<div
					className={`${bebasNeue.className} font-bold text-8xl tracking-tight`}
				>
					<span className="text-[110px]">H</span>irion
				</div>
                <div className="h-0.5 w-100 bg-linear-to-r from-white to-transparent" />
			</div>
		</div>
	);
}
