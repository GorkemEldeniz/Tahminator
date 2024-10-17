import { getMatchDetailByID } from "@/app/action";
import MatchForm from "@/components/match-form";
import prisma from "@/db";
import { currentUser, User } from "@clerk/nextjs/server";

export default async function MatchDetailPage({
	params,
}: {
	params: { matchId: string };
}) {
	const details = await getMatchDetailByID(params.matchId);
	const { id } = (await currentUser()) as User;

	const prediction = await prisma.prediction.findUnique({
		where: {
			predictionId: {
				matchId: params.matchId,
				userId: id,
			},
		},
	});

	return <MatchForm details={details} prediction={prediction} matchId={params.matchId} />;
}
