'use client'

import React from 'react'
import Hero from "@/app/elegant/Hero";
import EveningCard from "@/app/elegant/EveningCard";
import Footer from "@/components/Footer";
import {motion} from "framer-motion";

const Page = () => {
	return (
		<motion.div
			initial={{opacity: 0, y: 50}}
			animate={{ opacity: 1, y: 0}}
			transition={{duration: 0.6, ease: "easeOut"}}
			className='bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container'>
			<Hero />
			<EveningCard/>
			<Footer />
		</motion.div>
	)
}
export default Page
