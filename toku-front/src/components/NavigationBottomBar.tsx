import React from 'react';
import {RiHome2Line, RiUser3Line, RiMovie2Line, RiPlayCircleLine} from "react-icons/ri";
import {NavLink} from "react-router-dom";

const NavigationBottomBar: React.FC = () =>
{
	return (
		<nav className={"w-full border min-h-[75px] bg-white shadow-sm flex items-center fixed bottom-0"}>
			<NavLink to={"/"} className={isActive => isActive ? "text-red-600  block mx-auto" : " block mx-auto"}>
				<RiHome2Line className={"text-2xl mx-auto"}/>
			</NavLink>
			<NavLink to={"/"} className={isActive => isActive ? "text-red-600  block mx-auto" : " block mx-auto"}>
				<RiMovie2Line className={"text-2xl mx-auto"}/>
			</NavLink>
			<NavLink to={"/"} className={isActive => isActive ? "text-red-600  block mx-auto" : " block mx-auto"}>
				<RiPlayCircleLine className={"text-2xl mx-auto"}/>
			</NavLink>
			<NavLink to={"/"} className={isActive => isActive ? "text-red-600  block mx-auto" : " block mx-auto"}>
				<RiUser3Line className={"text-2xl mx-auto"}/>
			</NavLink>

		</nav>
	);
};

export default NavigationBottomBar;
