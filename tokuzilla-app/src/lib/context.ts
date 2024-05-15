import * as http from "node:http";

type Nullable<T> = T|null;

export class Context<T = any> {
	constructor(
		public path: string,
		public method: string,
		public params: Record<string, string>,
		public body?: Nullable<T>,
		public headers: http.IncomingHttpHeaders = {}
	)
	{
	}

	public getParam( key: string ): any
	{
		return this.params[key] || null;
	}
}
