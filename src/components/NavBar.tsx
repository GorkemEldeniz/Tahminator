"use client";

import { cn } from "@/lib/utils";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavBar from "./Mobile-NavBar";
import { ModeToggle } from "./mode-toggle";

export default function NavBar() {
	const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
	const pathname = usePathname();

	const isActiveTab = (path: string) => {
		return pathname === path;
	};

	const styles =
		"group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50";

	return (
		<header className='flex w-full shrink-0 items-center py-4 px-4 md:px-6'>
			<Link
				href='/'
				className='mr-6 flex flex-col items-center'
				prefetch={false}
			>
				<Trophy className='h-12 w-12' />
				<i className='text-xl'>Tahminator</i>
				<span className='sr-only'>Tahminator</span>
			</Link>
			<nav className='ml-auto flex items-center space-x-4'>
				<SignedIn>
					{isSmallDevice ? (
						<MobileNavBar />
					) : (
						<>
							<Link
								href='/'
								className={cn(styles, {
									"font-bold": isActiveTab("/"),
								})}
								prefetch={false}
							>
								Home
							</Link>
							<Link
								href='/prediction'
								className={cn(styles, {
									"font-bold": isActiveTab("/prediction"),
								})}
								prefetch={false}
							>
								Prediction
							</Link>
							<Link
								href='/standings'
								className={cn(styles, {
									"font-bold": isActiveTab("/standings"),
								})}
								prefetch={false}
							>
								Standings
							</Link>
						</>
					)}

					<UserButton />
				</SignedIn>
				<SignedOut>
					<SignInButton />
					<SignUpButton />
				</SignedOut>
				<ModeToggle />
			</nav>
		</header>
	);
}
