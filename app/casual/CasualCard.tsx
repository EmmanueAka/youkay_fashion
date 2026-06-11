import React from 'react'
import Link from "next/link";
import ProductCard from "@/app/casual/ProductCard";

const CasualCard = () => {
	return (
		<section className='py-12 md:px-margin-desktop px-6 max-w-container-max mx-auto mb-6'>
			<div className='grid grid-cols-1 md:grid-cols-12 gap-gutter flex-wrap h-auto'>
				<div className='md:col-span-8 relative rounded-3xl overflow-hidden glass-panel group'>
					<img src='/elegant.jpeg'
					     alt='Relaxed Separates'
					     className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
					/>
					<div className='absolute bottom-0 left-0 right-0 p-12 bg-gradient-to-t from-background/90 to-transparent '>
						<h3 className='font-headline-lg text-headline-lg mb-2'>Everyday Luxury</h3>
						<p className='font-body-md text-body-md text-on-surface-variant max-w-md'>Our signature relaxed separates designed for transition from home to high-street.</p>
					</div>
				</div>

				<div className='md:col-span-4 grid grid-rows-2 gap-gutter'>
					<div className="relative rounded-3xl overflow-hidden glass-panel group">
						<img src='/material.jpeg'
						     className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
						     alt='A close up shot focusing on the exquisite'
						/>
						<div className='absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/40 to-transparent text-white'>
							<span className='font-title-m text-title-md'>Artisanal Tunics</span>
						</div>
					</div>
					<div className='relative rounded-3xl overflow-hidden bg-primary-container p-8 flex flex-col justify-center text-on-primary-container'>
						<h4 className='font-headline-lg text-headline-lg mb-4'>Crafted with Soul</h4>
						<p className='font-body-md text-body-md mb-6'>Each piece integrates traditional Adire and Kente patterns into modern silhouettes.</p>
						<Link href='#' className='flex items-center gap-2 font-title-md text-title-md underline decoration-2 unerline-offset-4'>Learn about our process <span className='material-symbols-outlined' data-icon='arrow_forward'>arrow_forward</span></Link>
					</div>
				</div>
			</div>
		</section>
	)
}
export default CasualCard
