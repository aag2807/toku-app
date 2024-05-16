import React, {useEffect, useState} from 'react';
import {IScrapedDetails} from "../utils/scraped-details.interface.ts";
import {Encrypter} from "../utils/encrypter.util.ts";
import {get} from "../utils/actions.ts";
import {FaChevronLeft} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import ichigoError from '../assets/ichigo-error.png'
import Spinner from "../components/Spinner.tsx";
import {DataResponse} from "../utils/data-response.ts";

const Details: React.FC = () =>
{
	const [decryptedUrl, setDecryptedUrl] = useState<string|null>( null );
	const [loading, setLoading] = useState<boolean>( false );
	const [error, setError] = useState<Error|null>( null );
	const [data, setData] = useState<IScrapedDetails|null>( null );
	const navigate = useNavigate()

	useEffect( () =>
	{
		if( loading )
		{
			return;
		}
		const encryptedUrl = window.location.search.split( '=' )[1];
		const decryptedUrl = Encrypter.decrypt( encryptedUrl );
		setDecryptedUrl( decryptedUrl );

		setLoading( true );
		get<IScrapedDetails>( "http://localhost:3030/toku/get-details?detailUrl=" + decryptedUrl )
			.then( data =>
			{
				setData( data.body );
				document.title = `Kamen Watcher - ${data.body.title}`;
				setLoading( false );
			} ).catch( error =>
		{
			setError( error );
			setLoading( false );
		} );
	}, [] );

	const createFilledArray = ( length: number ) => Array.from( {length}, ( _, index ) => index + 1 );

	const getUrlForVideo = ( episode: number ) =>
	{
		get<DataResponse<string>>( "http://localhost:3030/toku/get-episode?episodeUrl=" + `${decryptedUrl}?ep=${episode}` )
			.then( data =>
			{
				window.open( data.body.Data, "_blanc" );
			} );
	}

	return (
		<section className={"px-4 pt-3 flex flex-col min-h-full"}>
			{loading && <Spinner/>}
			{!loading && error && !data && <ErrorComponent errorMessage={error.message}/>}


			{!loading && data && (
				<>
					<div className="flex items-center justify-start mb-3" onClick={() => navigate( "/" )}>
						<FaChevronLeft className={"translate-y-[-1px]"}/>
						<span className={"text-[13px] ms-3 inline-block"}>Go Back</span>
					</div>
					<h1 className={"text-2xl font-bold mb-10"}>{data.title}</h1>

					{data && data.imagesSources.map( ( image, index ) =>
						<img src={image} alt={`${data.title}-${index}`} className={"mb-10"}/> )}

					<p className={"text-sm"}>{data.description}</p>
					{data.episodesCount > 0 && <p className={"mt-2"}>Episode Count: {data.episodesCount}</p>}

					<ul className={"mt-5 flex flex-col gap-5"}>
						{createFilledArray( data.episodesCount ).map( ( _, index ) =>
							<li onClick={() => getUrlForVideo( index + 1 )} key={index} className={"text-sm py-5 px-2 w-full bg-[#cf1c2f] rounded text-white transition hover:opacity-75"}>
								Episode {index + 1}
							</li>
						)}
					</ul>
				</>
			)}
		</section>
	);
};

const ErrorComponent: React.FC<{errorMessage: string}> = ( props ) =>
{
	const navigate = useNavigate()

	return (
		<div id='error' className={"flex flex-col items-center mt-5"}>
			<p className={"text-center"}>Oh no! It looks like our Rider couldn't find the page you're looking for.</p>
			<img src={ichigoError as string} alt={"kamen rider ichigo error"}/>
			<p className={"leading-1 text-center"}>But don't worry, our hero is always ready to help you find your way back!</p>
			<p className={"text-[#cf1c2f] mt-5"}>{props.errorMessage}</p>
			<button className={"mt-5 py-3 flex items-center justify-center bg-[#cf1c2f] w-full text-white rounded-lg transition hover:opacity-75"} onClick={() => navigate( -1 )}>
				Return to the safety of the homepage.
			</button>
		</div>
	)
}

export default Details;
