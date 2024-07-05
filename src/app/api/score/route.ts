import prisma from "@/db";
import type { Match, Matches } from "fotmob/dist/esm/types/matches";
import { DateTime } from "luxon";
import { headers } from "next/headers";

export async function GET() {
	const headersList = headers();
	const authToken = headersList.get("authorization");
	const adminToken = process.env.ADMIN_TOKEN || "";

	if (authToken !== adminToken) return new Response("FAIL", { status: 403 });

	try {
		// get the previos date results
		const dateTime = DateTime.now().setZone("Turkey");
		const previousDayDate = dateTime.minus({ day: 1 });

		const res = await fetch(
			`https://www.fotmob.com/api/matches?date=${previousDayDate.toFormat(
				"yyyyMMdd"
			)}`
		);

		const { leagues } = (await res.json()) as Matches;
		let matches: Partial<Match[]>;

		if (leagues) {
			matches = leagues
				.filter(({ name }) => name?.startsWith("EURO"))
				.map(({ matches }) => matches)
				.flat();
		} else {
			matches = [];
		}

		const usersPrediction = await prisma.prediction.findMany({
			where: {
				createdAt: previousDayDate.toISO() as string,
			},
		});

		// calculate the score by algorithm
		usersPrediction.forEach(async (userPrediction) => {
			let totalScore = 100;

			const match = matches.find(
				(m) => m?.id === parseInt(userPrediction.matchId)
			);

			const homeScore = match?.home?.score as number;
			const awayScore = match?.away?.score as number;

			totalScore -=
				Math.abs(homeScore - userPrediction.homeScore) * 10 +
				Math.abs(awayScore - userPrediction.awayScore) * 10;

			await prisma.user.update({
				where: {
					id: userPrediction.userId,
				},
				data: {
					score: {
						increment: totalScore,
					},
				},
			});
		});

		return new Response("OK", { status: 200 });
	} catch (e) {
		throw new Error("User score could not updated");
	}
}
