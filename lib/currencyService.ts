export interface UserRegionConfig {
	currencyCode: string;
	currencySymbol: string;
	countryName: string;
}

export async function detectUserRegion(): Promise<UserRegionConfig> {
	const DEFAULT_CONFIG: UserRegionConfig = { currencyCode: 'NGN', currencySymbol: '₦', countryName: 'Nigeria'}

	try {
		const response = await fetch('/api/geo');
		const contentType = response.headers.get('content-type');
		if(!response.ok || !contentType || !contentType.includes("application/json")) {
			console.warn("Geolocation API did not return valid JSON. Using default profile.");
			return DEFAULT_CONFIG;
		}

		const data = await response.json();

		if(!data.currency) return DEFAULT_CONFIG;

		const primaryLocale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';

		let symbol = '$';

		try {
		symbol = (0).toLocaleString(primaryLocale, {
			style: 'currency',
			currency: data.currency,
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).replace(/\d/g, '').trim();

		}catch (e){
			console.error("Failed calculating standard currency typography map symbol format", e)
		}


		return {
			currencyCode: data.currency,
			currencySymbol: symbol || '$',
			countryName: data.country_name || 'Nigeria'
		};
	}catch(error){
		console.error("Failed parsing geolocation metadata", error);
		return DEFAULT_CONFIG;
	}
}

//Fetches real-time exchange rates relative to your base currency
export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number>{
	if (fromCurrency === toCurrency) return 1;

	const cacheKey = `fx_rate_${fromCurrency}_to_${toCurrency}`;
	const cachedTimeKey = `${cacheKey}_timestamp`;
	const isBrowser = typeof window !== 'undefined';
	const now = Date.now();

	if (isBrowser) {
		const cachedRate = sessionStorage.getItem(cacheKey);
		const cachedTime = sessionStorage.getItem(cachedTimeKey);

		if(cachedRate && cachedTime && now - parseInt(cachedTime, 10) < 3600000) {
			return parseFloat(cachedRate);
		}
	}


	try {
		const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
		if(!response.ok) throw new Error("Fx fetching breakdown");

		const data = await response.json();
		const targetRate = data.rates[toCurrency];

		if (!targetRate) throw new Error(`Currency ${toCurrency} not supported endpoint`)

		if (isBrowser){
			sessionStorage.setItem(cacheKey, targetRate.toString());
			sessionStorage.setItem(cachedTimeKey, now.toString());
		}

		return targetRate;
	}catch (err){
		console.error("Exchange rate pipeline error", err);
		return 1;
	}
}