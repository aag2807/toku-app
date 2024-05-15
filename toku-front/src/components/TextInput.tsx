import React from 'react';
import { CiSearch } from "react-icons/ci";

type TextInputProps = {
 placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = ( props ) =>
{
	const [value, setValue] = React.useState<string>( "" );

	return (
		<div className={"w-full min-h-[40px] relative"}>
			<CiSearch className="top-[50%] left-[15px] translate-y-[-50%] absolute" size={18} />
			<input placeholder={props?.placeholder} className="min-h-[40px] w-full h-full bg-[#f5f5f5] indent-[38px] pr-[20px] outline-0 focus:outline-0 text-[13px] rounded-[20px]" type="text" value={value} onChange={( e ) => setValue( e.target.value )}/>
		</div>
	);
};

export default TextInput;
