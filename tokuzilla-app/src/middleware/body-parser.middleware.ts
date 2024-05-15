import {Context} from "../lib/context";

export async function bodyParser( ctx: Context, next: () => Promise<void> ): Promise<void>
{
	if( ctx.request.headers['content-type']?.includes( 'application/json' ) )
	{
		let rawData = '';
		for await ( const chunk of ctx.request )
		{
			rawData += chunk;
		}
		try
		{
			ctx.body = JSON.parse( rawData );
		}
		catch( error )
		{
			ctx.response.writeHead( 400, {"Content-Type": "application/json"} );
			ctx.response.end( JSON.stringify( {error: "Invalid JSON"} ) );
			return;
		}
	}
	else if( ctx.request.headers['content-type']?.includes( 'application/x-www-form-urlencoded' ) )
	{
		let rawData = '';
		for await ( const chunk of ctx.request )
		{
			rawData += chunk;
		}
		ctx.body = {};
		rawData.split( '&' ).forEach( pair =>
		{
			const [key, value] = pair.split( '=' );
			ctx.body[decodeURIComponent( key )] = decodeURIComponent( value.replace( /\+/g, ' ' ) );
		} );
	}
	await next();
}
