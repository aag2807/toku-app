import {Context} from "../lib/context";

export async function headerAuthToken( ctx: Context, next: () => Promise<void> ): Promise<void>
{
	const token = ctx.request.headers['rider'];
	const isValid = token && token == "ichigo";

	if( isValid )
	{
		await next();
	}
	else
	{
		ctx.response.writeHead( 401, {"Content-Type": "application/json"} );
		ctx.response.end( JSON.stringify( {error: "Unauthorized"} ) );
	}
}
