import React from 'react'
import Hero from "@/app/elegant/Hero";
import EveningCard from "@/app/elegant/EveningCard";
import Footer from "@/components/Footer";

const Page = () => {
	return (
		<div className='bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container'>
			<Hero />
			<EveningCard/>
			<Footer />
		</div>
	)
}
export default Page
