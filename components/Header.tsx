'use client'

import React, {useEffect, useState} from 'react'
import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/NavItems";
import {Search, ShoppingCart} from "lucide-react";
import {useCart} from "@/app/context/CartContext";
import CheckoutSideBar from "@/components/CheckoutSideBar";
import {motion} from "framer-motion"


const Header = () => {
	const {getCartCount} = useCart();
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [mounted, setMounted] = useState(false)
	const [toggleMenu, setToggleMenu] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, []);

	const totalItems = mounted ? getCartCount() : 0;

	const handleSearch = () => {

	}

	return (
		<div className='sticky top-0 w-full px-6 bg-white z-50'>
			<div className='w-full justify-between flex items-center '>
				<div className='flex items-center justify-center'>
					<button
						onClick={() => setToggleMenu(true)}
						className='flex sm:hidden cursor-pointer'>
						<span className='material-symbols-outlined'>menu</span>
					</button>

					<div className='w-38 h-16 relative'>
						<Link href='/' >
							<Image src='/u-logo.png' alt='logo' fill className='w-full h-full object-contain'/>
						</Link>
					</div>
				</div>
				<div className='hidden sm:block'>
					<NavItems onNavigation={() => setToggleMenu(false)}/>
				</div>
				<div className='gap-6 flex items-center justify-between'>
					<div
						className='group relative'>
						<button className='group-hover:opacity-0'>
							<Search className='w-5 h-5 text-orange-900 cursor-pointer'/>
						</button>
						<input
							className='bg-primary focus:ring-0 text-white font-semibold focus:outline-primary max-w-4xl rounded-full px-3 py-2 shadow-sm border-2 border-white/40 absolute
							-left-50 top-10 focus:opacity-100 group-hover:opacity-100 opacity-0 transition duration-500' type='text'
						       placeholder='Search for apparels...'
						/>
					</div>
					<div className='relative'>
						<button onClick={() => setIsCartOpen(true)}>
							<ShoppingCart className='w-5 h-5 text-orange-900 cursor-pointer'/>
						</button>
						{totalItems > 0 && (
							<span className='absolute -top-1 -right-3 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-pulse'>
							{totalItems}
						</span>
						)}
					</div>
				</div>
			</div>
			<CheckoutSideBar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
			{toggleMenu && (
				<div className='fixed inset-0 z-50 block sm:hidden bg-black/40 backdrop-blur-sm'>
					<div className='absolute inset-0' onClick={() => setToggleMenu(false)} />
					<motion.div
						initial={{opacity: 0, x: 50}}
						animate={{opacity: 1, x: 0}}
						transition={{ duration: 0.6, ease: 'easeInOut'}}
						className='absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col z-50'>
						<button onClick={() => setToggleMenu(false)}
						        className='self-end w-full justify-center flex  font-semibold mb-6 p-2 rounded-full hover:bg-gray-100'
						>
							<span className='material-symbols-outlined'>close</span>Close
						</button>

						<NavItems onNavigation={() => setToggleMenu(false)} />
						<p className='absolute bottom-10 right-0 left-10 text-gray-400 text-sm'>&copy; 2024 Fashion With Ukay</p>
					</motion.div>
				</div>
			)}
		</div>
	)
}
// @ts-ignore
export default Header
