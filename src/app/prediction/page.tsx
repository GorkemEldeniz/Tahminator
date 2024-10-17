import MatchTable from "@/components/match-table";
import { getEuroCupMatches, getPredictionByDate } from "../action";

export default async function Prediction() {
	const [matches, predictions] = await Promise.all([
		getEuroCupMatches(),
		getPredictionByDate()
	]);

	return <MatchTable predictions={predictions} matches={matches} />;
}
