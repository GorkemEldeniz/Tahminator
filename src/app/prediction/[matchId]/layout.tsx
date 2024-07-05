import BackButton from "@/components/back-button";
import React from "react";

export default function PredictionLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main>
			{children}
			<BackButton />
		</main>
	);
}
