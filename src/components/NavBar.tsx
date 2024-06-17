"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export default function NavBar() {
	const pathname = usePathname();

	return (
		<nav className='py-8 px-2'>
			<ol className='flex gap-4 h-10 items-center'>
				<li className='flex-1'>
					<h1>Tahminator</h1>
				</li>
				<li>
					<Link className={`${pathname === "/" ? "font-bold" : ""}`} href='/'>
						Home
					</Link>
				</li>
				<li>
					<Link
						className={`${
							pathname.startsWith("/prediction") ? "font-bold" : ""
						}`}
						href='/prediction'
					>
						Prediction
					</Link>
				</li>
				<li className='h-7'>
					<UserButton />
				</li>
				<li>
					<ModeToggle />
				</li>
			</ol>
		</nav>
	);
}
