import { DateTime } from "luxon";

function getPreviousDayDate() {
	const locale = DateTime.now().setZone("Turkey");

	const previousDate = locale.minus({ day: 1 });

	return {
		date: previousDate.toFormat("yyyyMMdd"),
		ISO: previousDate.toISO(),
	};
}

export { getPreviousDayDate };
