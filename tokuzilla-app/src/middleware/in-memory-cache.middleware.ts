import {Context} from "../lib/context";

const ONE_MINUTE = 60 * 1000;

interface CacheEntry {
	expiry: number;
	data: any;
}

class SimpleCache {
	private cache: Record<string, CacheEntry> = {};
	private readonly ttl: number;
	private cleanupInterval: NodeJS.Timeout;

	constructor( ttl: number = ONE_MINUTE * 5 )
	{
		this.ttl = ttl;
		this.cleanupInterval = setInterval( () => this.cleanupExpiredEntries(), ttl );
	}

	cleanupExpiredEntries()
	{
		const now = Date.now();
		Object.keys( this.cache ).forEach( key =>
		{
			if( this.cache[key].expiry <= now )
			{
				delete this.cache[key];
			}
		} );
	}

	get( key: string ): any
	{
		const entry = this.cache[key];
		if( entry && entry.expiry > Date.now() )
		{
			return entry.data;
		}

		this.cache[key] = undefined as any;
		return null;
	}

	set( key: string, data: any ): void
	{
		const expiry = Date.now() + this.ttl;
		this.cache[key] = {expiry, data};
	}

	clear(): void
	{
		clearInterval( this.cleanupInterval );
		this.cache = {};
	}
}

export const GLOBAL_CACHE = new SimpleCache( ONE_MINUTE );  // Cache data for 1 minute
