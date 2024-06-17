import { getEuroCupMatches } from "../action";
import MatchTable from "./MatchTable";

export default async function Prediction() {
	let matches = await getEuroCupMatches();

	return <MatchTable matches={matches} />;
}
