'use client'

import React from 'react'
import { motion } from 'framer-motion';
import Hero from "@/app/traditional/Hero";

const Page = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y:50}}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -50 }}
			transition={{ duration: 0.6, ease: 'easeOut' }}
		>
			<Hero />
		</motion.div>
	)
}
export default Page
