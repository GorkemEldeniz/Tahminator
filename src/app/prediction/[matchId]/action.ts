"use server";

import prisma from "@/db";
import { actionClient } from "@/lib/safe-action";
import type { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import Fotmob from "fotmob";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const predictionFormSchema = z.object({
	id: z.string(),
	home: z.string().min(2).max(50),
	away: z.string().min(2).max(50),
	homeScore: z.number().min(0),
	awayScore: z.number().min(0),
});

const predictionUpdateFormSchema = z.object({
	id: z.string(),
	homeScore: z.number().min(0),
	awayScore: z.number().min(0),
});

const fotmob = new Fotmob();

export const createMatchPrediction = actionClient
	.schema(predictionFormSchema)
	.action(async ({ parsedInput: { home, away, homeScore, awayScore, id } }) => {
		try {
			const { id: userId } = (await currentUser()) as User;

			await prisma.prediction.create({
				data: {
					id: id,
					home,
					away,
					homeScore,
					awayScore,
					user: {
						connect: {
							id: userId,
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
			throw new Error("Prediction could not updated");
		} finally {
			revalidatePath(`/prediction/${id}`);
		}
	});

export const updateMatchPrediction = actionClient
	.schema(predictionUpdateFormSchema)
	.action(async ({ parsedInput: { homeScore, awayScore, id } }) => {
		try {
			const { id: userId } = (await currentUser()) as User;

			await prisma.prediction.update({
				where: {
					id,
					userId,
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
			revalidatePath(`/prediction/${id}`);
		}
	});
