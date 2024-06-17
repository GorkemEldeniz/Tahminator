import prisma from "@/db";
import { Webhook } from "svix";

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
	const svix_id = req.headers.get("svix-id") ?? "";
	const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
	const svix_signature = req.headers.get("svix-signature") ?? "";

	const body = await req.text();

	const sivx = new Webhook(webhookSecret);

	try {
		const res = sivx.verify(body, {
			"svix-id": svix_id,
			"svix-timestamp": svix_timestamp,
			"svix-signature": svix_signature,
		}) as any;

		// Save the user to database

		if (res?.type === "user.created") {
			const { first_name, id } = res?.data;

			await prisma.user.create({
				data: {
					id,
					name: first_name || "user",
				},
			});
		} else if (res?.type === "user.deleted") {
			const { id } = res?.data;

			await prisma.user.delete({
				where: {
					id,
				},
			});
		}

		return new Response("OK", { status: 200 });
	} catch (err) {
		console.log(err);
		return new Response("Bad Request", { status: 400 });
	}
}
