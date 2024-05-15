type TApiResponse<T> = {statusCode: number, body: T}

export function post<T = any, K = any>( url: string, data: T ): Promise<TApiResponse<K>>
{
	return fetch( url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( data )
	} ).then( ( response ) => response.json() )
}

export function get<T = any>( url: string ): Promise<TApiResponse<T>>
{
	return fetch( url ).then( ( response ) => response.json() )
}

export function put<T = any, K = any>( url: string, data: T ): Promise<TApiResponse<K>>
{
	return fetch( url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( data )
	} ).then( ( response ) => response.json() )
}

export function del<T = any>( url: string ): Promise<TApiResponse<T>>
{
	return fetch( url, {
		method: 'DELETE'
	} ).then( ( response ) => response.json() )
}
