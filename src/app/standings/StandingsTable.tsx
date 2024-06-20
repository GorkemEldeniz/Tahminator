import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Trophy } from "lucide-react";
import { useMemo } from "react";

interface UsersScore {
	name: string | null;
	score: number;
	predictions: {
		matchId: string;
		createdAt: Date;
		userId: string;
		home: string;
		away: string;
		homeScore: number;
		awayScore: number;
	}[];
}

export default function StandingsTable({
	usersScore,
}: {
	usersScore: UsersScore[];
}) {
	const sortedUsersScore = useMemo(
		() => usersScore.sort((a, b) => b.score - a.score),
		[usersScore]
	);

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
							const { name, score, predictions } = userScore;

							const avarageScorePerPrediction =
								score > 0 ? (score / predictions.length).toFixed(2) : 0;

							return (
								<TableRow key={index} className='border-b border-muted'>
									<TableCell className='py-3 pr-4 font-medium'>
										{name}
									</TableCell>
									<TableCell className='py-3 pr-4'>
										{predictions.length}
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
