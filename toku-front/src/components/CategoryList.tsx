import React from 'react';
import {SnapItem, SnapList} from "react-snaplist-carousel";

const CategoryList: React.FC = () =>
{
	return (
		<div id={"category-list-slider"} className="flex flex-row">
			<SnapList direction={'horizontal'}>
				<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
					<div className="w-[100px] h-[30px] rounded-full text-[14px] bg-gray-100 flex items-center justify-center">
						Category
					</div>
				</SnapItem>

				<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
					<div className="w-[100px] h-[30px] rounded-full text-[14px] bg-gray-100 flex items-center justify-center">
						Category
					</div>
				</SnapItem>

				<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
					<div className="w-[100px] h-[30px] rounded-full text-[14px] bg-gray-100 flex items-center justify-center">
						Category
					</div>
				</SnapItem>

				<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
					<div className="w-[100px] h-[30px] rounded-full text-[14px] bg-gray-100 flex items-center justify-center">
						Category
					</div>
				</SnapItem>

				<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
					<div className="w-[100px] h-[30px] rounded-full text-[14px] bg-gray-100 flex items-center justify-center">
						Category
					</div>
				</SnapItem>

				<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
					<div className="w-[100px] h-[30px] rounded-full text-[14px] bg-gray-100 flex items-center justify-center">
						Category
					</div>
				</SnapItem>

				<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
					<div className="w-[100px] h-[30px] rounded-full text-[14px] bg-gray-100 flex items-center justify-center">
						Category
					</div>
				</SnapItem>

				<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
					<div className="w-[100px] h-[30px] rounded-full text-[14px] bg-gray-100 flex items-center justify-center">
						Category
					</div>
				</SnapItem>

				<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
					<div className="w-[100px] h-[30px] rounded-full text-[14px] bg-gray-100 flex items-center justify-center">
						Category
					</div>
				</SnapItem>
			</SnapList>
		</div>

	);
};

export default CategoryList;
