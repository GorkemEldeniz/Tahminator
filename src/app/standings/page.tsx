import StandingsTable from "@/components/standing-table";
import { getUsersData } from "../action";


export default async function StandingsPage() {
	const usersData = await getUsersData();

	return <StandingsTable usersData={usersData} />;
}
