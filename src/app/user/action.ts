import prisma from "@/db";
import { DateTime } from "luxon";
import { revalidatePath } from "next/cache";

async function getUserPrediction(id: string) {
	try {
		const currentDate = DateTime.now().setZone("Turkey").toISO();

		const userPrediction = await prisma.prediction.findMany({
			where: {
				userId: id,
				createdAt: currentDate as string,
			},
			select: {
				home: true,
				away: true,
				homeScore: true,
				awayScore: true,
				matchId: true,
			},
		});

		return userPrediction;
	} catch (error) {
		throw new Error("Failed to get user prediction");
	} finally {
		revalidatePath(`/user/${id}`);
	}
}

export { getUserPrediction };
