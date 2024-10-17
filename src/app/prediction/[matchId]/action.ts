"use server";

import prisma from "@/db";
import { actionClient } from "@/lib/safe-action";
import type { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const predictionSchema = z.object({
	matchId: z.string(),
	home: z.string().min(2).max(50).optional(),
	away: z.string().min(2).max(50).optional(),
	homeScore: z.number().min(0),
	awayScore: z.number().min(0),
	isUpdate: z.boolean(),
});

export const handleMatchPrediction = actionClient
	.schema(predictionSchema)
	.action(
		async ({ parsedInput: { home, away, homeScore, awayScore, matchId, isUpdate } }) => {
			try {
				const { id } = (await currentUser()) as User;
				let localeDate = DateTime.now().setZone("Turkey");

				if (isUpdate) {
					await prisma.prediction.update({
						where: {
							predictionId: {
								matchId,
								userId: id,
							},
						},
						data: {
							homeScore,
							awayScore,
						},
					});

					return {
						success: true,
						message: "Prediction updated and saved!",
					};
				} else {
					await prisma.prediction.create({
						data: {
							matchId,
							home: home!,
							away: away!,
							homeScore,
							awayScore,
							createdAt: localeDate.toISO() as string,
							user: {
								connect: {
									id,
								},
							},
						},
					});

					return {
						success: true,
						message: "Prediction created and saved!",
					};
				}
			} catch (e) {
				console.log(e);
				throw new Error(isUpdate ? "Prediction could not be updated!" : "Prediction could not be created!");
			} finally {
				revalidatePath(`/prediction/${matchId}`);
			}
		}
	);
