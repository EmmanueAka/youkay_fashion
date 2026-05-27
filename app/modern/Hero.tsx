import React from 'react'

const Hero = () => {
	return (
		<div>
			<section className='relative h-[614px] md:h-[819px] flex items-center overflow-hidden'>
				<div className='absolute inset-0 z-0'>
					<img className='w-full h-full object-cover' alt='Modern Fusion Jacket featureing intricate'
					     src='https://lh3.googleusercontent.com/aida-public/AB6AXuA2e-C3DKnqapVKPkWQWAjibv1gAb98oSAr-pVBMPdMT8_gZ_YOCf95mp3shWhjvAsJBMWF2wQMnRZ0U2oN-Ph-h0_Zp9GzMqBvAGhQ-OcS9F2-GieSdP9EZpWaDZxzYllni2xqR2WiR7IpOK3F702YsQb8-YKgWo4nS6H7yas60qujSKeQ0c0F1L-3Z2mbto0_vCO32u00-obkVF17s7JEfJaWl86OLEgjUN3HNFoNSqNE978o0VlsjmehmUWA94IwM4rDJWmJWYmX'/>
					<div className='absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent'></div>
				</div>
				<div className='relative z-10 px-margin-desktop max-w-container-max mx-auto w-full'>
					<div className='max-w-2xl space-y-6'>
					<span className='inline-flex items-center px-4 py-1 rounded-full bg-tertiary/10 font-label-sm text-label-sm'>
						CATEGORY: MODERN FUSION
					</span>
						<h1 className='font-display-lg text-display-lg text-on-background leading-none'>The Future of <br />
							<span className='text-primary'>Ancestral Design</span> </h1>
						<p className='font-body-lg text-body-lg text-on-surface-variant max-w-md'>
							Where the rhythmic patterns of the past meet the precise silhouettes of tomorrow. Discover our curated collection of contemporary pieces honoring heritage through craft.
						</p>
						<div className='flex gap-4'>
							<button className='shimmer-btn cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-primary-container px-8 py-4 rounded-full font-title-md text-title-md shadow-lg shadow-primary/20 transition-transform hover:scale-105 duration-300'>
								Explore Collection
							</button>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}
export default Hero
