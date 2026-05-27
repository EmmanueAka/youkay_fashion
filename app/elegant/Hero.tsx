import React from 'react'

const Hero = () => {
	return (
		<section className='relative h-[819px] flex items-end overflow-hidden'>
			<div className='absolute inset-0 z-0'>
				<img className='w-full h-full object-cover'
				     alt='A cinematic, high-fashion'
				     src='https://lh3.googleusercontent.com/aida-public/AB6AXuDbXjTBSk-Rl-LNr11AgAawQ4kHGftGn4nNyBbVXpfEdLkpeiD7yENF8koZwk3J6HcMkaRLOuZQ8Sc-cyYzSDOwQEKMRsuWNCEft_oVS41AHZrJdujNSmtcGBX9TrXZLZNH4Wkb59e7RzkG5__5p9kdIvuIM_6MGjSQdj_BZ4_TmrHds00e67myw8pwmF7jsJMSsiQkKcZQVjy0B2AHq15louLrMt-V3L9otIUHJ1od7ozqvLwFYo785ZGrcCf5xfAdoQU3Tqntmx6t'
				/>
				<div className='absolute inset-0 bg-gradient-to-t from-background  via-transparent to-transparent'></div>
				<div className='absolute inset-0 bg-black/20'></div>
			</div>
			<div className='relative z-10 px-margin-desktop max-w-containter-max mx-auto pb-16 '>
				<div className='max-w-2xl'>
					<span className='bg-tertiary/60 text-white px-4 py-1 rounded-full font-label-sm text-label-sm inline-block mb-4 backdrop-blur-md'>Collection 2026</span>
					<h1 className='font-display-lg text-display-lg text-white mb-6 drop-shadow-lg'>Elegant Evening</h1>
					<p className='font-body-lg text-body-lg text-white/90 mb-8 max-w-lg drop-shadow-lg'>Where ancestral Adire craftsmanship meets the architectural precision of modern silhouettes. A symphony of hand-dyed silks and intricate lace for the contemporary matriarch.</p>
					<div className='flex gap-4 mb-8'>
						<button className='shimmer-btn text-tertiary px-8 py-4 rounded-full font-title-md text-title-md shadow-xl hover:scale-105 transition-transform active:scale-95 duration-500'>View Lookbook</button>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Hero
