import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
					<ThemeProvider
						attribute='class'
						defaultTheme='system'
						enableSystem
						disableTransitionOnChange
					>
						<main className='max-w-screen-xl mx-auto h-screen'>
							<SignedIn>
								<NavBar />
							</SignedIn>
							{children}
						</main>
						<Toaster />
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
