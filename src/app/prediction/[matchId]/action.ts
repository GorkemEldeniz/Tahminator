"use server";

import prisma from "@/db";
import { actionClient } from "@/lib/safe-action";
import type { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const createPredictionSchema = z.object({
	matchId: z.string(),
	home: z.string().min(2).max(50),
	away: z.string().min(2).max(50),
	homeScore: z.number().min(0),
	awayScore: z.number().min(0),
});

const predictionUpdateSchema = z.object({
	matchId: z.string(),
	homeScore: z.number().min(0),
	awayScore: z.number().min(0),
});

export const createMatchPrediction = actionClient
	.schema(createPredictionSchema)
	.action(
		async ({ parsedInput: { home, away, homeScore, awayScore, matchId } }) => {
			try {
				const { id } = (await currentUser()) as User;
				let localeDate = DateTime.now().setZone("Turkey");

				await prisma.prediction.create({
					data: {
						matchId,
						home,
						away,
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
			} catch (e) {
				console.log(e);
				throw new Error("Prediction could not created!");
			} finally {
				revalidatePath(`/prediction/${matchId}`);
			}
		}
	);

export const updateMatchPrediction = actionClient
	.schema(predictionUpdateSchema)
	.action(async ({ parsedInput: { homeScore, awayScore, matchId } }) => {
		try {
			const { id } = (await currentUser()) as User;

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
		} catch (e) {
			throw new Error("Prediction could not updated");
		} finally {
			revalidatePath(`/prediction/${matchId}`);
		}
	});
