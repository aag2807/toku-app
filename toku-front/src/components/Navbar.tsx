import React from 'react';
import icon from '../assets/kamen-rider-logo-no-letters.png';

const Navbar: React.FC = () =>
{
	return (
		<nav className={'w-full min-h-[50px] flex items-center bg-transparent mt-5 px-4'}>
			<p className={"text-2xl"}><span className={"text-[#cf1c2f]"}>Kamen</span> Watcher</p>
			<div className="rounded-full max-h-[50px] max-w-[50px] overflow-hidden ms-auto">
				<img src={icon as string} alt=""/>
			</div>
		</nav>
	);
};

export default Navbar;
