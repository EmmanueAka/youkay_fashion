import React from 'react'
import {ScanFace} from "lucide-react";
import Link from "next/link";


const Footer = () => {
	return (
		<div className='mt-12'>
			<div className='w-full border border-[#ff7f50]/50'/>
			<div className='mt-12 px-8'>
				<div className='grid grid-cols-2 gap-4 md:grid-cols-4'>
					<div className='hidden md:block'>
						<p className='text-on-surface-variant font-body-md leading-relaxed'>Celebrating contemporary African craftsmanship through sustainable and luxury fashion design.</p>

						<div className='flex gap-4'>
							<Link href=''>
							<span className='material-symbols-outlined primary-text text-2xl'>face_nod</span>
							</Link>
							<Link href=''>
								<span className='material-symbols-outlined primary-text text-2xl'>camera</span>
							</Link>
						</div>
						<div className='w-48 h-32 hidden md:flex items-center justify-center relative'>
							<img src='/u-logo.png' alt='logo' className='object-contain w-full h-full' />
						</div>
					</div>

				{/*	Shops*/}
					<div className='md:block flex flex-col justify-start'>
						<h5 className='font-bold'>Shop</h5>
						<ul className='space-y-4'>
							<li><Link href='' className='text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform inline-block'>New Arrivals</Link></li>
							<li><Link href='' className='text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform inline-block'>Best Sellers</Link></li>
							<li><Link href='' className='text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform inline-block'>Artisan Collection</Link></li>
							<li><Link href='' className='text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform inline-block'>Accessories</Link></li>
						</ul>
					</div>

					<div className='flex justify-start flex-col md:block'>
						<h5 className='text-lg font-bold '>Brand</h5>
						<ul className='space-y-4'>
							<li><Link href='' className='text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform inline-block'>Brand Story</Link></li>
							<li><Link href='' className='text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform inline-block'>Our Impact</Link></li>
							<li><Link href='' className='text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform inline-block'>Sustainability</Link></li>
							<li><Link href='' className='text-on-surface-variant hover:text-secondary hover:translate-x-1 transition-transform inline-block'>Newsletter</Link></li>
						</ul>
					</div>

					<div className='w-full hidden md:block'>
						<h5 className='font-title-md text-title-md text-on-surface mb-6'>Join the Tribe</h5>
						<p>Stay updated on new drops and stories</p>
						<div className='flex flex-col gap-2'>
							<input className='surface-container-low border-none focuse:ring-1 focus:ring-primary rounded-xl px-4 py-3 ' placeholder='Your email address' type='email'/>
							<button className='primary text-white font-bold rounded-xl py-3 hover:bg-primary/90 transition-all'>
								Subscribe
							</button>
						</div>
						<p className='text-[10px] text-on-surface-variant mt-8 opacity-60'>&copy; 2024 Fashion With Ukay. Contemporary Craftsmanship</p>
					</div>
				</div>
			</div>
			<hr className='border-outline-variant mt-4'/>
			<div className='w-full md:hidden block px-4 mt-4 bg-primary'>
				<h5 className='font-semibold text-title-md text-surface-variant mb-6 text-center '>Join the Tribe</h5>
				<p className='text-center text-surface-variant'>Stay updated on new drops and stories</p>
				<div className='flex flex-col space-y-3'>
					<input className='bg-orange-200 border-none focuse:ring-1 focus:ring-primary rounded-xl px-4 py-3 ' placeholder='Your email address' type='email'/>
					<button className='glass-panel shimmer-btn text-white font-bold rounded-xl py-3 cursor-pointer hover:bg-primary/40  transition-transform duration-500 active:scale-95 hover:scale-105'>
						Subscribe
					</button>
				</div>
				<p className='text-[10px] text-surface-variant md:text-black mt-8 opacity-60'>&copy; 2024 Fashion With Ukay. Contemporary Craftsmanship</p>
			</div>
		</div>
	)
}
export default Footer
