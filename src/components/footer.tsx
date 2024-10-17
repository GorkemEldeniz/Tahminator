"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t } = useTranslation();

	return (
		<footer className='w-full py-6 mt-auto'>
			<div className='container px-4 md:px-6'>
				<div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
					<p className='text-center text-sm leading-loose text-gray-500 dark:text-gray-400 md:text-left'>
						{t("footerRights")}
					</p>
					<nav className='flex gap-4'>
						<Link
							href='#'
							className='text-sm text-gray-500 dark:text-gray-400 hover:underline'
						>
							{t("termsOfService")}
						</Link>
						<Link
							href='#'
							className='text-sm text-gray-500 dark:text-gray-400 hover:underline'
						>
							{t("privacyPolicy")}
						</Link>
					</nav>
				</div>
			</div>
		</footer>
	);
}
