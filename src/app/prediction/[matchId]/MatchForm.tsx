"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { predictionFormSchema } from "@/helpers/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneralAwayTeam } from "fotmob/dist/esm/types/match-details";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createMatchPrediction } from "./action";

export interface Details {
	homeTeam?: GeneralAwayTeam;
	awayTeam?: GeneralAwayTeam;
	started?: boolean;
}

export default function MatchForm({
	details,
	matchId,
}: {
	details: Details;
	matchId: string;
}) {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof predictionFormSchema>>({
		resolver: zodResolver(predictionFormSchema),
		defaultValues: {
			matchId: matchId,
			home: details.homeTeam?.name,
			away: details.awayTeam?.name,
		},
	});

	const { execute, isExecuting } = useAction(createMatchPrediction, {
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
					description: "Server error please try again later 😵",
				});
			} else {
				toast({
					variant: "destructive",
					description: "Error occurs please try again later 😵",
				});
			}
		},
	});

	function onSubmit(values: z.infer<typeof predictionFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		execute(values);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='flex items-center justify-center'
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
											alt={details.homeTeam?.name || "flag"}
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
											alt={details.awayTeam?.name || "flag"}
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
										<Button
											disabled={details.started || isExecuting}
											type='submit'
										>
											Submit
										</Button>
									</TableCell>
								</TableRow>
							</>
						) : (
							<TableRow>
								<TableCell className='text-center' colSpan={3}>
									<h2>No matches found for today!</h2>
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</form>
		</Form>
	);
}
