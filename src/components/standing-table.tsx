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
import { Medal, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { useTranslation } from 'react-i18next';
import getWeightedScore from "../app/standings";

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
	const { t } = useTranslation(); // Add translation hook
	const router = useRouter();
	const { userId } = useAuth();

	const handleRowClick = (id: string, name: string | null) => {
		router.push(`/user?id=${id}&name=${name}`);
	};

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

	return (
		<div className="w-full my-4 mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
			<div className="px-6 py-4 bg-primary dark:bg-primary-foreground flex justify-between items-center">
				<h2 className="text-2xl font-bold text-primary-foreground dark:text-primary flex items-center">
					<Trophy className="mr-2" /> {t('standings')}
				</h2>
				<span className="text-primary-foreground dark:text-primary opacity-75 flex items-center">
					<Medal className="mr-1" /> {t('leaderboard')}
				</span>
			</div>
			<div className="max-h-[70vh] overflow-y-auto">
				<Table className="w-full text-left">
					<TableHeader>
						<TableRow className="bg-gray-100 dark:bg-gray-700">
							<TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('name')}</TableHead>
							<TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('predictions')}</TableHead>
							<TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('total_score')}</TableHead>
							<TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{t('point')}</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-600">
						{sortedUsersScore.map((userScore, index) => {
							const { name, id, score, numberOfPrediction, weightedScore } = userScore;

							return (
								<TableRow
									key={id}
									className={cn(`cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200`, {
										"bg-blue-100 dark:bg-blue-500": userId === id,
									})}
									onClick={() => handleRowClick(id, name)}
								>
									<TableCell className="px-6 py-4 whitespace-nowrap w-1/4 border-gray-200 dark:border-gray-700">
										<div className="flex items-center">
											<div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-secondary dark:bg-secondary text-secondary-foreground dark:text-secondary-foreground font-bold">
												{index + 1}
											</div>
											<div className="ml-4 truncate">
												<div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate max-w-[150px]">{name}</div>
											</div>
										</div>
									</TableCell>
									<TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{numberOfPrediction}</TableCell>
									<TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{score}</TableCell>
									<TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{weightedScore.toFixed(2)}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
