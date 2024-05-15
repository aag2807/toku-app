import {Context} from "./context";
import * as http from "node:http";
import {BaseController} from "../controller/base-controller";

type ResponseFunction = ( ctx: Context ) => Promise<any>|any;

interface RouteHandler {
	regex: RegExp;
	handler: ResponseFunction;
}

export type Routes = {
	'GET': RouteHandler[],
	'POST': RouteHandler[],
	'PUT': RouteHandler[],
	'DELETE': RouteHandler[],
};

const INITIAL_ROUTE_VALUES: Routes = {
	'GET': [],
	'POST': [],
	'PUT': [],
	'DELETE': [],
};

function routeToRegExp( route: string ): RegExp
{
	const paramRegex = /:([a-zA-Z]+)/g;
	const regexRoute = route.replace( paramRegex, ( match, p1 ) => `(?<${p1}>[^/]+)` );
	return new RegExp( `^${regexRoute}$` );
}

export class App {
	private static routes: Routes = INITIAL_ROUTE_VALUES;

	public async fetch( request: http.IncomingMessage, response: http.ServerResponse ): Promise<any>
	{
		response.setHeader( 'Access-Control-Allow-Origin', '*' );

		const parsedUrl = new URL( request.url!, `http://${request.headers.host}` );
		const path: string = parsedUrl.pathname!;
		const method: 'GET'|'POST'|'PUT'|'DELETE' = request.method! as any;
		const queryParams = Object.fromEntries( parsedUrl.searchParams.entries() );

		for( const route of App.routes[method] )
		{
			const match = route.regex.exec( path );
			if( match )
			{
				const params = {...queryParams, ...match.groups};
				const ctx = new Context( path, method, params, null );
				const result = await route.handler( ctx );

				response.writeHead( result.statusCode, {"Content-Type": 'Application/json'} );
				return response.end( JSON.stringify( result ) );
			}
		}

		response.writeHead( 404, {"Content-Type": "application/json"} );
		return response.end( JSON.stringify( {message: "Resource not found"} ) );
	}

	public get( path: string, callback: ResponseFunction )
	{
		this.registerRoute( 'GET', path, callback );
	}

	public post( path: string, callback: ResponseFunction )
	{
		this.registerRoute( 'POST', path, callback );
	}

	public put( path: string, callback: ResponseFunction )
	{
		this.registerRoute( 'PUT', path, callback );
	}

	public delete( path: string, callback: ResponseFunction )
	{
		this.registerRoute( 'DELETE', path, callback );
	}

	private registerRoute( method: 'GET'|'POST'|'PUT'|'DELETE', path: string, callback: ResponseFunction )
	{
		const regex = routeToRegExp( path );
		App.routes[method].push( {regex, handler: callback} );
	}

	public registerControllers( ...controllers: BaseController[] )
	{
		controllers.forEach( controller =>
		{
			controller.registerRoutes( this );
		} );
	}
}
