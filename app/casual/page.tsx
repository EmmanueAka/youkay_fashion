import React from 'react'
import Hero from "@/app/casual/Hero";
import CasualCard from "@/app/casual/CasualCard";
import ProductCard from "@/app/casual/ProductCard";
import Footer from "@/components/Footer";

const Page = () => {
	return (
		<div className='bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed'>
			<Hero />
			<CasualCard />
			<ProductCard />
			<Footer />
		</div>
	)
}
export default Page
