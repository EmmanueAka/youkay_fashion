import { NextResponse } from 'next/server';

export async function GET(request: string) {
	try {
		const forwarded = request.headers.get('x-forwarded-for');
		const ip = forwarded ? forwarded.split(',')[0].trim() : '';

		// FIX: Corrected template literal syntax with ${ip}
		const apiUrl = ip ? `https://ipapi.co{ip}/json/` : 'https://ipapi.co/json/';

		// ipapi.co requires a User-Agent header to avoid 403 Forbidden errors
		const response = await fetch(apiUrl, {
			headers: { 'User-Agent': 'nodejs-ipapi-v1' }
		});

		if (!response.ok) {
			return NextResponse.json({ error: "Upstream geo provider error" }, {
				status: response.status
			});
		}

		const data = await response.json();
		return NextResponse.json(data);
	} catch (err) {
		return NextResponse.json({ error: "Failed to fetch geolocation" }, { status: 500 });
	}
}
