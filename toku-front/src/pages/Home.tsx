import React, {useEffect} from 'react';
import {useSetDocumentTitle} from "../hooks/useSetDocumentTitle.tsx";
import Navbar from "../components/Navbar.tsx";
import TextInput from "../components/TextInput.tsx";
import {IScrapedCard} from "../utils/scraped-card.interface.ts";
import {useCache} from "../hooks/useCache.tsx";
import {ONE_MINUTE} from "../utils/constants.ts";
import CategoryList from "../components/CategoryList.tsx";
import {usePagination} from "../hooks/usePagination.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {Encrypter} from "../utils/encrypter.util.ts";

const dummy_data: IScrapedCard[] = [
	{
		"title": "Kamen Rider Outsiders",
		"cardLink": "https://tokuzl.net/kamen-rider-outsiders.html"
	},
	{
		"title": "Kamen Rider Gotchard",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2023/12/kamen-rider-gotchard.png",
		"cardLink": "https://tokuzl.net/kamen-rider-gotchard.html"
	},
	{
		"title": "Bakuage Sentai Boonboomger",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/02/bakuage-sentai-boonboomger.png",
		"cardLink": "https://tokuzl.net/bakuage-sentai-boonboomger.html"
	},
	{
		"title": "Kamen Rider Gotchard – Hyper Battle DVD",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/05/kamen-rider-gotchard-hyper-battle-dvd.png",
		"cardLink": "https://tokuzl.net/kamen-rider-gotchard-hyper-battle-dvd.html"
	},
	{
		"title": "Kamen Rider Gotchard Spin-Off: We Are Class 3G",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/04/kamen-rider-gotchard-spin-off-we-are-class-3g.png",
		"cardLink": "https://tokuzl.net/kamen-rider-gotchard-spin-off-we-are-class-3g.html"
	},
	{
		"title": "Kamen Rider The Winter Movie: Gotchard & Geats",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/04/kamen-rider-the-winter-movie-gotchard-geats.png",
		"cardLink": "https://tokuzl.net/kamen-rider-the-winter-movie-gotchard-geats.html"
	},
	{
		"title": "Zyuden Sentai Kyoryuger Final Live Tour",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/04/zyuden-sentai-kyoryuger-final-live-tour.png",
		"cardLink": "https://tokuzl.net/zyuden-sentai-kyoryuger-final-live-tour.html"
	},
	{
		"title": "Megaloman",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2023/12/megaloman.png",
		"cardLink": "https://tokuzl.net/megaloman.html"
	},
	{
		"title": "Avataro Sentai Donbrothers Final Live Tour",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/04/avataro-sentai-donbrothers-final-live-tour.png",
		"cardLink": "https://tokuzl.net/avataro-sentai-donbrothers-final-live-tour.html"
	},
	{
		"title": "Lion Maru G",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/04/lion-maru-g.png",
		"cardLink": "https://tokuzl.net/lion-maru-g.html"
	},
	{
		"title": "Fuun Lion Maru",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/04/fuun-lion-maru.png",
		"cardLink": "https://tokuzl.net/fuun-lion-maru.html"
	},
	{
		"title": "GARO: Heir to Steel Armor",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/01/garo-heir-to-steel-armor.png",
		"cardLink": "https://tokuzl.net/garo-heir-to-steel-armor.html"
	},
	{
		"title": "Kamen Rider Geats Extra: Kamen Rider Gazer",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/04/kamen-rider-geats-extra-kamen-rider-gazer.png",
		"cardLink": "https://tokuzl.net/kamen-rider-geats-extra-kamen-rider-gazer.html"
	},
	{
		"title": "Kamen Rider Geats: Jyamato Awaking",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/04/kamen-rider-geats-jyamato-awaking.png",
		"cardLink": "https://tokuzl.net/kamen-rider-geats-jyamato-awaking.html"
	},
	{
		"title": "Kaiketsu Lion Maru",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2023/12/kaiketsu-lion-maru-thumb.png",
		"cardLink": "https://tokuzl.net/lion-maru.html"
	},
	{
		"title": "Yongary, Monster from the Deep",
		"imgSrc": "https://tokuzl.net/wp-content/uploads/2024/03/yongary-monster-from-the-deep.png",
		"cardLink": "https://tokuzl.net/yongary-monster-from-the-deep.html"
	}
];

export const Home: React.FC = () =>
{
	useSetDocumentTitle( "Kamen Watcher - Home" );
	const [data, setCache, _] = useCache( 'series-data', ONE_MINUTE * 3 );
	const [page, nextPage] = usePagination();
	const navigate: NavigateFunction = useNavigate();

	useEffect( () =>
	{
		if( !data )
		{
		}
	}, [data, setCache] );

	const handleScroll = () =>
	{
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
		const fetchPaginatedData = async() =>
		{
		};

		(async() =>
		{
			await fetchPaginatedData();
		})();
	}, [page] );

	const goToDetails = ( cardLink: string ) =>
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
					<button className="text-[14px] font-light text-[#5D0D15]">View All</button>
				</div>

				<CategoryList/>
			</div>

			<div className="flex flex-col w-full gap-5 mt-10">
				{dummy_data && dummy_data.map( ( element: IScrapedCard ) =>
				{
					return (
						<div key={element.title} className="p-4 border border-gray-100 min-h-[200px] rounded transition cursor-pointer hover:opacity-75 flex items-center justify-center flex-col">
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
			</div>

		</section>
	)
}
