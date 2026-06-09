'use client'

import { createBrowserClient } from '@supabase/ssr'
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	// Initialize the Supabase Browser Client
	const [supabase] = useState(() =>
		createBrowserClient(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
		)
	)

	const [user, setUser] = useState<any>(null)
	const [loading, setLoading] = useState(true)
	const router = useRouter();

	useEffect(() => {
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			setUser(session?.user ?? null)
			setLoading(false)

			// Optional: Refresh the page on sign-in/sign-out to sync Middleware
			if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
				router.refresh()
			}
		})

		return () => subscription.unsubscribe()
	}, [supabase, router])



	const logout = async () => {
		await supabase.auth.signOut();
		setUser(null)

		router.push("/")
		router.refresh()
	}

	return (
		<AuthContext.Provider value={{ user, logout, loading, supabase }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
