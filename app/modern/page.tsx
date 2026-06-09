'use client'

import React from 'react'
import Hero from "@/app/modern/Hero";
import Refine from "@/app/modern/Refine";
import FeatureCard from "@/app/modern/FeatureCard";
import Footer from "@/components/Footer";
import {motion} from "framer-motion";

const Page = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20}}
			animate={{ opacity: 1, y: 0}}
			transition={{ duration: 0.6, ease: "easeInOut" }}
			className='bg-background text-on-background selection:bg-primary-fixed selection:text-on-primary-fixed'>
			<Hero />
			<Refine />
			<FeatureCard />
			<Footer />
		</motion.div>
	)
}
export default Page
