'use client'
import React, {useState} from 'react'
import {useSupabase} from "@/app/dashboard/SupabaseProvider";
import {useRouter} from "next/navigation";

const Page = () => {
	const supabase = useSupabase()
	const [errorMsg, setErrorMsg] = useState<string | null>(null)
	const [loading, setLoading] = useState(false)
	const router = useRouter()


	const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setLoading(true)
		const formData = new FormData(e.currentTarget)
		const email = formData.get('email') as string
		const password = formData.get('password') as string

		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error){
			setErrorMsg(error.message)
			setLoading(false)
			return
		}
		router.refresh()

		const { data: profile, error: profileError } = await supabase
			.from('profiles')
			.select('role')
			.eq('id', data.user?.id)
			.single()

		if(profileError || !profile){
			setErrorMsg('Profile not found. Contact support')
			return
		}

		if(profile?.role === 'admin'){
			router.push('/dashboard/main')
		}

		setLoading(false)
	}

	return (
		<div
			className='bg-background min-h-screen flex items-center justify-center arch-texture relative overflow-hidden'>
			<div className='absolute top-[-10%] left-[-10%]  w-[40%] h-[40%] rounded-full bg-secondary-container/10 blur-[120px]'></div>
			<div className='absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-primary-container/5 blur-[120px]'></div>
			<main className='w-full max-w-[480px] px-margin-mobile z-10'>
				<div
					className='glass-panel rounded-xl shadow-[0_30px_60px_rgba(164,60,18,0.08)] p-10 flex flex-col items-center'>
					<div className='mb-10 text-center'>
						<img alt='Logo' src='/u-logo.png'
						     className='w-32 h-32 mx-auto mb-6 object-contain rounded-full shadow-sm bg-white p-2'/>
						<h1 className='font-display-lg text-title-md text-primary tracking-tight'>BACKEND DASHBOARD</h1>
						<p className='font-body-md text-on-surface-variant text-label-sm mt-2 opacity-70 uppercase tracking-widest'>Administrative
							Access Only</p>
					</div>


					<form className="w-full space-y-6" onSubmit={handleSubmit}>
						{/*Admin ID Field*/}
						<div className="space-y-2">
							<label className="font-label-sm text-label-sm text-outline flex items-center gap-2"
							       htmlFor="admin-id">
								<span className="material-symbols-outlined text-[18px]">verified_user</span>
								ADMIN ID
							</label>
							<div className="relative">
								<input
									className="w-full bg-white/50 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all font-body-md py-3 px-1 text-on-background placeholder:text-outline-variant/60 rounded-t-md"
									name="email" placeholder="Enter security handle" type="email"/>
							</div>
						</div>
						{/*Security Key Field*/}
						<div className="space-y-2">
							<label className="font-label-sm text-label-sm text-outline flex items-center gap-2"
							       htmlFor="security-key">
								<span className="material-symbols-outlined text-[18px]">key</span>
								SECURITY KEY
							</label>
							<div className="relative">
								<input
									className="w-full bg-white/50 border-b-2 border-outline-variant focus:border-primary focus:ring-0 transition-all font-body-md py-3 px-1 text-on-background placeholder:text-outline-variant/60 rounded-t-md"
									id="security-key" name="password" placeholder="••••••••••••" type="password"/>
								<button
									className="absolute right-2 top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
									type="button">
									<span className="material-symbols-outlined">visibility</span>
								</button>
							</div>
						</div>
						{/*Action Button */}
						<button type='submit' aria-busy={loading} disabled={loading} className="w-full shimmer-btn cursor-pointer py-4 rounded-lg font-title-md text-white shadow-lg hover:shadow-primary-container/30 bg-primary transform active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-4" >
							{loading ? (
								<div className='flex items-center justify-center gap-2'>
									<div className='w-6 h-6 border-b-2 border-white rounded-full animate-spin'></div>
									<span>Initializing...</span>
								</div>
							):(
								<div className='flex items-center justify-center gap-2'>
									<span>Initialize Session</span>
									<span className="material-symbols-outlined">lock</span>
								</div>

								)}
						</button>
						<p className='text-red-500 text-sm text-center'>{errorMsg}</p>
						{/*Utility Links*/}
						<div className="flex justify-between items-center pt-4">
							<button className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1" type="button">
								<span className="material-symbols-outlined text-[16px]">help</span>Trouble logging in?
							</button>
							<button className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1" type="button">
								<span className="material-symbols-outlined text-[16px]">language</span>EN
							</button>
						</div>
					</form>
				</div>

				<div className="mt-8 text-center space-y-4">
					<div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-tertiary-container/10 border border-tertiary-container/20">
							<span className="relative flex h-2 w-2">
							<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
							<span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
							</span>
						<span className="font-label-sm text-[10px] text-tertiary uppercase tracking-widest">Global Server Operational</span>
					</div>
					<p className="font-body-md text-center text-label-sm text-primary/40">
						© 2024 Stitch. Contemporary Heritage Craftsmanship.<br/>
						Unauthorized access attempts are logged and monitored.
					</p>
				</div>

			</main>
		</div>

	)
}
export default Page
