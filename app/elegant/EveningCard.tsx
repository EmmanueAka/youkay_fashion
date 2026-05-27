import React from 'react'

const EveningCard = () => {
	return (
		<section className='py-24 px-margin-desktop max-w-container mx-auto'>
			<div className='flex justify-between items-end mb-16'>
				<div>
					<h2 className='font-headline-lg text-headline-lg text-on-background mb-2'>The Evening Selection</h2>
					<p className='font-body-md text-body-md text-on-surface-variant'>8 Curated Masterpiece</p>
				</div>
				<div className='flex gap-3'>
					<button
						className='flex items-center gap-2 border rounded-full border-outline-variant py-1 px-2 font-label-sm text-label-sm hover:bg-surface-variant transition-colors'>
						<span className='material-symbols-outlined' data-icon='filter_list'>filter_list</span>Filter
					</button>

					<button
						className='flex items-center gap-2 border rounded-full border-outline-variant py-1 px-2 font-label-sm text-label-sm hover:bg-surface-variant transition-colors'>
						<span className='material-symbols-outlined' data-icon='expand_more'>expand_more</span>Sort:
						Newest
					</button>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter'>

				{/*Product Card 1*/}
				<div
					className='lg:col-span-2 relative group rounded-2xl overflow-hidden glass-card transition-all duration-500 hover:shadow-2xl'>
					<div className='aspect-[16/9] overflow-hidden'>
						<img
							className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
							alt='A full length editorial shot of a luxery Adire'
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuC1Qiq2dzy_vJWgnD0Vyg7cBq9IwhJBEB4W9Y54BpSkUPHyg_SP0ql6J1NYoLgwu7Hh7CNHjzS3xgWfbD2IXl10y7hfMy0M19BKP_UksqE4BFPSMjZPkPB4JXyzLWXCYuhu408k3MuVQ9gYeV0LF_afzFsCtCSaJ4ro2NXhdFfeOl5TOjr6ByxgWiwteZmeDULn7wtWUoEPcCzEHiylglbngzDOm-Njjy6obKhKf-Ia-2BLTzBGwFvD-L8-CRvFvuV5ZLpxPKkiKtRU'/>
					</div>
					<div
						className='absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-md'>
						<div className='flex justify-between items-end'>
							<div>
								<span
									className='text-tertiary font-label-sm text-label-sm mb-1 blo'>LIMITED EDITION</span>
								<h3 className='font-headline-lg text-headline-lg text-primary'>Indigo Empress Gown</h3>
								<p className='font-body-md text-body-md text-on-surface-variant'>Hand-dyed 100% Mulberry
									Silk Adire</p>
							</div>
							<div className='text-right'>
								<span className='font-title-md text-title-md text-on-background'>$1.090</span>
								<button
									className='mt-4 cursor-pointer block bg-primary text-white p-3 rounded-full hover:bg-priamry-container transition-all'>
									<span className='material-symbols-outlined'
									      data-icon='add_shopping_cart'>add_shopping_cart</span>
								</button>
							</div>
						</div>
					</div>
				</div>

				{/*	Product Card 2*/}
				<div
					className='relative group rounded-2xl overflow-hidden glass-card transition-all duration-500 hover:shadow-2xl'>
					<div className='aspect-[3/4] overflow-hidden'>
						<img
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuDzrKQUYb9jsxYGg59sa9CoD68qcSKxAhz9RBII9Pr_yilX9p5CfWf2FyqEzTxdL73m1ifsz-ZRovWcY2uEwgv6mCS6MVokDIF66Paw8j0sDHaMFEWa8N6wSyK3UzpESlmLAdjFOwjn7ciR6NN0SxMaAHupEC28f7gnT6BvBLFnc7qQRby0fDNnt3DsAEZohSPi_rcQ0limM4OY8vdb4U9wFqdawCfnMVofVPF8DbpByeXR3F7voDgC5HZKz2X4NTXIj42PyQSVmtIn'
							alt='Detail shot of a black French lace dress'
							className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'/>
					</div>
					<div
						className='absolute bottom-0 left-0 w-full p-6 bg-white/40 backdrop-blur-xl border-t border-white/20'>
						<h3 className='font-title-md text-title-md text-white mb-1'>Midnight Lace Column</h3>
						<p className='font-label-sm text-label-sm text-on-surface-variant mb-4'>$920</p>
						<button
							className='w-full py-2 border border-white/40 text-white rounded-lg font-label-sm text-label-sm hover:bg-primary hover:text-white cursor-pointer transition-all'>Add
							to Cart
						</button>
					</div>
				</div>

				{/*	Product Card 3*/}
				<div
					className='relative group rounded-2xl overflow-hidden glass-card transition-all duration-500 hover:shadow-2xl'>
					<div className='aspect-[3/4] overflow-hidden'>
						<img
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuC45I6b1SAH6-ip58DJhw1euTzJq6Uc5HttEIaZJyWwYNdItxWBD8dsLdfTbHU6Jc-SpQdLC8YEgo2l6fSK7uP9Gv-qM9QPA1Nu1UyunTCvAaYCd5wVOj6abkcrIFhDLxA6LbeFutoS5E42AaVx2N1b9yhZIsh-eSarSCZwR6obkdCG8Se8ogJo_MTe-0U9m6pZXUkbl79xkuSfFADtlAG2CX4I0lMYXrzs0-KxsUJNjAacFA2qfJFSWTKUOLkUF_zCL-L28hXGAYgA'
							className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'/>
					</div>
					<div
						className='absolute bottom-0 left-0 w-full p-6 bg-white/40 backdrop-blur-xl border-t border-white/20'>
						<h3 className='font-title-md text-title-md text-white mb-1'>Ochre Silk Bodice</h3>
						<p className='font-label-sm text-label-sm text-on-surface-variant mb-4'>$640</p>
						<button
							className='w-full py-2 border border-white/40 text-white rounded-lg font-label-sm text-label-sm hover:bg-primary hover:text-white cursor-pointer transition-all'>Add
							to Cart
						</button>
					</div>
				</div>

				{/*	Product Card 4*/}
				<div
					className='relative group rounded-2xl overflow-hidden glass-card transition-all duration-500 hover:shadow-2xl'>
					<div className='aspect-[3/4] overflow-hidden'>
						<img
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuDOjPNZkRCPeIq4AVdh48gSwhdJIPXw416x5oWbEtxjpVZrwSVWUXbpk2hK70jvoB6quGNz09P7RVXEuBPzufjSyJUPvLERw42nVr4Eel2fE8NtiwLJcvBw6_Pvwx8agdZIISkEu16Sgo8QNoQvDfJmiRteaMadCUyEzMfx7rBlPLvH6cBL1wU96bnj7xF8CTEWusddr3iAlyEtjZiYsHYwqkVmqNiog12yOtSsWn50GFLkU9V7vyf4Q9d9AK16iRVv2zE-q7YLN0YD'
							alt='an elegant evory silk'
							className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'/>
					</div>
					<div
						className='absolute bottom-0 left-0 w-full p-6 bg-white/40 backdrop-blur-xl border-t border-white/20'>
						<h3 className='font-title-md text-title-md text-white mb-1'>Celestial Iory Slip</h3>
						<p className='font-label-sm text-label-sm text-on-surface-variant mb-4'>$1,100</p>
						<button
							className='w-full py-2 border border-white/40 text-white rounded-lg font-label-sm text-label-sm hover:bg-primary hover:text-white cursor-pointer transition-all'>Add
							to Cart
						</button>
					</div>
				</div>

				{/*	Product Card 5*/}
				<div
					className='relative group rounded-2xl overflow-hidden glass-card transition-all duration-500 hover:shadow-2xl'>
					<div className='aspect-[3/4] overflow-hidden'>
						<img
							src='https://lh3.googleusercontent.com/aida-public/AB6AXuB7lhGUh2aRqc7N7bIrlq36XT9kAoq_gJmxK0BZgiYjeKtmdOjtBBFxRPw99Q6_gLIsAYE3HeL8Ev_-qa7bkz3bGgeSp513IONnNQOYXdw2i0GUg3pLko5TdI8gSAB7NpdkBTJ8MHAm_3JZNHyajTzVeaa3va6It-lJXSVTfctGTtJoHSTzmnEtzW65dcbraQH-2eOFk74Bobiuuksk2UlH4V08asxzO7fv-2HOW7v7HqouxMeAxw0Aq0icJDiUfZqPGs-a9ySo0QmT'
							alt='Macro detail of luxury silk fabric showing the shimm'
							className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'/>
					</div>
					<div
						className='absolute bottom-0 left-0 w-full p-6 bg-white/40 backdrop-blur-xl border-t border-white/20'>
						<h3 className='font-title-md text-title-md text-white mb-1'>Celestial Iory Slip</h3>
						<p className='font-label-sm text-label-sm text-on-surface-variant mb-4'>$1,100</p>
						<button
							className='w-full py-2 border border-white/40 text-white rounded-lg font-label-sm text-label-sm hover:bg-primary hover:text-white cursor-pointer transition-all'>Add
							to Cart
						</button>
					</div>
				</div>
			</div>

			<div className="px-margin-desktop mt-6 max-w-container-max mx-auto text-center relative z-10">
				<h2 className="font-display-lg text-display-lg text-primary mb-6">Own the Heritage.</h2>
				<p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-10">
					Join our inner circle for early access to limited collections and the stories behind our master
					weavers.
				</p>
				<form className="max-w-md mx-auto flex gap-4">
					<input
						className="flex-1 bg-white/40 border-none rounded-lg px-6 py-4 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all"
						placeholder="Your email address" type="email"/>
					<button
						className="shimmer-btn  px-8 text-black py-4 rounded-lg font-title-md text-title-md shadow-lg">Subscribe
					</button>
				</form>
			</div>
		</section>
	)
}
export default EveningCard
