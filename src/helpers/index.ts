import { DateTime } from "luxon";

function getPreviousDayDate() {
	const localeDate = DateTime.now().setZone("Turkey");
	const previousDate = localeDate.minus({ day: 1 });
	previousDate.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });

	return previousDate;
}

export { getPreviousDayDate };
