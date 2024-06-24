"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

interface Prediction {
	home: string;
	away: string;
	homeScore: number;
	awayScore: number;
	matchId: string;
}

export default function UserPredictionTable({
	predictions,
	name,
}: {
	predictions: Prediction[];
	name: string;
}) {
	const router = useRouter();
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead></TableHead>
					<TableHead className='text-center'>
						{name || "User"} Predictions
					</TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.isArray(predictions) && predictions.length ? (
					predictions.map((prediction, index) => {
						return (
							<TableRow
								key={index}
								className='cursor-pointer'
								onClick={() =>
									router.push(`/prediction/${prediction?.matchId}`)
								}
							>
								<TableCell>
									<h2>{prediction.home}</h2>
								</TableCell>

								<TableCell align='center'>
									{prediction?.homeScore}-{prediction?.awayScore}
								</TableCell>

								<TableCell align='right'>
									<h2>{prediction?.away}</h2>
								</TableCell>
							</TableRow>
						);
					})
				) : (
					<TableRow>
						<TableCell className='text-center' colSpan={3}>
							<h2>No prediction found for this user !</h2>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
