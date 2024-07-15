export default function getWeightedScore(
	dataCount: number,
	totalScore: number
) {
	const average = totalScore / dataCount;
	const proximityExponent = 2;

	const proximityTo100 = Math.pow(
		1 - Math.abs(100 - average) / 100,
		proximityExponent
	);
	const weightFactor = Math.log10(dataCount + 1);

	return proximityTo100 * weightFactor;
}
