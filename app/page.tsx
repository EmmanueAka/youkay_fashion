'use client'

import React from 'react'
import Hero from "@/app/pages/Hero";
import Collections from "@/app/pages/Collections";
import Footer from "@/components/Footer";
import { motion } from 'framer-motion';

const Page = () => {
	return (
		<motion.div
			initial={{opacity: 0, y:70}}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -50 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<Hero />
			<Collections />
			<Footer />
		</motion.div>
	)
}
export default Page
