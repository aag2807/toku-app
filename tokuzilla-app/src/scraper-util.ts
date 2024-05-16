import * as cheerio from 'cheerio'
import {IScrapedCard} from "./core/interfaces/scraped-card.interface";
import {IScrapedDetails} from "./core/interfaces/scraped-details.interface";

export class ScraperUtil {

	private static getImageSourcesFromDetails( $: cheerio.CheerioAPI ): string[]
	{
		const images = $( 'img' );

		const validImages = images.filter( ( index, el ) => {
			return !!el.attribs['data-src']
		} )
		.filter( ( index, el ) =>
		{
			const src = el.attributes.find( attr => attr.name == "data-src" )?.value!
			return !src.includes( "logo-tokuzl" )
		} )

		return validImages.map( ( index, el ) =>
		{
			return el.attributes.find( attr => attr.name == "data-src" )?.value!
		} ).get();
	}

	public async scrapePage( url: string ): Promise<IScrapedCard[]>
	{
		const response = await fetch( url );
		const html = await response.text();
		const $ = cheerio.load( html );

		return this.extractPostsToSelect( $ );
	}

	public async scrapeDetailPage( url: string ): Promise<IScrapedDetails>
	{
		const response = await fetch( url );
		const html = await response.text();
		const $ = cheerio.load( html );

		return this.extractDetailPage( $ );
	}

	private extractPostsToSelect( $: cheerio.CheerioAPI ): IScrapedCard[]
	{
		const posts = $( '.post' )!
		const scrapedPosts: IScrapedCard[] = [];
		posts.each( ( index, element ) =>
		{
			const title = $( element ).find( 'h3' ).text();
			const image = $( element ).find( 'a' )!;
			const imgSrc = image.find( 'img' ).attr( 'data-src' )!;
			const cardLink = image.attr( 'href' )!;

			const scrapedCard: IScrapedCard = {title, imgSrc, cardLink};
			scrapedPosts.push( scrapedCard );
		} );

		return scrapedPosts;
	}

	private extractDetailPage( $: cheerio.CheerioAPI ): IScrapedDetails
	{
		const title = $( '#watch' ).text();
		const postDetails = $( '.post-entry' );
		const description = postDetails.find( 'p' ).text();
		const strippedDescription = this.stripHTML( description );
		const videoPlayerData = $( '.player iframe' );

		const urls: string[] = [];
		videoPlayerData.each( ( index, element ) =>
		{
			const src = element.attribs.src;
			urls.push( src );
		} );

		const imageSources = ScraperUtil.getImageSourcesFromDetails( $ );
		const amountOfEpisodes = $( '.pagination' ).find( 'a' ).length;

		return {
			title,
			description: strippedDescription,
			videoUrls: urls,
			imagesSources: imageSources.slice(1),
			episodesCount: amountOfEpisodes
		};
	}

	public async scrapeEpisode( url: string ): Promise<string>
	{
		const response = await fetch( url );
		const html = await response.text();
		const $ = cheerio.load( html );

		const videoPlayerData = $( '.player iframe' );

		let src = "";
		videoPlayerData.each( ( index, element ) =>{
			 src = element.attribs.src;
		});

		return src;
	}

	private stripHTML( html: string ): string
	{
		return html.replace( /<[^>]*>?/gm, '' );
	}
}
