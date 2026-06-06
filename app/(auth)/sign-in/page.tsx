'use client'
export const dynamic = 'force-dynamic'
import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from "@/lib/supabaseClient"


const CustomerSignIn = () => {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const router = useRouter()
	const searchParams = useSearchParams()

	// Check if user came from a post-checkout redirect trigger
	const redirectTo = searchParams.get('redirect') || '/'

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrorMsg(null)
		setLoading(true)

		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) {
			setErrorMsg(error.message)
			setLoading(false)
			return
		}

		// Pull profile context to enforce strict role demarcation
		const { data: profile, error: profileError } = await supabase
			.from('profiles')
			.select('role')
			.eq('id', data.user?.id)
			.single()

		if (profileError || !profile) {
			setErrorMsg('Account profile missing from database.')
			await supabase.auth.signOut()
			setLoading(false)
			return
		}

		// Reject administrative access attempts to ensure clean session separation
		if (profile.role === 'admin') {
			setErrorMsg('Administrative logins are restricted from customer checkout zones.')
			await supabase.auth.signOut()
			setLoading(false)
			return
		}

		router.refresh()
		router.push(redirectTo)
	}

	return (
		<Suspense fallback={<div>Loading authentication layout...</div>}>
		<div className='bg-background min-h-screen flex items-center justify-center relative overflow-hidden px-6'>
			<div className='absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]'></div>

			<main className='w-full max-w-[440px] z-10'>
				<div className='glass-card rounded-2xl border border-outline-variant/20 p-8 shadow-md bg-white/80 backdrop-blur-md'>
					<div className='mb-8 text-center'>
						<h1 className='font-display-md text-headline-md text-primary mb-2'>Welcome Back</h1>
						<p className='font-body-md text-on-surface-variant text-sm'>Sign in to complete your checkout purchase</p>
					</div>

					<form className="space-y-5" onSubmit={handleSubmit}>
						<div className="space-y-2">
							<label className="font-label-sm text-xs text-on-surface font-semibold tracking-wider block" htmlFor="email">EMAIL ADDRESS</label>
							<input
								className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-3 px-4 text-on-background focus:outline-none focus:border-primary transition-all text-sm"
								name="email" placeholder="name@example.com" type="email" required
							/>
						</div>

						<div className="space-y-2">
							<div className="flex justify-between items-center">
								<label className="font-label-sm text-xs text-on-surface font-semibold tracking-wider block" htmlFor="password">PASSWORD</label>
							</div>
							<input
								className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-3 px-4 text-on-background focus:outline-none focus:border-primary transition-all text-sm"
								name="password" placeholder="••••••••••••" type="password" required
							/>
						</div>

						{errorMsg && (
							<div className="p-3 bg-error-container/20 border border-error/20 text-error text-xs rounded-xl text-center font-medium">
								{errorMsg}
							</div>
						)}

						<button type='submit' disabled={loading} className="w-full cursor-pointer py-3.5 rounded-xl font-title-md text-white bg-primary hover:bg-primary/95 shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-bold text-sm">
							{loading ? 'Authenticating...' : 'Sign In & Proceed'}
						</button>

						<div className="text-center pt-2">
							<p className="text-xs text-on-surface-variant">
								Don't have an account?{' '}
								<Link href={`/sign-up?redirect=${encodeURIComponent(redirectTo)}`} className="text-primary font-bold hover:underline">
									Create Account
								</Link>
							</p>
						</div>
					</form>
				</div>
			</main>
		</div>
		</Suspense>
	)
}

export default CustomerSignIn