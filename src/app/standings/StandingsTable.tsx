"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface UserData {
	id: string;
	name: string | null;
	score: number;
	numberOfPrediction: number;
}

export default function StandingsTable({
	usersData,
}: {
	usersData: UserData[];
}) {
	const router = useRouter();
	const { isLoaded, userId } = useAuth();

	const sortedUsersScore = useMemo(
		() => usersData.sort((a, b) => b.score - a.score),
		[usersData]
	);

	if (!isLoaded) {
		throw new Error("Authorization Error");
	}

	return (
		<div className='bg-background p-4 md:p-6 rounded-lg shadow-lg'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-2xl font-bold'>Standings</h2>
				<div className='flex items-center gap-2 text-muted-foreground'>
					<Trophy className='w-5 h-5' />
					<span>Leaderboard</span>
				</div>
			</div>
			<div className='overflow-x-auto'>
				<Table className='w-full text-left'>
					<TableHeader>
						<TableRow className='border-b border-muted'>
							<TableHead className='py-3 pr-4 font-medium'>Name</TableHead>
							<TableHead className='py-3 pr-4 font-medium'>
								Predictions
							</TableHead>
							<TableHead className='py-3 pr-4 font-medium'>Score</TableHead>
							<TableHead className='py-3 pr-4 font-medium'>
								Avg. Points
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedUsersScore.map((userScore, index) => {
							const { id, name, score, numberOfPrediction } = userScore;

							const avarageScorePerPrediction =
								score > 0 ? (score / numberOfPrediction).toFixed(2) : 0;

							return (
								<TableRow
									onClick={() => router.push(`/user?id=${userId}&name=${name}`)}
									key={index}
									className={cn("border-b border-muted cursor-pointer", {
										"bg-gray-300 dark:bg-gray-700": userId === id,
									})}
								>
									<TableCell className='py-3 pr-4 font-medium'>
										{name}
									</TableCell>
									<TableCell className='py-3 pr-4'>
										{numberOfPrediction}
									</TableCell>
									<TableCell className='py-3 pr-4'>{score}</TableCell>
									<TableCell className='py-3 pr-4'>
										{avarageScorePerPrediction}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
