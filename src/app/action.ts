"use server";

import { getFormattedDate } from "@/helpers";
import Fotmob from "fotmob";
import { MatchDetails } from "fotmob/dist/esm/types/match-details";
import type { Match, Matches } from "fotmob/dist/esm/types/matches";
import { revalidatePath } from "next/cache";

const fotmob = new Fotmob();

async function getEuroCupMatches() {
	try {
		const currentDate = getFormattedDate();
		const res = await fetch(
			`https://www.fotmob.com/api/matches?date=${currentDate}`
		);

		const { leagues } = (await res.json()) as Matches;

		const matches: Match[] = [];

		if (leagues) {
			leagues
				?.filter(({ name }) => name?.startsWith("EURO"))
				.map((league) => {
					league.matches?.forEach((match) => matches.push(match));
				});
			return matches;
		}
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

export { getEuroCupMatches, getMatchDetailByID };
