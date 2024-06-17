import prisma from "@/db";
import { Webhook } from "svix";

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
	const svix_id = req.headers.get("svix-id") ?? "";
	const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
	const svix_signature = req.headers.get("svix-signature") ?? "";

	const body = await req.text();

	const sivx = new Webhook(webhookSecret);

	let res;

	try {
		res = sivx.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as any;
	} catch (err) {
		return new Response("Bad Request", { status: 400 });
	}

	// Save the user to database

	if (res?.type === "user.created") {
		const { first_name, id } = res?.data;

		if (typeof first_name === "string" && typeof id === "string") {
			await prisma.user.create({
				data: {
					id,
					name: first_name,
					score: 0,
				},
			});
		}
	} else if (res?.type === "user.deleted") {
		const { id } = res?.data;

		if (typeof id === "string") {
			await prisma.user.delete({
				where: {
					id,
				},
			});
		}
	}

	return new Response("OK", { status: 200 });
}
