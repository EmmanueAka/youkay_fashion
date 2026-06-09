'use client'

import React from 'react'
import {COLLECTION_ITEMS} from "@/lib/constants";
import {motion} from "framer-motion";
import Link from "next/link";

const CollectionCards = () => {
	return (
		<motion.div
			className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 mb-16'>
			{COLLECTION_ITEMS.map((item, index) => (
				<Link href={item.href} key={index}>
					<motion.div
						initial={{opacity: 0, y:150}}
						whileInView={{opacity: 1, y:0}}
						transition={{duration: 0.8, ease: "easeInOut"}}
						className='group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shadow-lg'
					>
					<img className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110' alt='close up of traditional attire' src={item.image} />

					<div className='absolute bottom-4 left-4 right-4 glass-panel p-3 rounded-full flex items-center justify-center flex-col transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500'>
						<h3 className='font-bold  text-white'>{item.label}</h3>
						<p className='font-bold text-lg'>{item.sub}</p>
					</div>

					</motion.div>
				</Link>
			))}

		</motion.div>
	)
}
export default CollectionCards
