import * as http from "node:http";
import {BaseController} from "../controller/base-controller";
import {Context} from "./context";
import {bodyParser} from "../middleware/body-parser.middleware";
import {corsMiddleware} from "../middleware/cors.middleware";
import {GLOBAL_CACHE} from "../middleware/in-memory-cache.middleware";

type ResponseFunction = ( ctx: Context ) => Promise<any>|any;

interface Middleware {
	( ctx: Context, next: () => Promise<void> ): Promise<void>;
}

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
	private middlewares: Middleware[] = [];

	constructor()
	{
		this.use( bodyParser );
		this.use( corsMiddleware );

		// needed in order to maintain the correct context
		this.fetch = this.fetch.bind( this );
		this.runMiddlewares = this.runMiddlewares.bind( this );
	}

	public use( middleware: Middleware ): void
	{
		this.middlewares.push( middleware );
	}

	public async fetch( request: http.IncomingMessage, response: http.ServerResponse ): Promise<void>
	{
		const parsedUrl = new URL( request.url!, `http://${request.headers.host}` );
		const path = parsedUrl.pathname;
		const method = request.method as 'GET'|'POST'|'PUT'|'DELETE';
		const queryParams = Object.fromEntries( parsedUrl.searchParams.entries() );

		const methodIsGET = method == "GET";

		for( const route of App.routes[method] )
		{
			const match = route.regex.exec( path );
			if( methodIsGET && match )
			{
				if( GLOBAL_CACHE.get( request.url! ) )
				{
					const cachedData = GLOBAL_CACHE.get( request.url! );
					response.writeHead( cachedData.statusCode, {"Content-Type": "application/json"} );
					response.end( JSON.stringify( cachedData ) );
					return;
				}
				const params = {...queryParams, ...match.groups};
				const ctx = new Context( request, response, params );
				const result = await this.runMiddlewares( ctx, route.handler );
				response.writeHead( result.statusCode, {"Content-Type": "application/json"} );
				response.end( JSON.stringify( result ) );

				if( methodIsGET && [200, 204, 202].includes( result.statusCode ) && !GLOBAL_CACHE.get( ctx.request.url! ) )
				{
					console.log('caching response')
					GLOBAL_CACHE.set( ctx.request.url!, result );
				}
				return;
			}
		}

		response.writeHead( 404, {"Content-Type": "application/json"} );
		response.end( JSON.stringify( {message: "Resource not found"} ) );
	}

	public registerRoute( method: 'GET'|'POST'|'PUT'|'DELETE', path: string, callback: ResponseFunction )
	{
		const regex = routeToRegExp( path );
		App.routes[method].push( {regex, handler: callback} );
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

	public registerControllers( ...controllers: BaseController[] )
	{
		controllers.forEach( controller =>
		{
			controller.registerRoutes( this );
		} );
	}

	private async runMiddlewares( ctx: Context, handler: ResponseFunction ): Promise<any>
	{
		let index = 0;
		let lastResult: any;
		const next = async(): Promise<void> =>
		{
			if( index < this.middlewares.length )
			{
				const currentMiddleware = this.middlewares[index++];
				await currentMiddleware( ctx, next );
			}
			else
			{
				lastResult = await handler( ctx );
			}
		};
		await next();

		return lastResult;
	}
}




