'use client'

import React, {createContext, useContext, useState} from "react";
import {createBrowserClient} from "@supabase/ssr";
import {supabase} from "@/lib/supabaseClient";

const SupabaseContext = createContext(supabase)

export const SupabaseProvider = ({ children }: {children: React.ReactNode}) => {
	const [ supabase ] = useState(() => createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	))

	return (
		<SupabaseContext.Provider value={supabase}>
			{children}
		</SupabaseContext.Provider>
	)
}

export const useSupabase = () => {
	const context = useContext(SupabaseContext)
	if(context === undefined ){
		throw new Error('useSupabase mut be used inside SupabaseProvider')
	}
	return context
}