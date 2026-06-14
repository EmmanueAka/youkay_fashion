'use client'

import React, { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from "@/lib/supabaseClient"

const SignUpFormContent = () => {
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [successMsg, setSuccessMsg] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const searchParams = useSearchParams()

	// Profile Address State (Mapped to public.profiles)
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [country, setCountry] = useState('')

	// Sync Checkbox State
	const [isSameAddress, setIsSameAddress] = useState(true)

	// Shipping Address State (Mapped to public.addresses)
	const [shippingAddress, setShippingAddress] = useState('')
	const [shippingCity, setShippingCity] = useState('')
	const [shippingState, setShippingState] = useState('')
	const [shippingPostal, setShippingPostal] = useState('')

	const redirectTo = searchParams.get('redirect') || '/'

	// Dynamically sync fields to shipping variables if checked
	const handleProfileAddressChange = (type: 'addr' | 'city' | 'ctry', val: string) => {
		if (type === 'addr') {
			setAddress(val)
			if (isSameAddress) setShippingAddress(val)
		} else if (type === 'city') {
			setCity(val)
			if (isSameAddress) {
				setShippingCity(val)
				setShippingState(val) // Fallback proxy matching your schema layouts
			}
		} else if (type === 'ctry') {
			setCountry(val)
		}
	}

	// Toggle handler syncing current profile variables down to individual shipping variables
	const handleCheckBoxToggle = (checked: boolean) => {
		setIsSameAddress(checked)
		if (checked) {
			setShippingAddress(address)
			setShippingCity(city)
			setShippingState(city)
		}
	}

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

		const currentOrigin = typeof window !== 'undefined' ? window.location.origin : ''

		// Step 1: Sign up through Supabase Auth
		const { data: authData, error: authError } = await supabase.auth.signUp({
			email,
			password,
			options: {
				emailRedirectTo: `${currentOrigin}/auth/callback?next=${encodeURIComponent(redirectTo)}`
			}
		})

		if (authError) {
			setErrorMsg(authError.message)
			setLoading(false)
			return
		}

		const user = authData?.user
		if (!user) {
			setErrorMsg("An unexpected registration error occurred. Please try again.")
			setLoading(false)
			return
		}

		// Step 2: Insert into public.profiles (Note: Skip if you have a database trigger running on auth.users)
		const { error: profileError } = await supabase
			.from('profiles')
			.insert([{
				id: user.id,
				full_name: name,
				email: email,
				phone: phone,
				address: address,
				city: city,
				country: country,
				role: 'user'
			}])

		if (profileError) {
			setErrorMsg(`Profile Creation Error: ${profileError.message}`)
			setLoading(false)
			return
		}

		// Step 3: Insert Shipping Record into public.addresses
		const { error: addressError } = await supabase
			.from('addresses')
			.insert([{
				user_id: user.id,
				address_line: isSameAddress ? address : shippingAddress,
				city: isSameAddress ? city : shippingCity,
				state: isSameAddress ? city : shippingState,
				postal_code: isSameAddress ? (shippingPostal || null) : (shippingPostal || null),
				is_default: true
			}])

		if (addressError) {
			setErrorMsg(`Address Setup Error: ${addressError.message}`)
			setLoading(false)
			return
		}

		// Step 4: Handle validation redirect routing states
		if (authData.session === null) {
			setSuccessMsg("Registration successful! Please check your email inbox to confirm your account.");
			setLoading(false)
		} else {
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
						<p className='font-body-md text-on-surface-variant text-sm'>Enter details to process your heritage orders</p>
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
							{/* Personal Credentials */}
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
										name="phone" placeholder="+234..." type="tel"
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

							{/* Section: Profile Address */}
							<div className="pt-2 border-t border-outline-variant/30">
								<h2 className="text-xs font-bold text-primary tracking-wider mb-3">PROFILE ADDRESS</h2>

								<div className="space-y-1 mb-3">
									<label className="font-label-sm text-xs text-on-surface font-semibold block">STREET ADDRESS</label>
									<input
										className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
										value={address}
										onChange={(e) => handleProfileAddressChange('addr', e.target.value)}
										placeholder="128 Heritage Way" type="text" required
									/>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="space-y-1">
										<label className="font-label-sm text-xs text-on-surface font-semibold block">CITY / STATE</label>
										<input
											className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
											value={city}
											onChange={(e) => handleProfileAddressChange('city', e.target.value)}
											placeholder="Lagos" type="text" required
										/>
									</div>
									<div className="space-y-1">
										<label className="font-label-sm text-xs text-on-surface font-semibold block">COUNTRY</label>
										<input
											className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
											value={country}
											onChange={(e) => handleProfileAddressChange('ctry', e.target.value)}
											placeholder="Nigeria" type="text" required
										/>
									</div>
								</div>
							</div>

							{/* Address Sync Toggle */}
							<div className="flex items-center space-x-2 py-2 select-none">
								<input
									type="checkbox"
									id="sameAddressToggle"
									checked={isSameAddress}
									onChange={(e) => handleCheckBoxToggle(e.target.checked)}
									className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant accent-primary cursor-pointer"
								/>
								<label htmlFor="sameAddressToggle" className="text-xs text-on-surface font-medium cursor-pointer">
									Ship to same address
								</label>
							</div>

							{/* Section: Shipping Address (Displays if unchecked) */}
							{!isSameAddress && (
								<div className="pt-2 border-t border-outline-variant/30">
									<h2 className="text-xs font-bold text-secondary tracking-wider mb-3">SHIPPING ADDRESS</h2>

									<div className="space-y-1 mb-3">
										<label className="font-label-sm text-xs text-on-surface font-semibold block">SHIPPING STREET ADDRESS</label>
										<input
											className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
											value={shippingAddress}
											onChange={(e) => setShippingAddress(e.target.value)}
											placeholder="45 Delivery Ave" type="text" required={!isSameAddress}
										/>
									</div>

									<div className="grid grid-cols-2 gap-4 mb-3">
										<div className="space-y-1">
											<label className="font-label-sm text-xs text-on-surface font-semibold block">CITY</label>
											<input
												className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
												value={shippingCity}
												onChange={(e) => setShippingCity(e.target.value)}
												placeholder="Ikeja" type="text" required={!isSameAddress}
											/>
										</div>
										<div className="space-y-1">
											<label className="font-label-sm text-xs text-on-surface font-semibold block">STATE</label>
											<input
												className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
												value={shippingState}
												onChange={(e) => setShippingState(e.target.value)}
												placeholder="Lagos State" type="text" required={!isSameAddress}
											/>
										</div>
									</div>

									<div className="space-y-1">
										<label className="font-label-sm text-xs text-on-surface font-semibold block">POSTAL CODE (OPTIONAL)</label>
										<input
											className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl py-2.5 px-4 text-on-background text-sm focus:outline-none focus:border-primary transition-all"
											value={shippingPostal}
											onChange={(e) => setShippingPostal(e.target.value)}
											placeholder="100001" type="text"
										/>
									</div>
								</div>
							)}

							{errorMsg && (
								<div className="p-3 bg-error-container/20 border border-error/20 text-error text-xs rounded-xl text-center font-medium">
									{errorMsg}
								</div>
							)}

							<p>Have an account already? <Link href={`/sign-in?redirect=${encodeURIComponent(redirectTo)}`} className='italic text-primary'>Sign In</Link></p>
							<button
								type='submit'
								disabled={loading}
								className='w-full bg-primary hover:bg-primary/90 text-white font-medium rounded-xl py-3 text-sm transition-all shadow-sm hover:shadow-md active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none'
							>
								{loading ? 'Creating Account...' : 'Register Account'}
							</button>
						</form>
					)}
				</div>
			</main>
		</div>
	)
}

export default function SignUpForm() {
	return (
		<Suspense fallback={<div className="min-h-screen flex items-center justify-center text-sm text-on-surface-variant">Loading...</div>}>
			<SignUpFormContent />
		</Suspense>
	)
}
