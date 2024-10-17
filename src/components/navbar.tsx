"use client";

import { cn } from "@/lib/utils";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
	useUser,
} from "@clerk/nextjs";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./language-selector";
import MobilMenu from "./mobile-menu";
import ModeToggle from "./mode-toggle";
import { Skeleton } from "./ui/skeleton";

export default function Navbar() {
	const pathname = usePathname();

	const { t } = useTranslation();

	const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

	const { isLoaded } = useUser();

	const isActiveTab = (path: string) => {
		if (path === "/") {
			return pathname === "/";
		}
		return pathname.startsWith(path);
	};
	const linkStyles = "text-sm font-medium transition-colors hover:text-primary";

	return (
		<header className='px-4 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<nav className='flex h-14 justify-between items-center'>
				<Link href='/' className='flex items-center space-x-2' prefetch={false}>
					<Trophy className='size-4 md:size-6' />
					<span className='text-sm md:text-base font-bold'>Tahminator</span>
				</Link>
				<ul className='ml-4 flex items-center gap-2 md:gap-4'>
					<SignedIn>
						{isSmallDevice ? (
							<li>
								<MobilMenu />
							</li>
						) : (
							<>
								<li>
									<Link
										href='/'
										className={cn(linkStyles, {
											"font-bold": isActiveTab("/"),
										})}
										prefetch={false}
									>
										{t("home")}
									</Link>
								</li>
								<li>
									<Link
										href='/prediction'
										className={cn(linkStyles, {
											"font-bold": isActiveTab("/prediction"),
										})}
										prefetch={false}
									>
										{t("prediction")}
									</Link>
								</li>
								<li>
									<Link
										href='/standings'
										className={cn(linkStyles, {
											"font-bold": isActiveTab("/standings"),
										})}
										prefetch={false}
									>
										{t("standings")}
									</Link>
								</li>
							</>
						)}
						<li>
							{isLoaded ? (
								<UserButton
									appearance={{
										elements: { rootBox: "flex items-center justify-center" },
									}}
								/>
							) : (
								<Skeleton className='size-7 rounded-full' />
							)}
						</li>
					</SignedIn>
					<SignedOut>
						<li>
							<SignInButton>
								<Link
									href='/standings'
									className={cn(linkStyles, {
										"font-bold": isActiveTab("/sign-in"),
									})}
									prefetch={false}
								>
									{t("signIn")}
								</Link>
							</SignInButton>
						</li>
						<li>
							<SignUpButton>
								<Link
									href='/sign-up'
									className={cn(linkStyles, {
										"font-bold": isActiveTab("/sign-up"),
									})}
									prefetch={false}
								>
									{t("signUp")}
								</Link>
							</SignUpButton>
						</li>
					</SignedOut>
					<li>
						<LanguageSelector />
					</li>
					<li>
						<ModeToggle />
					</li>
				</ul>
			</nav>
		</header>
	);
}
