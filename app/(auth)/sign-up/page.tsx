'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from "@/lib/supabaseClient"

const CustomerSignUp = () => {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [successMsg, setSuccessMsg] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const searchParams = useSearchParams()

	const redirectTo = searchParams.get('redirect') || '/'

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setErrorMsg(null)
		setSuccessMsg(null)
		setLoading(true)

		const formData = new FormData(e.currentTarget)
		const name = formData.get('fullName') as string
		const email = formData.get('email') as string
		const password = formData.get('password') as string
		const phone = formData.get('phone') as string
		const address = formData.get('address') as string
		const city = formData.get('city') as string
		const country = formData.get('country') as string

		// 1. Sign up through Supabase Auth (metadata drops down into our Postgres trigger automatically)
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					full_name: name,
					phone: phone,
					address: address,
					city: city,
					country: country,
					role: 'user'
				},
				// Sets where users are routed after clicking their email confirmation link
				emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`
			}
		})

		if (error) {
			setErrorMsg(error.message)
			setLoading(false)
			return
		}

		// 2. Check if verification is active on your Supabase instance
		if (data.user && data.session === null) {
			setSuccessMsg("Registration initiated! Please check your email inbox to confirm your account and complete checkout.");
			setLoading(false)
		} else {
			// If auto-confirm is enabled on the server, redirect them immediately
			window.location.href = redirectTo;
		}
	}

	return (
		<div className='bg-background min-h-screen flex items-center justify-center relative overflow-hidden px-6 py-12'>
			<div className='absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px]'></div>

			<main className='w-full max-w-[500px] z-10'>
				<div className='glass-card rounded-2xl border border-outline-variant/20 p-8 shadow-md bg-white/80 backdrop-blur-md'>
					<div className='mb-6 text-center'>
						<h1 className='font-display-md text-headline-md text-primary mb-1'>Create Account</h1>
						<p className='font-body-md text-on-surface-variant text-sm'>Enter shipping details to process your heritage orders</p>
					</div>

					{successMsg ? (
						<div className="p-6 bg-primary/10 border border-primary/20 rounded-xl text-center space-y-4">
							<span className="material-symbols-outlined text-4xl text-primary animate-pulse">mark_email_read</span>
							<p className="text-sm font-medium text-on-background">{successMsg}</p>
							<Link href="/sign-in" className="text-xs font-bold text-primary underline block pt-2">
								Go to Sign In manually
							</Link>
						</div>
					) : (
						<form className="space-y-4" onSubmit={handleSubmit}>
							<div className="space-y-1">
								<label className="font-label-sm text-xs text-on-surface font-semibold block">FULL NAME</label>
								<input
									className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
									name="fullName" placeholder="John Doe" type="text" required
								/>
							</div>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="space-y-1">
									<label className="font-label-sm text-xs text-on-surface font-semibold block">EMAIL ADDRESS</label>
									<input
										className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
										name="email" placeholder="name@example.com" type="email" required
									/>
								</div>
								<div className="space-y-1">
									<label className="font-label-sm text-xs text-on-surface font-semibold block">PHONE NUMBER</label>
									<input
										className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
										name="phone" placeholder="+234..." type="tel" required
									/>
								</div>
							</div>

							<div className="space-y-1">
								<label className="font-label-sm text-xs text-on-surface font-semibold block">PASSWORD</label>
								<input
									className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
									name="password" placeholder="Min. 6 characters" type="password" minLength={6} required
								/>
							</div>

							<div className="space-y-1">
								<label className="font-label-sm text-xs text-on-surface font-semibold block">STREET ADDRESS</label>
								<input
									className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
									name="address" placeholder="128 Heritage Way" type="text" required
								/>
							</div>

							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-1">
									<label className="font-label-sm text-xs text-on-surface font-semibold block">CITY / STATE</label>
									<input
										className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
										name="city" placeholder="Lagos" type="text" required
									/>
								</div>
								<div className="space-y-1">
									<label className="font-label-sm text-xs text-on-surface font-semibold block">COUNTRY</label>
									<input
										className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
										name="country" placeholder="Nigeria" type="text" required
									/>
								</div>
							</div>

							{errorMsg && (
								<div className="p-3 bg-error-container/20 border border-error/20 text-error text-xs rounded-xl text-center font-medium">
									{errorMsg}
								</div>
							)}

							<button type='submit' disabled={loading} className="w-full cursor-pointer py-3.5 rounded-xl font-title-md text-white bg-primary hover:bg-primary/95 shadow-md transition-all font-bold text-sm mt-2">
								{loading ? 'Processing...' : 'Complete Account Registration'}
							</button>

							<div className="text-center pt-2">
								<p className="text-xs text-on-surface-variant">
									Already registered?{' '}
									<Link href={`/sign-in?redirect=${encodeURIComponent(redirectTo)}`} className="text-primary font-bold hover:underline">
										Sign In
									</Link>
								</p>
							</div>
						</form>
					)}
				</div>
			</main>
		</div>
	)
}

export default CustomerSignUp