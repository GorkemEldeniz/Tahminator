import React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className='flex-grow flex items-center justify-center'>
			{children}
		</section>
	);
}
