'use client'

import React from 'react'
import {usePathname} from "next/navigation";
import {NAV_ITEMS} from "@/lib/constants";
import Link from "next/link";

const NavItems = ({onNavigation}:{onNavigation: () => void}) => {
	const pathname = usePathname()
	return (
		<ul className='flex flex-col font-[var(--font-montserrat)] sm:flex-row sm:items-center gap-6'>
			{NAV_ITEMS.map(({href, label}) => {
				const id = href.replace("#", "")
				const isActive = pathname === href || (href.startsWith("#") && pathname === '/')
				return(
					<li key={href}>
						<Link href={href} onClick={onNavigation} className={`relative sm:text-sm text-sm lg:text-xl inline-block after:content-[' '] after:absolute font-semibold after:left-0 after:w-0 after:bottom-0 after:h-[2px] after:bg-orange-400 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full 
						${isActive ? 'text-orange-400 after:w-full' : 'text-orange-900 font-semibold'} `}>
							{label}
						</Link>
					</li>
				)
			})

			}
		</ul>
	)
}
export default NavItems
