import { getUsersData } from "../action";
import StandingsTable from "./StandingsTable";

export default async function StandingsPage() {
	const usersData = await getUsersData();

	return <StandingsTable usersData={usersData} />;
}
