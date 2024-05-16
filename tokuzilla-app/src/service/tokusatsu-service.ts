import {ScraperUtil} from "../scraper-util";

export class TokusatsuService
{
	private readonly SITE_URL: Readonly<string> = "https://tokuzl.net/";
	private readonly scrapper: Readonly<ScraperUtil> = new ScraperUtil(  );

	public async scrapePageData( page: number )
	{
		let url = this.SITE_URL;
		if(page > 1 )
		{
			url = `${this.SITE_URL}/page/${page}`;
		}

		return await this.scrapper.scrapePage( url );
	}

	public async getScrapedDetails( url: string )
	{
		return await this.scrapper.scrapeDetailPage( url );
	}

	public async getEpisodeFromUrl( url:string )
	{
		return await this.scrapper.scrapeEpisode( url );
	}
}
