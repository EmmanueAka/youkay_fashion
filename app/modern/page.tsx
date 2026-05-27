import React from 'react'
import Hero from "@/app/modern/Hero";
import Refine from "@/app/modern/Refine";
import FeatureCard from "@/app/modern/FeatureCard";
import Footer from "@/components/Footer";

const Page = () => {
	return (
		<div className='bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed'>
			<Hero />
			<Refine />
			<FeatureCard />
			<Footer />
		</div>
	)
}
export default Page
