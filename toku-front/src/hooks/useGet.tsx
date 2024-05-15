import {useEffect, useState} from "react";
import {Nullable} from "../utils/types.ts";

export const useGet = <T extends unknown>( url: string, options?: RequestInit ): [Nullable<T>, boolean, Nullable<Error>] =>
{
	const [data, setData] = useState<Nullable<T>>( null );
	const [loading, setLoading] = useState<boolean>( true );
	const [error, setError] = useState<Nullable<Error>>( null );

	const fetchData = async(): Promise<void> =>
	{
		try
		{
			const response = await fetch( url, options );
			const result = await response.json();
			setData( result );
		}
		catch( e )
		{
			setError( e as any );
		} finally
		{
			setLoading( false );
		}
	};

	useEffect( () =>
	{
		fetchData();
	}, [] );

	return [data, loading, error];
}
