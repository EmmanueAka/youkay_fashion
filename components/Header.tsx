'use client'

import React, {useState} from 'react'
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/NavItems";
import {Search, ShoppingCart} from "lucide-react";
import {useCart} from "@/app/context/CartContext";
import CheckoutSideBar from "@/components/CheckoutSideBar";


const Header = () => {
	const {cart} = useCart();
	const [isCartOpen, setIsCartOpen] = useState(false);

	const totalItems = cart.reduce((total, item) => total + item.quantity, 0)

	return (
		<div className='sticky top-0 w-full px-6 bg-white z-50'>
			<div className='w-full justify-between flex items-center '>
				<div className='w-38 h-16 relative'>
					<Link href='/public' >
						<Image src='/u-logo.png' alt='logo' fill className='w-full h-full object-contain'/>
					</Link>
				</div>
				<div>
					<NavItems />
				</div>
				<div className='gap-6 flex'>
					<button>
						<Search className='w-5 h-5 text-orange-900 cursor-pointer'/>
					</button>
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
		</div>
	)
}
// @ts-ignore
export default Header
