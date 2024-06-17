"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { convertToLocalTime } from "@/helpers";
import type { Match } from "fotmob/dist/esm/types/matches";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MatchTable({
	matches,
}: {
	matches: Match[] | undefined;
}) {
	const router = useRouter();

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead colSpan={5} className='text-center'>
						{new Date().toLocaleDateString("tr", {
							dateStyle: "short",
						})}{" "}
						Matches
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.isArray(matches) && matches.length ? (
					matches.map((match) => (
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
								{convertToLocalTime(match.timeTS as number)}
								<br />-
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
					))
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
