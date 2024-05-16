import React from 'react';
import {RiHome2Line, RiUser3Line, RiMovie2Line, RiPlayCircleLine} from "react-icons/ri";
import {NavLink} from "react-router-dom";

const NavigationBottomBar: React.FC = () =>
{
	return (
		<nav className="w-full border min-h-[75px] bg-white shadow-sm flex items-center fixed bottom-0">
			<NavLink
				to="/"
				className={( {isActive} ) => (isActive ? 'text-red-600 block mx-auto transition' : 'block mx-auto transition')}
			>
				<RiHome2Line className="text-2xl mx-auto"/>
			</NavLink>
			<NavLink
				to="/movies"
				className={( {isActive} ) => (isActive ? 'text-red-600 block mx-auto transition' : 'block mx-auto transition')}
			>
				<RiMovie2Line className="text-2xl mx-auto"/>
			</NavLink>
			<NavLink
				to="/series"
				className={( {isActive} ) => (isActive ? 'text-red-600 block mx-auto transition' : 'block mx-auto transition')}
			>
				<RiPlayCircleLine className="text-2xl mx-auto"/>
			</NavLink>
			<NavLink
				to="/about"
				className={( {isActive} ) => (isActive ? 'text-red-600 block mx-auto transition' : 'block mx-auto transition')}
			>
				<RiUser3Line className="text-2xl mx-auto"/>
			</NavLink>
		</nav>
	);
};

export default NavigationBottomBar;
