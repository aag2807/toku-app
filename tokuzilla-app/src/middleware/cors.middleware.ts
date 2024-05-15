import {Context} from "../lib/context";

export async function corsMiddleware( ctx: Context, next: () => Promise<void> ): Promise<void>
{
	ctx.response.setHeader( 'Access-Control-Allow-Origin', '*' );  // Allows all domains
	ctx.response.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS' );
	ctx.response.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );

	if( ctx.request.method === 'OPTIONS' )
	{
		ctx.response.writeHead( 204 );
		ctx.response.end();
		return await Promise.resolve();
	}

	return await next();
}
