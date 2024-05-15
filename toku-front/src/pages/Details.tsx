import React, {useEffect, useState} from 'react';
import {IScrapedDetails} from "../utils/scraped-details.interface.ts";
import {Encrypter} from "../utils/encrypter.util.ts";

const Details: React.FC = () =>
{
	const [originUrl, setOriginUrl] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const [data, setData] = useState<IScrapedDetails | null>(null);

	useEffect( () =>
	{
		const encryptedUrl = window.location.search.split( '=' )[1];
		const decryptedUrl = Encrypter.decrypt( encryptedUrl );
		setOriginUrl( decryptedUrl );
	}, [] );

	return (
		<section className={"px-4 pt-3 flex flex-col"}>
			{loading && <p id={"loading"}>Loading...</p>}
			{!loading && error && <p id={"error"}>Error: {error.message}</p>}

			{!loading && data && (
				<>
					<h1 className={"text-2xl font-bold"}>{data.title}</h1>
					<p className={"text-sm"}>{data.description}</p>
				</>
			)}
		</section>
	);
};

export default Details;
