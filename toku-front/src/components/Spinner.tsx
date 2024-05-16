import React from 'react';
import iconCenter from '../assets/ichigo-icon.png';

const Spinner: React.FC = () =>
{
	return (
		<>
			<div className={"flex items-center justify-center relative"}>
				<div className="border-[#6ba988] h-[100px] w-[100px] animate-spin rounded-full border-8 border-t-[#cf1c2f]">
				</div>

				<img className={"h-[100px] w-[100px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"} src={iconCenter as string} alt="spinner image"/>
			</div>
			<p className={"text-center mt-4"}>Rider kick in progress!</p>
		</>
	);
};

export default Spinner;
