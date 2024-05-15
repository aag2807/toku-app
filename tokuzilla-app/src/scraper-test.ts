import {ScraperUtil} from "./scraper-util";

const scraper = new ScraperUtil();
scraper.scrapePage( 'https://tokuzl.net/' ).then( ( data ) =>{
	const kamenRiderGotchardDetails = data[1];
	console.log( kamenRiderGotchardDetails );

	scraper.scrapeDetailPage( kamenRiderGotchardDetails.cardLink ).then( ( details ) =>{
		console.log(details)
	})
})
