'use client'

import React from 'react'
import {useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/NavItems";
import {Search, ShoppingCart} from "lucide-react";


const Header = () => {
	const router = useRouter()

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
					<button>
						<ShoppingCart className='w-5 h-5 text-orange-900 cursor-pointer'/>
					</button>
				</div>
			</div>
		</div>
	)
}
export default Header
