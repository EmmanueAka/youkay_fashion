'use client'

import React from 'react'

const Hero = () => {

	return (
		<header className='relative w-full h-[85vh] min-h-[500px] sm:min-h-0 overflow-hidden'>
			<div className='absolute inset-0 z-0'>
				<img alt="Hero-Banner-Image" className="w-full h-full object-cover" src="/home-hero.png"/>
				<div className='absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent sm:from-white/80'></div>
			</div>
			<div className='relative z-10 h-full flex flex-col justify-center items-start px-4 sm:px-8 md:px-16 lg:px-24 w-full max-w-7xl mx-auto'>
				<div className='w-full md:max-w-4xl lg:space-y-12 md:space-y-8 space-y-6 animate-fade-in-up'>
					<span className='inline-block border px-3 py-1 rounded-full font-inter font-bold text-xs sm:text-label-sm tracking-widest uppercase'>
						New Era Fashion
					</span>
					<h1 className='text-[32px] sm:text-[48px] md:text-[60px] font-bold outline-white drop-shadow-xl text-on-background leading-tight break-words'>
						Handmade <span className='gradient-text '>Heritage</span>, <br/> Modern Soul
					</h1>
					<p className='text-sm sm:text-base font-body-lg text-black max-w-md sm:max-w-lg'>
						Discover a curated blend of ancestral craftsmanship and contemporary silhouettes. Every stitch tells a story of identity and elegance.
					</p>
					<div className='flex flex-wrap gap-3 sm:gap-4 pt-4'>
						<button
							onClick={() => {
								const el = document.getElementById("collection")
								if (el) el.scrollIntoView({behavior: 'smooth'})
							}}
							className='shimmer-btn bg-gradient-to-r from-[#a43c12] to-[#ff7f50] text-white sm:px-8 px-5 sm:py-4 py-3 rounded-full font-semibold sm:text-title-md text-sm shadow-xl hover:scale-105 transition-transform whitespace-nowrap'>
							Explore Collection
						</button>
						<button className='glass-panel sm:px-8 px-5 sm:py-4 py-3 rounded-full hover:scale-105 text-semibold text-primary font-semibold hover:bg-white/40 transition-all shadow-xl cursor-pointer whitespace-nowrap'>
							Our Story
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}
export default Hero
