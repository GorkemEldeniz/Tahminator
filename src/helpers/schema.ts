import { z } from "zod";

const predictionFormSchema = z.object({
	id: z.string(),
	home: z.string().min(2).max(50),
	away: z.string().min(2).max(50),
	homeScore: z.string().transform((val, ctx) => {
		const parsed = parseInt(val);
		if (isNaN(parsed)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Not a number",
			});
			return z.NEVER;
		}

		if (parsed < 0 || parsed > 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Number must between 0-10",
			});
			return z.NEVER;
		}

		return parsed;
	}),
	awayScore: z.string().transform((val, ctx) => {
		const parsed = parseInt(val);
		if (isNaN(parsed)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Not a number",
			});
			return z.NEVER;
		}

		if (parsed < 0 || parsed > 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Number must between 0-10",
			});
			return z.NEVER;
		}

		return parsed;
	}),
});

const predictionUpdateFormSchema = z.object({
	id: z.string(),
	homeScore: z.string().transform((val, ctx) => {
		const parsed = parseInt(val);
		if (isNaN(parsed)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Not a number",
			});
			return z.NEVER;
		}

		if (parsed < 0 || parsed > 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Number must between 0-10",
			});
			return z.NEVER;
		}

		return parsed;
	}),
	awayScore: z.string().transform((val, ctx) => {
		const parsed = parseInt(val);
		if (isNaN(parsed)) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Not a number",
			});
			return z.NEVER;
		}

		if (parsed < 0 || parsed > 10) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: "Number must between 0-10",
			});
			return z.NEVER;
		}

		return parsed;
	}),
});

export { predictionFormSchema, predictionUpdateFormSchema };
