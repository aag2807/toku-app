import {create} from "zustand";

interface IGlobalStore {
	isLoading: boolean,

	setIsLoadingTo( value: boolean ): void,
}

export const useGlobalStore = create<IGlobalStore>( ( set ) => ({
		isLoading: false,
		setIsLoadingTo: ( value: boolean ) =>
		{
			set( state => ({...state, isLoading: value}) );
		}
	})
);

