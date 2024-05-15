import {Context} from "../lib/context";

const ONE_MINUTE = 60 * 1000;

interface CacheEntry {
	expiry: number;
	data: any;
}

class SimpleCache {
	private cache: Record<string, CacheEntry> = {};
	private readonly ttl: number; // Time to live in milliseconds

	constructor( ttl: number = ONE_MINUTE * 5 )
	{
		this.ttl = ttl;
	}

	get( key: string ): any
	{
		const entry = this.cache[key];
		if( entry && (entry.expiry > Date.now()) )
		{
			return entry.data;
		}
		return null;
	}

	set( key: string, data: any ): void
	{
		const expiry = Date.now() + this.ttl;
		this.cache[key] = {expiry, data};
	}

	clear(): void
	{
		this.cache = {};
	}
}

const cache = new SimpleCache( 60000 );  // Cache data for 1 minute

export const cacheMiddleware = async( ctx: Context, next: () => Promise<void> ): Promise<void> =>
{
	const cachedResponse = cache.get( ctx.request.url! );
	if( cachedResponse )
	{
		ctx.response.writeHead( 200, {"Content-Type": "application/json"} );
		ctx.response.end( JSON.stringify( cachedResponse ) );
		return;
	}

	await next();

	if( ctx.response.statusCode === 200 )
	{
		cache.set( ctx.request.url!, ctx.body );
	}
};
