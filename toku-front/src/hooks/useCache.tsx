import {useState, useEffect} from 'react';
import {LRCache} from '../utils/cache.util.ts';
import {Nullable} from "../utils/types.ts";

let cacheInstance = new LRCache();

export const useCache = <T extends unknown>( key: string, lifeTime: number ): [Nullable<T>, ( value: T ) => void, () => void] =>
{
	const [data, setData] = useState<Nullable<T>>( null );

	const setCache = ( value: T ) =>
	{
		const now = Date.now();
		cacheInstance.set( key, {value, time: now} );
		setData( value );
	};

	const clearCache = () =>
	{
		cacheInstance.delete( key );
		setData( null );
	};

	useEffect( () =>
	{
		const cacheData = cacheInstance.get( key );
		if( cacheData )
		{
			const now = Date.now();
			if( now - cacheData.time <= lifeTime )
			{
				setData( cacheData.value );
			}
			else
			{
				cacheInstance.delete( key );
			}
		}
	}, [key, lifeTime] );

	return [data, setCache, clearCache];
};
