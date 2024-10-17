'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslation } from 'react-i18next';

export default function Home() {
	const { t } = useTranslation();

	return (
		<>
			<section className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
								{t('welcome')}
							</h1>
							<p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
								{t('homeDescription')}
							</p>
						</div>
						<div className="space-x-4">
							<Button asChild variant='default'>
								<a href="/prediction">
									{t('getStarted')}
								</a>
							</Button>
							<Button asChild variant="outline">
								<a href="#scoring-rules-card">
									{t('learnMore')}
								</a>
							</Button>
						</div>
					</div>
				</div>
			</section>
			<section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-background/80">
				<div className="container px-4 md:px-6">
					<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
						{t('scoringRules')}
					</h2>
					<Card id="scoring-rules-card" className="w-full mx-auto">
						<CardHeader>
							<CardTitle>{t('howPointsCalculated')}</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="list-disc pl-6 space-y-2 mb-6">
								<li><strong>{t('makeYourPrediction')}:</strong> {t('makeYourPredictionDesc')}</li>
								<li><strong>{t('earnPoints')}:</strong> {t('earnPointsDesc')}</li>
								<li><strong>{t('pointDeduction')}:</strong> {t('pointDeductionDesc')}</li>
							</ul>
							<h3 className="text-xl font-semibold mb-4">{t('exampleCalculation')}</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>{t('actualScore')}</TableHead>
										<TableHead>{t('yourPrediction')}</TableHead>
										<TableHead>{t('calculation')}</TableHead>
										<TableHead>{t('totalPoints')}</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>1 - 1</TableCell>
										<TableCell>2 - 0</TableCell>
										<TableCell>
											<p className="truncate">{t('homeGoalDifference')}</p>
											<p className="truncate">{t('awayGoalDifference')}</p>
										</TableCell>
										<TableCell className="font-bold truncate">{t('finalPointCalculation')}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</section>
		</>
	)
}