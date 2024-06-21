"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Match } from "fotmob/dist/esm/types/matches";
import { DateTime } from "luxon";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MatchTable({
	matches,
	predictions,
}: {
	matches: Match[] | undefined;
	predictions?: {
		matchId: string;
		homeScore: number;
		awayScore: number;
	}[];
}) {
	const router = useRouter();
	const locale = DateTime.now().setZone("Turkey");

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead></TableHead>
					<TableHead></TableHead>
					<TableHead className='text-center'>
						{locale.toFormat("dd.MM.yyyy")} Matches
					</TableHead>
					<TableHead></TableHead>
					<TableHead></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.isArray(matches) && matches.length ? (
					matches.map((match) => {
						const prediction = predictions?.find(
							(prediction) => parseInt(prediction.matchId) === match.id
						);

						return (
							<TableRow
								key={match.id}
								className='cursor-pointer'
								onClick={() => router.push(`/prediction/${match.id}`)}
							>
								<TableCell>
									<h2>{match.home?.name}</h2>
								</TableCell>
								<TableCell>
									<Image
										width={100}
										height={40}
										className='object-contain h-16'
										src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match.home?.id}_small.png`}
										alt={match.home?.name || "flag"}
									/>
								</TableCell>

								<TableCell align='center'>
									{DateTime.fromMillis(match.timeTS as number)
										.setZone("Turkey")
										.toFormat("HH:mm")}
									<br />
									{prediction?.homeScore}-{prediction?.awayScore}
								</TableCell>

								<TableCell align='right'>
									<Image
										className='object-contain h-16'
										width={100}
										height={40}
										src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match.away?.id}_small.png`}
										alt={match.away?.name || "flag"}
									/>
								</TableCell>
								<TableCell align='right'>
									<h2>{match.away?.name}</h2>
								</TableCell>
							</TableRow>
						);
					})
				) : (
					<TableRow>
						<TableCell className='text-center' colSpan={5}>
							<h2>No matches found for today!</h2>
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}
