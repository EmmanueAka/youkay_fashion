import React from 'react'

const Hero = () => {
	return (
		<section className='"relative w-full h-[716px] flex items-center overflow-hidden'>
			<div className='absolute inset-0 z-0'>
				<img className='w-full h-full object-cover' alt='casual chic hero' src='https://lh3.googleusercontent.com/aida-public/AB6AXuCyTfVePeIWd68g4Q6gRQ4_ThtZD_92uOJ-KzrlHl7lUpx_-6CFmaWNXbM9eZrRoHcwHudYFpnsrKEXwEDhhcvc6J5P3dSlILytewEcGzJ_ufKiQK365P7l9lxNRhbR4WEj6KFWWPuKeAKPEEzQrZRUlC0MCQAT0mlSJ_W9KRA905cHtkEfog7i2dWY9lEmweP7vUf8MW_03uA_2NMASDcFQ1Ltf514cszvpXV-qfv25i9IXMBsiU7yBZp3Y2bHrNm_i0W4IDy_aKCY'/>

				<div className='absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent'></div>
			</div>
			<div className='relative z-10 px-margin-desktop max-w-container-max mx-auto w-full'>
				<div className='max-w-xl'>
					<span className='bg-tertiary/10 text-tertiary px-4 py-1 rounded-full font-label-sm text-label-sm inline-block mb-6'>NEW COLLECTION</span>
					<h1 className='font-display-lg text-display-lg mb-4 text-on-background'>Casual Chic</h1>
					<p className='font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed'> Where relaxed comfort meets ancestral artistry. Discover modern separates and effortless tunics designed for the contemporary lifestyle, featuring subtle West African textile motifs.</p>
					<div className='flex gap-4'>
						<button className='shimmer-btn text-gray-600 hover:text-white px-8 py-4 rounded-full hover:bg-primary font-title-md text-title-md cursor-pointer shadow-lg transition-transform active:scale-95'>	Shop Collection</button>
						<button className='glass-panel hover:scale-110 duration-700  px-8 py-4 rounded-full  font-title-md text-title-md text-on-surface shadow-lg active:scale-95 cursor-pointer hover:bg-white transition-all'>View Lookbook</button>
					</div>
				</div>
			</div>
		</section>
	)
}
export default Hero
