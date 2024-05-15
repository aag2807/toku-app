import {BaseController} from "./base-controller";
import {App} from "../lib/app";
import {TokusatsuService} from "../service/tokusatsu-service";

export class TokuController extends BaseController {
	private readonly ROUTE_PREFIX: Readonly<string> = '/toku';

	private readonly service: TokusatsuService = new TokusatsuService();

	public override registerRoutes( app: App ): void
	{
		app.get( "/", async( ctx ) =>
		{
			return this.Ok( "Welcome to Tokuzilla API" );
		} );

		app.get( this.ROUTE_PREFIX, async( ctx ) =>
		{
			const page = ctx.getParam( 'page' ) || 1;
			const scrapedData = await this.service.scrapePageData( page );

			return this.Ok( scrapedData );
		} );

		app.get( `${this.ROUTE_PREFIX}/get-details`, async( ctx ) =>
		{
			const url = ctx.getParam( 'detailUrl' );
			const scrapedData = await this.service.getScrapedDetails( url );

			return this.Ok( scrapedData );
		} )
	}
}
