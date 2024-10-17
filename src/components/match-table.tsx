"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableRow
} from "@/components/ui/table";
import type { Match } from "fotmob/dist/esm/types/matches";
import { ArrowLeftIcon, Clock } from "lucide-react";
import { DateTime } from "luxon";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "./ui/button";

interface Prediction {
	matchId: string;
	homeScore: number;
	awayScore: number;
}

interface MatchTableProps {
	matches: Partial<Match[]> | undefined;
	predictions?: Prediction[];
}

const MatchTable: React.FC<MatchTableProps> = ({ matches, predictions }) => {
	const router = useRouter();
	const locale = DateTime.now().setZone("Turkey");
	const { t } = useTranslation();

	return (
		<div className="w-full my-4 mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
			<div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
				<h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 flex items-center justify-center">
					{locale.toFormat("dd.MM.yyyy")} {t('matches')} <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">({matches?.length})</span>
				</h2>
			</div>
			<div className="overflow-x-auto">
				<Table className="w-full">
					<TableBody>
						{Array.isArray(matches) && matches.length ? (
							matches.map((match, index) => {
								const prediction = predictions?.find(
									(prediction) => parseInt(prediction.matchId) === match?.id
								);

								return (
									<TableRow
										key={match?.id}
										className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'} hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150 ease-in-out cursor-pointer`}
										onClick={() => router.push(`/prediction/${match?.id}`)}
									>
										<TableCell className="px-6 py-6 whitespace-nowrap">
											<div className="flex items-center justify-between">
												<div className="flex items-center w-[40%]">
													<div className="w-8 text-center">
														<Image
															width={32}
															height={32}
															className="object-contain h-8"
															src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match?.home?.id}_small.png`}
															alt={match?.home?.name || "flag"}
														/>
													</div>
													<span className="text-sm font-medium text-gray-900 dark:text-gray-200 ml-3 w-36 text-left">{match?.home?.name}</span>
												</div>
												<div className="flex flex-col items-center justify-center w-[20%]">
													<div className="flex items-center justify-center mb-1">
														<div className="flex items-center">
															<Clock className="w-3 h-3 mr-1 text-gray-500 dark:text-gray-400" />
															<span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
																{DateTime.fromMillis(match?.timeTS as number)
																	.setZone("Turkey")
																	.toFormat("HH:mm")}
															</span>
														</div>
													</div>
													<div className="w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-600 rounded-full">
														<span className="text-xs font-bold text-gray-800 dark:text-gray-200">VS</span>
													</div>
													{prediction && (
														<div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-1">
															{prediction.homeScore}-{prediction.awayScore}
														</div>
													)}
												</div>
												<div className="flex items-center justify-end w-[40%]">
													<span className="text-sm font-medium text-gray-900 dark:text-gray-200 mr-3 w-36 text-right">{match?.away?.name}</span>
													<div className="w-8 text-center">
														<Image
															width={32}
															height={32}
															className="object-contain h-8"
															src={`https://images.fotmob.com/image_resources/logo/teamlogo/${match?.away?.id}_small.png`}
															alt={match?.away?.name || "flag"}
														/>
													</div>
												</div>
											</div>
										</TableCell>
									</TableRow>
								);
							})
						) : (
							<TableRow>
								<TableCell className='text-center' colSpan={5}>
									<div className="flex flex-col items-center justify-center space-y-4">
										<h2 className="text-gray-800 dark:text-gray-200">{t('noMatches')}</h2>
										<Button
											variant='outline'
											className='flex items-center gap-2'
											onClick={() => router.back()}
										>
											<ArrowLeftIcon className='h-4 w-4' />
											{t('goBack')}
										</Button>
									</div>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default React.memo(MatchTable);
