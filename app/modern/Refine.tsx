'use client'

import React from 'react'
import ModernFusionProductCard from "@/app/modern/ModernFusionProductCard";

const Refine = () => {
	return (
		<section className='md:py-20 px-6 md:px-margin-desktop max-w-container-max mx-auto overflow-hidden'>
			<div className='grid grid-cols-1 md:grid-cols-12 gap-gutter'>
				<div className='md:col-span-3 glass-panel rounded-3xl md:p-8 p-4 flex flex-col justify-between space-y-8'>
					<div>
						<h3 className='font-headline-lg text-headline-lg mb-6'>
							Refine
						</h3>
						<div className='space-y-4'>
							<label className='flex items-center gap-3 cursor-pointer group'>
								<input className='rounded border-outline-variant text-primary focus:ring-primary h-5 w-5 ' type='checkbox'/>
								<span className='font-body-md text-body-md group-hover:text-primary transition-colors'>Ankara Prints</span>
							</label>

							<label className='flex items-center gap-3 cursor-pointer group'>
								<input className='rounded border-outline-variant text-primary focus:ring-primary h-5 w-5 ' type='checkbox'/>
								<span className='font-body-md text-body-md group-hover:text-primary transition-colors'>Adire Silk</span>
							</label>

							<label className='flex items-center gap-3 cursor-pointer group'>
								<input className='rounded border-outline-variant text-primary focus:ring-primary h-5 w-5 ' type='checkbox'/>
								<span className='font-body-md text-body-md group-hover:text-primary transition-colors'>Aso Oke Fusion</span>
							</label>

							<label className='flex items-center gap-3 cursor-pointer group'>
								<input className='rounded border-outline-variant text-primary focus:ring-primary h-5 w-5 ' type='checkbox'/>
								<span className='font-body-md text-body-md group-hover:text-primary transition-colors'>Structural Knits</span>
							</label>
						</div>

						<div className='pt-6 border-t border-outline-variant'>
							<p className='font-label-sm text-label-sm text-on-surface-variant  mb-2'>PRICE RANGE</p>
							<input className='w-full accent-primary' type='range' />
							<div className='flex justify-between mt-2 font-label-sm text-label-sm'>
								<span>$150</span>
								<span>$1200</span>
							</div>
						</div>
					</div>
				{/*	Product Card*/}

				</div>
					<ModernFusionProductCard />
			</div>
		</section>
	)
}
export default Refine
