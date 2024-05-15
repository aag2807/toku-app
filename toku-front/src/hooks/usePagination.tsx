import {useState} from 'react';

export const usePagination = ( initialPage: number = 1 ): [number, () => void] =>
{
	const [page, setPage] = useState( initialPage );

	const nextPage = (): void =>
	{
		setPage( prevPage => prevPage + 1 );
	};

	return [page, nextPage];
};
