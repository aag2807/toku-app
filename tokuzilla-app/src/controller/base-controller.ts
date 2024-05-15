import {App} from "../lib/app";

export abstract class BaseController {
	protected Ok<T>( body: T )
	{
		return {statusCode: 200, body};
	}

	protected Created<T>( body: T )
	{
		return {statusCode: 201, body};
	}

	protected NoContent()
	{
		return {statusCode: 204};
	}

	protected BadRequest<T>( body: T )
	{
		return {statusCode: 400, body};
	}

	protected Unauthorized<T>( body: T )
	{
		return {statusCode: 401, body};
	}

	protected Conflict<T>( body: T )
	{
		return {statusCode: 409, body};
	}

	public abstract registerRoutes( app: App  ): void;
}
