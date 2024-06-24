import { getUserPrediction } from "./action";
import UserPredictionTable from "./userPredictionTable";

export default async function UserPredictionPage({
	searchParams,
}: {
	searchParams: { name: string; id: string };
}) {
	const { name, id } = searchParams;

	const predictions = await getUserPrediction(id);

	return <UserPredictionTable predictions={predictions} name={name} />;
}
