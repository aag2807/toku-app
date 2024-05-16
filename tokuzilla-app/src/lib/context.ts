import {IncomingMessage, ServerResponse} from "node:http";

export class Context<T = any> {
	public request: IncomingMessage;
	public response: ServerResponse;
	public params: Record<string, string>;
	public body?: T;

	constructor( request: IncomingMessage, response: ServerResponse, params: Record<string, string> )
	{
		this.request = request;
		this.response = response;
		this.params = params;
	}

	public getParam( key: string ): any
	{
		return this.params[key] || null;
	}
}
