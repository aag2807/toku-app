import React from 'react';
import Navbar from "../components/Navbar.tsx";
import notfound from '../assets/404-kamen-rider.png';
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useSetDocumentTitle} from "../hooks/useSetDocumentTitle.tsx";

const NotFound: React.FC = () =>
{
	useSetDocumentTitle("404 - Not Found");
	const navigate: NavigateFunction = useNavigate();

	return (
		<section className={"px-4 pt-3"}>
			<Navbar/>
			<div className="flex items-center justify-center flex-col gap-5">
				<img src={notfound} alt=""/>
				<h1 className={"text-4xl font-light text-center"}>404</h1>
				<p className={"text-center"}>Looks like this page went on an adventure of its own!</p>

				<button className={"w-full flex items-center justify-center bg-[#8c151b] hover:bg-[#861844] transition text-white rounded-md py-4 text-lg"} onClick={() => navigate( '/' )}>
					Ride back home!
				</button>
			</div>
		</section>
	);
};

export default NotFound;
