'use client'

import React from 'react'

const Hero = () => {

	return (
		<header className='relative w-full h-[85vh] overflow-hidden'>
			<div className='absolute inset-0 z-0'>
				<img alt='Her Banner' className='w-full h-full object-cover' src='/hero1.png'/>
				<div className='absolute inset-0 bg-gradient-to-r from-white/80 to-transparent'></div>
			</div>
			<div className='relative z-10 h-full flex flex-col justify-center items-start px-margin-desktop max-w-auto'>
				<div className='md:max-w-4xl max-w-auto lg:space-y-12 md:space-y-8 space-y-8 animate-fade-in-up'>
					<span className='inline-block border px-2 font-[var(--font-inter) font-bold] py-1 rounded-full  text-label-sm tracking-widest uppercase'>
						New Era Fashion
					</span>
					<h1 className='text-[30px] sm:text-[60px] font-bold outline-white text-on-background leading-tight'>
						Handmade <span className='gradient-text '>Heritage</span>, <br/> Modern Soul
					</h1>
					<p className='text-sm font-body-lg sm:text-body-lg text-black shadow-sm max-w-lg'>
						Discover a curated blend of ancestral craftsmanship and contemporary silhouettes. Every stitch tells a story of identity and elegance.
					</p>
					<div className='flex gap-4 pt-base'>
						<button
							onClick={() => {
								const el = document.getElementById("collection")
								if (el) el.scrollIntoView({behavior: 'smooth'})
							}}
							className='shimmer-btn bg-gradient-to-r from-[#a43c12] to-[#ff7f50] text-white sm:px-8 px-4 sm:py-4 py-2 rounded-full font-semibold sm:text-title-md text-sm shadow-xl hover:scale-105 transition-transform'>
							Explore Collection
						</button>
						<button className='glass-card sm:px-8 px-4 sm:py-4 py-2 rounded-full hover:scale-105 text-semibold text-primary font-semibold hover:bg-white/40 transition-all shadow-xl cursor-pointer'>
							Our Story
						</button>
					</div>
				</div>
			</div>
		</header>
	)
}
export default Hero
