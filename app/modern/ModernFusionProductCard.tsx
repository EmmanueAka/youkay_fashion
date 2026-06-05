'use client'

import React, {useState} from 'react'
import {Category} from "@/types";

const ModernFusionProductCard = () => {
	const [categories, setCategories] = useState<Category[]>([])
	const [name, setName] = useState<string>('')
	const [categoryId, setCategoryId] = useState<string>("")
	const [price, setPrice] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [selectedSizes, setSelectedSizes] = useState<string[]>([])



	return (
		<div className='md:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter'>

			{/*Product 1*/}
			<div className='group relative space-y-4 '>
					<div className='aspect-[3/4] relative rounded-3xl overflow-hidden glass-panel'>
						<img className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' alt='A model standing against a light'
						     src='https://lh3.googleusercontent.com/aida-public/AB6AXuD2N8NpxbGsqLLG4YyrHue5WAUM74Kg6--zibMpMQXeC_o9bx9hT1JvKAy914omj_3kq_NrKX4R5uC6zEy7A2haa4-Dwzl10waFYjv1SNjLOoD1Iuq_NOnyLjisipeQqWqIIKgCBhWFgC41d9lyIJIBOGz702DxEOR5L_qRJmz8hreGfTmBATps3xSvBjWt1FKC7Rj56RBR5vKP5aUsL4biI75j8V1HEvcZNJP0JGguYlEtvmBD3hoFOQhar4nDW3AT6kfljS-D4ljQ'
						/>
						<div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity'></div>
						<div className='absolute bottom-4 right-4 left-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all'>
							<button className='w-full py-3 bg-surface/90 backdrop-blur-md rounded-xl text-on-primary cursor-pointer font-title-md text-title-md shadow-xl'>Quick Add</button>
						</div>
						<span className='absolute top-4 left-4 px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm rounded-lg'>New Arrival</span>
					</div>
				<div className='flex justify-between item-start'>
					<div>
						<h4 className='font-title-md text-title-md text-on-background'>Structural Ankara</h4>
						<p className='font-body-md text-body-md text-on-surface-variant'>Heritage Series</p>
					</div>
					<p className='font-title-md text-title-md text-primary'>$285</p>
				</div>
				</div>



			{/*Product 2*/}
			<div className='group relative space-y-4 '>
				<div className='aspect-[3/4] relative rounded-3xl overflow-hidden glass-panel'>
					<img className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' alt='A model standing against a light'
					     src='https://lh3.googleusercontent.com/aida-public/AB6AXuBscU7Yg9j-53PtbJLM_HU3WdNmb_XD69Sxeti0L-pFbQG-Ofp83bsvKV6ASL_45Pt5bYbmt1ODCBPWxstSK0mUK2ZQ8Fwpnjk-rqFTVgN5JdUH7C4KFCE7xKEnpy2U271Hsg64W3etn9Nv45aDzp0s-Qu7hPG4JIQhZEqXKPGGo-XfoKRu8Bsqd6XGbl3HYDsBixHmDwMYDT3TRz1wc4e5YSj1t_L8_uCOj0vpS1BbyVBpW3yjRouwfoItRnPhxPmywCQmx8x5JwDs'
					/>
					<div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity'></div>
					<div className='absolute bottom-4 right-4 left-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all'>
						<button className='w-full py-3 bg-surface/90 backdrop-blur-md rounded-xl text-on-primary cursor-pointer font-title-md text-title-md shadow-xl'>Quick Add</button>
					</div>
				</div>
				<div className='flex justify-between item-start'>
					<div>
						<h4 className='font-title-md text-title-md text-on-background'>Indigo Fusion Blazer</h4>
						<p className='font-body-md text-body-md text-on-surface-variant'>Adire Collection</p>
					</div>
					<p className='font-title-md text-title-md text-primary'>$420</p>
				</div>
			</div>


			{/*Product 3*/}
			<div className='group relative space-y-4 '>
				<div className='aspect-[3/4] relative rounded-3xl overflow-hidden glass-panel'>
					<img className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' alt='A model standing against a light'
					     src='https://lh3.googleusercontent.com/aida-public/AB6AXuC8NBWIXN0X6ZPtBag67bDbyH1hbXWT_JyujKf46HN6Tc1Wv6M679P6aOEP7c43lihUa1o0HimU8QsxKxJoCUzEZzm_E2kLyEGI_lkyrQAZLyEyEFWg5gVXrBINGGN3yptWwkJJ9I9kUJ5tJREvS1IC0A_efgnHAXLD8cRtNHut4g8vy3qwirNurms8ktXBApwyQGqZ9kAfCRZN-NQVK9219Dkxm-c-kX4BmukhpIXLmRoxW9qz16A8ICDfLCc14Nv6p13SbTrjiLaO'
					/>
					<div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity'></div>
					<div className='absolute bottom-4 right-4 left-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all'>
						<button className='w-full py-3 bg-surface/90 backdrop-blur-md rounded-xl text-on-primary cursor-pointer font-title-md text-title-md shadow-xl'>Quick Add</button>
					</div>
					<span className='absolute top-4 left-4 px-3 py-1 bg-tertiary text-on-primary font-label-sm text-label-sm rounded-lg'>Limited Edition</span>
				</div>
				<div className='flex justify-between item-start'>
					<div>
						<h4 className='font-title-md text-title-md text-on-background'>Aso Oke Frame Clutch</h4>
						<p className='font-body-md text-body-md text-on-surface-variant'>Accessories</p>
					</div>
					<p className='font-title-md text-title-md text-primary'>$350</p>
				</div>
			</div>



		</div>
	)
}
export default ModernFusionProductCard
