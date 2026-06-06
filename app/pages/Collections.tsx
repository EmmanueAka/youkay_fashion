import React from 'react'
import {ArrowRight} from "lucide-react";
import CollectionCards from "@/components/CollectionCards";
import NewArrivalsCard from "@/components/NewArrivalsCard";

const Collections = () => {
	return (
		<div className='mt-12' id="collection">
			<div className='px-12 mt-6'>
				<div className='w-full flex justify-between'>
					<div>
						<h1 className='text-4xl mb-base mt-12'>Curated Collections</h1>
						<p className='max-w-xl mt-4'>Browse through our signature aesthetics designed for the modern connoisseur</p>
					</div>
					<div className='flex items-end'>
						<button className='flex items-center justify-center primary-text'>
							View all categories
							<ArrowRight className='size-5' />
						</button>
					</div>
				</div>
					<CollectionCards />
				<NewArrivalsCard />
			</div>
		</div>
	)
}
export default Collections
