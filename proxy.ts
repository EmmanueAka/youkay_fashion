import { NextResponse, type NextRequest } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

export default async function middleware(req: NextRequest) {
	let response = NextResponse.next({ request: { headers: req.headers } });

	// 1. Initialize Server Side Client with correct cookie sync mapping
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return req.cookies.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					req.cookies.set({ name, value, ...options });
					response = NextResponse.next({ request: { headers: req.headers } });
					response.cookies.set({ name, value, ...options });
				},
				remove(name: string, options: CookieOptions) {
					req.cookies.set({ name, value: '', ...options });
					response = NextResponse.next({ request: { headers: req.headers } });
					response.cookies.set({ name, value: '', ...options });
				},
			},
		}
	);

	// Safe Token verification lookup
	const { data: { user } } = await supabase.auth.getUser();
	const pathname = req.nextUrl.pathname;

	// ==========================================
	// ZONE A: PROTECT CUSTOMER CHECKOUT PIPELINE
	// ==========================================
	if (pathname.startsWith("/checkout")) {
		if (!user) {
			// Send unauthenticated customers to user sign-up view with exact path parameters
			return NextResponse.redirect(new URL(`/auth/sign-up?redirect=${encodeURIComponent(pathname)}`, req.url));
		}

		// Prevent admins from locking or corrupting order processing data
		const { data: profile } = await supabase
			.from('profiles')
			.select('role')
			.eq('id', user.id)
			.single();

		if (profile?.role === 'admin') {
			// Clear active admin token context if they attempt to enter customer space
			return NextResponse.redirect(new URL('/dashboard/main', req.url));
		}
	}

	// ==========================================
	// ZONE B: ADMINISTRATIVE LOCKDOWN ROUTING
	// ==========================================
	if (pathname.startsWith("/dashboard")) {
		// Prevent infinite loops on administrative log-in pathing
		if (pathname === "/dashboard/admin-sign-in") {
			if (user) {
				return NextResponse.redirect(new URL('/dashboard/main', req.url));
			}
			return response;
		}

		// Require token verification for access to dashboard pages
		if (!user) {
			return NextResponse.redirect(new URL('/dashboard/admin-sign-in', req.url));
		}

		// Pull verified role flag
		const { data: profile } = await supabase
			.from('profiles')
			.select('role')
			.eq('id', user.id)
			.single();

		// Hard redirect if they are not an active dashboard administrator
		if (profile?.role !== 'admin') {
			// Sign out user locally to clear token mismatch
			await supabase.auth.signOut();
			return NextResponse.redirect(new URL('/dashboard/admin-sign-in?error=unauthorized', req.url));
		}

		// Direct clean fallback route from /dashboard to /dashboard/main
		if (pathname === "/dashboard" || pathname === "/dashboard/") {
			return NextResponse.redirect(new URL('/dashboard/main', req.url));
		}
	}

	return response;
}

// 2. Clear out loose path declarations to optimize asset loading speeds
export const config = {
	matcher: [
		"/checkout/:path*",
		"/dashboard/:path*"
	],
};