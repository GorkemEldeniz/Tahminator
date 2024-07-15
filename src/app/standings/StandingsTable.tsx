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
import getWeightedScore from ".";

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

	// calculate the overall avarage
	// const overallAverage = useMemo(() => {
	// 	const { numberOfAllPrediction, sumOfAllScore } = usersData.reduce(
	// 		(acc, cur) => {
	// 			acc.numberOfAllPrediction += cur.numberOfPrediction;
	// 			acc.sumOfAllScore += cur.score;
	// 			return acc;
	// 		},
	// 		{
	// 			numberOfAllPrediction: 0,
	// 			sumOfAllScore: 0,
	// 		}
	// 	);

	// 	return sumOfAllScore / numberOfAllPrediction;
	// }, [usersData]);

	const sortedUsersScore = useMemo(() => {
		const usersDataWithAvarage = usersData.map((userData) => {
			const { score, numberOfPrediction } = userData;

			const weightedScore = getWeightedScore(numberOfPrediction, score);

			return {
				...userData,
				weightedScore,
			};
		});

		return usersDataWithAvarage.sort(
			(a, b) => b.weightedScore - a.weightedScore
		);
	}, [usersData]);

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
							<TableHead className='py-3 pr-4 font-medium'>
								Total Score
							</TableHead>
							<TableHead className='py-3 pr-4 font-medium truncate'>
								Point
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{sortedUsersScore.map((userScore, index) => {
							const { name, id, score, numberOfPrediction, weightedScore } =
								userScore;

							return (
								<TableRow
									onClick={() => router.push(`/user?id=${id}&name=${name}`)}
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
										{weightedScore.toFixed(2)}
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
