import React from 'react'

const Hero = () => {
	return (
		<div>
			<section className='relative h-[450px] md:h-[819px] flex items-center overflow-hidden'>
				<div className='absolute inset-0 z-0'>
					<img className='w-full h-full object-cover' alt='Modern Fusion Jacket featureing intricate'
					     src='/modern-chic.png'/>
					<div className='absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent'></div>
				</div>
				<div className='relative z-10 px-margin-desktop max-w-container-max mx-auto w-full'>
					<div className='max-w-2xl space-y-6'>
					<span className='inline-flex items-center px-4 py-1 rounded-full bg-tertiary/10 font-label-sm text-label-sm'>
						CATEGORY: MODERN FUSION
					</span>
						<h1 className='md:font-display-lg font-bold md:text-display-lg text-xl  text-on-background leading-none'>The Future of <br />
							<span className='text-primary'>Ancestral Design</span> </h1>
						<div className='w-70 text-wrap md:w-full'>
							<p className='font-body-lg md:text-body-lg text-on-surface-variant max-w-md'>
								Where the rhythmic patterns of the past meet the precise silhouettes of tomorrow. Discover our curated collection of contemporary pieces honoring heritage through craft.
							</p>
						</div>
						<div className='flex gap-4'>
							<button
								onClick={() => {
									const el = document.getElementById("collection")
									if(el) el.scrollIntoView({behavior: 'smooth'})
								}}
								className='shimmer-btn cursor-pointer hover:text-white hover:bg-gradient-to-r hover:from-primary hover:to-primary-container md:px-8 md:py-4 px-4 py-2.5 rounded-full font-title-md text-title-md shadow-lg shadow-primary/20 transition-transform hover:scale-105 duration-300'>
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
