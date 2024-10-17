"use client";
import { handleMatchPrediction } from "@/app/prediction/[matchId]/action";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { predictionFormSchema } from "@/helpers/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Prediction } from "@prisma/client";
import { GeneralAwayTeam } from "fotmob/dist/esm/types/match-details";
import { ArrowLeftIcon } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

export interface Details {
	homeTeam?: GeneralAwayTeam;
	awayTeam?: GeneralAwayTeam;
	started?: boolean;
}

export default function MatchForm({
	details,
	matchId,
	prediction,
}: {
	details: Details;
	matchId: string;
	prediction: Partial<Prediction> | null
}) {
	const { toast } = useToast();
	const { t } = useTranslation();
	const router = useRouter();

	const form = useForm<z.infer<typeof predictionFormSchema>>({
		resolver: zodResolver(predictionFormSchema),
		defaultValues: {
			matchId: matchId,
			home: details.homeTeam?.name,
			away: details.awayTeam?.name,
			homeScore: prediction?.homeScore || 0,
			awayScore: prediction?.awayScore || 0,
		},
	});

	const { execute, isExecuting } = useAction(
		handleMatchPrediction,
		{
			onSuccess: (res) => {
				if (res.data?.success) {
					toast({
						description: res.data.message,
					});
				}
			},
			onError: (er) => {
				const { error } = er;

				if (error.fetchError || error.serverError) {
					toast({
						variant: "destructive",
						description: t('serverError'),
					});
				} else {
					toast({
						variant: "destructive",
						description: t('generalError'),
					});
				}
			},
		}
	);

	function onSubmit(values: z.infer<typeof predictionFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		execute({ ...values, isUpdate: prediction !== null && Object.keys(prediction).length > 0 });
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex flex-col items-center justify-center'
			>
				<Table className='border'>
					<TableBody className='rounded-sm'>
						{details ? (
							<>
								<TableRow className='cursor-pointer'>
									<TableCell>
										<Image
											width={50}
											height={10}
											className='object-cover h-10 rounded-full'
											src={`https://images.fotmob.com/image_resources/logo/teamlogo/${details.homeTeam?.id}_small.png`}
											alt={details.homeTeam?.name || t('flag')}
										/>
									</TableCell>
									<TableCell>
										<h2>{details.homeTeam?.name}</h2>
									</TableCell>
									<TableCell>
										<FormField
											control={form.control}
											name='homeScore'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															min={0}
															max={10}
															type='number'
															className='w-fit ml-auto'
															placeholder='0'
															readOnly={details.started}
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</TableCell>
								</TableRow>
								<TableRow className='cursor-pointer'>
									<TableCell>
										<Image
											width={50}
											height={10}
											className='object-cover h-10 rounded-full'
											src={`https://images.fotmob.com/image_resources/logo/teamlogo/${details.awayTeam?.id}_small.png`}
											alt={details.awayTeam?.name || t('flag')}
										/>
									</TableCell>
									<TableCell>
										<h2>{details.awayTeam?.name}</h2>
									</TableCell>
									<TableCell>
										<FormField
											control={form.control}
											name='awayScore'
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<Input
															min={0}
															max={10}
															type='number'
															className='w-fit ml-auto'
															placeholder='0'
															readOnly={details.started}
															{...field}
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell align='center' colSpan={3}>
										<div className="flex justify-center items-center space-x-4">
											<Button
												disabled={details.started || isExecuting}
												type='submit'
											>
												{prediction ? t('updatePrediction') : t('submitPrediction')}
											</Button>

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
							</>
						) : (
							<TableRow>
								<TableCell className='text-center' colSpan={3}>
									<h2>{t('noMatches')}</h2>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</form>
		</Form>
	);
}