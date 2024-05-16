import React from 'react';
import {SnapItem, SnapList} from "react-snaplist-carousel";


type TCategory = {
	value: string;
	label: string;
	isSelected: boolean;
}

const categories = [
	{
		value: "https://tokuzl.net/",
		label: "All",
		isSelected: true
	},
	{
		value: "https://tokuzl.net/kamen-rider",
		label: "Kamen Rider",
		isSelected: false
	},
	{
		value: "https://tokuzl.net/super-sentai",
		label: "Super Sentai",
		isSelected: false
	},
	{
		value: "https://tokuzl.net/metal-heroes",
		label: "Metal Heroes",
		isSelected: false
	},
	{
		value: "https://tokuzl.net/ultraman",
		label: "Ultraman",
		isSelected: false
	},
	{
		value: "https://tokuzl.net/armor-hero",
		label: "Armor Hero",
		isSelected: false
	},
	{
		value: "https://tokuzl.net/power-ranger",
		label: "Power Ranger",
		isSelected: false
	},
	{
		value: "https://tokuzl.net/godzilla",
		label: "Godzilla",
		isSelected: false
	},
	{
		value: "https://tokuzl.net/garo",
		label: "Garo",
		isSelected: false
	}
]


interface ICategoryListProps {
	onCategoryChange: ( categoryValue: string ) => void;
}

const CategoryList: React.FC<ICategoryListProps> = ( props ) =>
{
	const [categoryList, setCategoryList] = React.useState<TCategory[]>( categories );

	const handleCategoryChange = ( categoryValue: string ) =>
	{
		const newCategoryList = categoryList.map( ( category ) =>
		{
			category.isSelected = category.value === categoryValue;
			return category;
		} );

		props.onCategoryChange( categoryValue );
		setCategoryList( newCategoryList );
	}

	return (
		<div id={"category-list-slider"} className="flex flex-row">
			<SnapList direction={'horizontal'}>
				{categories.map( ( category, index ) => (
					<React.Fragment key={category.label}>
						<SnapItem snapAlign={"start"} margin={{left: '8px', right: '8px'}}>
							<div className={`w-[120px] h-[30px] rounded-full text-[14px] bg-gray-100 flex items-center justify-center transition ${category.isSelected ? "bg-gray-300" : ""}`} onClick={() => handleCategoryChange( category.value )}>
								{category.label}
							</div>
						</SnapItem>
					</React.Fragment>
				) )}
			</SnapList>
		</div>
	);
};

export default CategoryList;
