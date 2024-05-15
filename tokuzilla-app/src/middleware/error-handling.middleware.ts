import {Context} from "../lib/context";

export async function errorHandlingMiddleware(ctx: Context, next: () => Promise<void>): Promise<void> {
	try {
		await next();
	} catch (error) {
		console.error("An error occurred:", error);
	}
}
