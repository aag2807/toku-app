import React, {useEffect, useState} from 'react';
import {useSetDocumentTitle} from "../hooks/useSetDocumentTitle.tsx";
import TextInput from "../components/TextInput.tsx";
import {IScrapedCard} from "../utils/scraped-card.interface.ts";
import CategoryList from "../components/CategoryList.tsx";
import {usePagination} from "../hooks/usePagination.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Encrypter} from "../utils/encrypter.util.ts";
import {get} from "../utils/actions.ts";
import Spinner from "../components/Spinner.tsx";

export const Home: React.FC = () =>
{
	useSetDocumentTitle( "Kamen Watcher - Home" );

	const [isLoading, setIsLoading] = useState<boolean>( false );
	const [data, setData] = React.useState<IScrapedCard[]>( [] );
	const [page, nextPage] = usePagination();
	const navigate: NavigateFunction = useNavigate();

	useEffect( () =>
	{
		if( !data.length )
		{
			setIsLoading( true );
			get<IScrapedCard[]>( `http://localhost:3030/toku?page=${page}` ).then( ( response ) =>
			{
				setData( response.body );
				setIsLoading( false );
			} );
		}
	}, [] );

	const handleScroll = (): void =>
	{
		if( isLoading )
		{
			return;
		}

		if( window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight )
		{
			return;
		}

		nextPage();
	};

	useEffect( () =>
	{
		window.addEventListener( 'scroll', handleScroll );
		return () =>
		{
			window.removeEventListener( 'scroll', handleScroll );
		};
	}, [] );


	useEffect( () =>
	{
		const fetchPaginatedData = async(): Promise<void> =>
		{
			setIsLoading( true );
			get<IScrapedCard[]>( `http://localhost:3030/toku?page=${page}` ).then( ( response ) =>
			{
				setIsLoading( false );
			} );
		};

		(async(): Promise<void> =>
		{
			await fetchPaginatedData();
		})();
	}, [page] );

	const goToDetails = ( cardLink: string ): void =>
	{
		const encryptedLink = Encrypter.encrypt( cardLink );
		navigate( `/details?originUrl=${encryptedLink}` );
	}

	return (
		<section className={"px-4 pt-3"}>
			<h1 className={"text-2xl font-light text-left"}>Welcome Rider.</h1>
			<p className="leading text-gray-500 font-light text-[14px]">Watch your favorite Tokusatsu shows here!</p>

			<div className="my-5">
				<TextInput placeholder="Search for Tokusatsu..."/>
			</div>

			<div className="flex flex-col">
				<div className="flex flex-row w-full mb-3">
					<h2 className="text-lg font-light ">Categories</h2>
					<div className="flex-grow"></div>
				</div>

				<CategoryList onCategoryChange={( value ) => console.log( value )}/>
			</div>

			<div className="flex flex-col w-full gap-5 mt-10">
				{data.length > 0 && data.map( ( element: IScrapedCard, index ) =>
				{
					return (
						<div key={`${element.title}-${index}`} className="p-4 border border-gray-100 min-h-[200px] rounded transition cursor-pointer hover:opacity-75 flex items-center justify-center flex-col">
							<h3 className={"text-md mb-3 w-full"}>{element.title}</h3>

							{element.imgSrc &&
                                <img onClick={() => goToDetails( element.cardLink! )} src={element.imgSrc} alt=""/>}
							{!element.imgSrc &&
                                <div className={"w-[324px] h-[169px] bg-slate-700 flex items-center justify-center text-white"}>N/A</div>}

							<button className="justify-end mt-auto flex flex-row w-full transition hover:scale-[0.95]">
								<p onClick={() => goToDetails( element.cardLink! )} className={"pt-4"}>
									Watch
								</p>
							</button>
						</div>
					);
				} )}

				{isLoading && <div className={"mt-10"}><Spinner/></div>}
			</div>

		</section>
	)
}
