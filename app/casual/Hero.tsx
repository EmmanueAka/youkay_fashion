import React from 'react'

const Hero = () => {
	return (
		<section className='relative h-[450px] md:h-[819px] flex items-center overflow-hidden'>
			<div className='absolute inset-0 z-0'>
				<img className='w-full h-full object-cover' alt='casual chic hero' src='/casual-hero.png'/>

				<div className='absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent'></div>
			</div>
			<div className='relative z-10 sm:px-margin-desktop px-4 max-w-container-max mx-auto w-full'>
				<div className='sm:max-w-xl max-w-lg'>
					<span className='bg-tertiary/10 text-tertiary px-4 py-1 rounded-full font-label-sm text-label-sm inline-block mb-6'>NEW COLLECTION</span>
					<div className='w-70 md:w-full'>
						<h1 className='md:font-display-lg font-bold sm:text-display-lg text-xl mb-4 text-red-800'>Casual Chic</h1>
						<p className='sm:flex sm:font-body-lg sm:text-body-lg text-[14px] text-gray-700 mb-8 leading-relaxed'>Where relaxed comfort meets ancestral artistry. Discover modern separates and effortless tunics designed for the contemporary lifestyle, featuring subtle West African textile motifs.</p>
					</div>
					<div className='flex flex-col md:flex-row  md:gap-4 gap-6 mb-4 '>
						<button
							onClick={() => {
								const el = document.getElementById('collection')
								if(el) el.scrollIntoView({ behavior: 'smooth' })
							}
						}
							className='shimmer-btn text-gray-600 hover:text-white px-4 py-2 sm:px-8 sm:py-4 rounded-full hover:bg-primary font-title-md text-title-md cursor-pointer shadow-lg transition-transform active:scale-95'>	Shop Collection</button>
						<button className='glass-panel hover:scale-105 duration-700 px-4 py-2  sm:px-8 sm:py-4 rounded-full  font-title-md text-title-md text-on-surface shadow-lg active:scale-95 cursor-pointer hover:bg-white transition-all'>Lookbook</button>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Hero
