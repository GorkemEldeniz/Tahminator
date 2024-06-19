import { getUsersScore } from "../action";
import StandingsTable from "./StandingsTable";

export default async function StandingsPage() {
	const usersScore = await getUsersScore();

	return <StandingsTable usersScore={usersScore} />;
}
