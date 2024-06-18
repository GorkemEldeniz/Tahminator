import countries from "../countries.json";

function getFormattedDate() {
	const today = new Date();

	let year = today.getFullYear().toString();
	let month = (today.getMonth() + 1).toString().padStart(2, "0");
	let day = today.getDate().toString().padStart(2, "0");

	return year + month + day;
}

function getPreviousDayDate() {
	const today = new Date();

	const previousDay = new Date(today);
	previousDay.setDate(today.getDate() - 1);
	previousDay.setUTCHours(0, 0, 0, 0);

	const year = previousDay.getFullYear();
	const month = String(previousDay.getMonth() + 1).padStart(2, "0");
	const day = String(previousDay.getDate()).padStart(2, "0");

	return {
		date: `${year}${month}${day}`,
		ISO: previousDay.toISOString(),
	};
}

function getCountryFlagUrlByName(countryName: string) {
	const country = countries.find((c) => c.countryName === countryName);

	return country
		? `https://flagcdn.com/w160/${country.countryCode.toLocaleLowerCase(
				"en"
		  )}.webp`
		: "Country not found";
}

function convertToLocalTime(timestamp: number) {
	const date = new Date(timestamp);
	const localDateTime = date.toLocaleTimeString("tr", { timeStyle: "short" });
	return localDateTime;
}

export {
	convertToLocalTime,
	getCountryFlagUrlByName,
	getFormattedDate,
	getPreviousDayDate,
};
