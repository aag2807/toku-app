import {useEffect} from "react";

export const useSetDocumentTitle = ( title: string ): void =>
{
	useEffect( () =>
	{
		document.title = title;
	}, [] );
}
