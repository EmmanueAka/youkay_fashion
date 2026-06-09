'use client'

import React from 'react'
import Hero from "@/app/casual/Hero";
import CasualCard from "@/app/casual/CasualCard";
import ProductCard from "@/app/casual/ProductCard";
import Footer from "@/components/Footer";
import {motion} from "framer-motion";

const Page = () => {
	return (
		<motion.div
			initial={{opacity: 0, y:50}}
			animate={{opacity: 1, y:0}}
			transition={{duration: 0.6, ease: "backIn"}}
			className='bg-background text-on-background font-body-md selection:bg-primary-fixed selection:text-on-primary-fixed overflow-hidden'>
			<Hero />
			<CasualCard />
			<ProductCard />
			<Footer />
		</motion.div>
	)
}
export default Page
