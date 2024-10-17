import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import TranslationProvider from "@/components/translation-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Tahminator",
	description: "Predicting the scores of soccer matches",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<NextTopLoader
						color='#6b7280'
						template='<div class="bar" role="bar"><div class="peg"></div></div>'
					/>
					<TranslationProvider>
						<ThemeProvider
							attribute='class'
							defaultTheme='system'
							enableSystem
							disableTransitionOnChange
						>
							<main className='flex flex-col  max-w-screen-xl mx-auto h-screen'>
								<Navbar />
								{children}
								<Footer />
							</main>
							<Toaster />
						</ThemeProvider>
					</TranslationProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}