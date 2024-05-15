import React, {useEffect, useState} from 'react';
import {IScrapedDetails} from "../utils/scraped-details.interface.ts";
import {Encrypter} from "../utils/encrypter.util.ts";
import {get} from "../utils/actions.ts";
import Navbar from "../components/Navbar.tsx";

const Details: React.FC = () =>
{
	const [loading, setLoading] = useState<boolean>( false );
	const [error, setError] = useState<Error|null>( null );
	const [data, setData] = useState<IScrapedDetails|null>( null );

	useEffect( () =>
	{
		if(loading)
		{
			return;
		}
		const encryptedUrl = window.location.search.split( '=' )[1];
		const decryptedUrl = Encrypter.decrypt( encryptedUrl );

		setLoading( true );
		get<IScrapedDetails>( "http://localhost:3030/toku/get-details?detailUrl=" + decryptedUrl )
			.then( data =>
			{
				setData( data.body );
				setLoading( false );
				console.log( data )
			} ).catch( error =>
		{
			setError( error );
			setLoading( false );
		} );
	}, [] );

	return (
		<section className={"px-4 pt-3 flex flex-col min-h-screen"}>
			<Navbar/>
			{loading && <p id={"loading"}>Loading...</p>}
			{!loading && error && <p id={"error"}>Error: {error.message}</p>}

			{!loading && data && (
				<>
					<h1 className={"text-2xl font-bold mb-10"}>{data.title}</h1>
					<p className={"text-sm"}>{data.description}</p>
				</>
			)}
		</section>
	);
};

export default Details;
