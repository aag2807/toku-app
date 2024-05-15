import React from 'react';
import { RiMenu5Fill } from "react-icons/ri";
import icon from '../assets/kamen-rider-logo-no-letters.png';

const Navbar: React.FC = () =>
{
	return (
		<nav className={'w-full min-h-[50px] flex items-center bg-transparent mb-5'}>
			<RiMenu5Fill size={20}  className={"transition hover:opacity-75 cursor-pointer"}/>

			<div className="rounded-full max-h-[50px] max-w-[50px] overflow-hidden ms-auto">
				<img src={icon} alt=""/>
			</div>
		</nav>
	);
};

export default Navbar;
