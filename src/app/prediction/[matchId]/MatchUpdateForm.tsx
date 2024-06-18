"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { predictionUpdateFormSchema } from "@/helpers/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prediction } from "@prisma/client";
import { useAction } from "next-safe-action/hooks";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateMatchPrediction } from "./action";
import type { Details } from "./MatchForm";

export default function MatchUpdateForm({
	details,
	prediction,
}: {
	details: Details;
	prediction: Prediction;
}) {
	const { toast } = useToast();

	const form = useForm<z.infer<typeof predictionUpdateFormSchema>>({
		resolver: zodResolver(predictionUpdateFormSchema),
		defaultValues: {
			matchId: prediction.matchId,
			homeScore: prediction.homeScore,
			awayScore: prediction.awayScore,
		},
	});

	const { execute, isExecuting } = useAction(updateMatchPrediction, {
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

	function onSubmit(values: z.infer<typeof predictionUpdateFormSchema>) {
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
						<TableRow className='cursor-pointer'>
							<TableCell>
								<Image
									width={50}
									height={10}
									className='object-cover h-10 rounded-full'
									src={`https://images.fotmob.com/image_resources/logo/teamlogo/${details.homeTeam?.id}_small.png`}
									alt={prediction.home || "flag"}
								/>
							</TableCell>
							<TableCell>
								<h2>{prediction.home}</h2>
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
													readOnly={details?.started}
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
									alt={prediction.away || "flag"}
								/>
							</TableCell>
							<TableCell>
								<h2>{prediction.away}</h2>
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
													readOnly={details?.started}
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
								<Button disabled={isExecuting || details.started} type='submit'>
									Submit
								</Button>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</form>
		</Form>
	);
}
