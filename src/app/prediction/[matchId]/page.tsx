import { getMatchDetailByID } from "@/app/action";
import prisma from "@/db";
import { currentUser, User } from "@clerk/nextjs/server";
import MatchForm from "./MatchForm";
import MatchUpdateForm from "./MatchUpdateForm";

export default async function MatchDetailPage({
	params,
}: {
	params: { matchId: string };
}) {
	const details = await getMatchDetailByID(params.matchId);
	const { id: userId } = (await currentUser()) as User;

	const prediction = await prisma.prediction.findFirst({
		where: {
			userId,
			id: params.matchId,
		},
	});

	if (prediction)
		return <MatchUpdateForm details={details} prediction={prediction} />;

	return <MatchForm details={details} matchId={params.matchId} />;
}
