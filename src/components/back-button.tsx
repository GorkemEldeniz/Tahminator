"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export default function BackButton() {
	const router = useRouter();

	return (
		<Button
			variant='outline'
			className='flex items-center gap-2'
			onClick={() => router.back()}
		>
			<ArrowLeftIcon className='h-4 w-4' />
			Go Back
		</Button>
	);
}
