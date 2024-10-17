"use server";

import prisma from "@/db";
import { currentUser, User } from "@clerk/nextjs/server";
import { MatchDetails } from "fotmob/dist/esm/types/match-details";
import type { Matches } from "fotmob/dist/esm/types/matches";
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";

async function getEuroCupMatches() {
	try {
		const locale = DateTime.now().setZone("Turkey");
		const currentDate = locale.toFormat("yyyyMMdd");
		const res = await fetch(
			`https://www.fotmob.com/api/matches?date=${currentDate}`
		);

		const { leagues } = (await res.json()) as Matches;
		if (leagues) {
			return leagues
				.filter(({ name }) => name?.startsWith("EURO"))
				.map(({ matches }) => matches)
				.flat();
		}
		return [];
	} catch (e) {
		throw new Error("Failed to get matches");
	}
}

async function getMatchDetailByID(id: string) {
	try {
		const res = await fetch(
			`https://www.fotmob.com/api/matchDetails?matchId=${id}`
		);

		const details = (await res.json()) satisfies MatchDetails;

		const homeTeam = details?.general?.homeTeam;
		const awayTeam = details?.general?.awayTeam;
		const started = details?.general?.started;

		return {
			homeTeam,
			awayTeam,
			started,
		};
	} catch (e) {
		throw new Error("Failed to get match details");
	} finally {
		revalidatePath(`/prediction/${id}`);
	}
}

async function getPredictionByDate() {
	try {
		const { id } = (await currentUser()) as User;

		const currentDate = DateTime.now().setZone("Turkey").toISO();

		const predictions = await prisma?.prediction.findMany({
			where: {
				createdAt: currentDate as string,
				userId: id,
			},
			select: {
				homeScore: true,
				awayScore: true,
				matchId: true,
			},
		});

		return predictions;
	} catch (e) {
		throw new Error("Failed to get matches");
	}
}

async function getUsersData() {
	let localeDate = DateTime.now().setZone("Turkey");

	try {
		const users = await prisma.user.findMany();

		const usersData = await Promise.all(
			users.map(async ({ name, id, score }) => {
				const numberOfPrediction = await prisma.prediction.count({
					where: {
						createdAt: {
							lte: localeDate.toISO() as string,
						},
						userId: id,
					},
				});
				return {
					name,
					id,
					score,
					numberOfPrediction,
				};
			})
		);

		return usersData;
	} catch (e) {
		throw new Error("Failed to get users data");
	}
}

export {
	getEuroCupMatches,
	getMatchDetailByID,
	getPredictionByDate,
	getUsersData
};

