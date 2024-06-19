import { getEuroCupMatches, getPredictionByDate } from "../action";
import MatchTable from "./MatchTable";

export default async function Prediction() {
	const matches = await getEuroCupMatches();
	const predictions = await getPredictionByDate();

	return <MatchTable predictions={predictions} matches={matches} />;
}
