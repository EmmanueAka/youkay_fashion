'use client'
import React from 'react'
import {ArrowRight} from "lucide-react";
import CollectionCards from "@/components/CollectionCards";
import NewArrivalsCard from "@/components/NewArrivalsCard";
import {motion} from "framer-motion";

const Collections = () => {
	return (
		<div className='mt-12' id="collection">
			<div className='px-12 mt-6'>
				<div className='w-full flex justify-between'>
					<div>
						<motion.h1
							initial={{opacity: 0, x: 50}}
							whileInView={{opacity: 1, x: 0}}
							transition={{duration: 0.5, ease: "easeOut"}}
							className='text-4xl mb-base mt-12'>Curated Collections</motion.h1>
						<motion.p
							initial={{opacity: 0, y: 50}}
							whileInView={{opacity: 1, y: 0}}
							transition={{duration: 0.5, ease: "easeOut"}}
							className='max-w-xl mt-4'>Browse through our signature aesthetics designed for the modern connoisseur</motion.p>
					</div>
					<div

						className='flex items-end'>
						<motion.button
							initial={{opacity: 0, y: -50}}
							whileInView={{opacity: 1, y: 0}}
							transition={{duration: 0.6, ease: "easeOut"}}
							className='flex items-center justify-center primary-text'>
							View all categories
							<ArrowRight className='size-5' />
						</motion.button>
					</div>
				</div>
					<CollectionCards />
				<NewArrivalsCard />
			</div>
		</div>
	)
}
export default Collections
