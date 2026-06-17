'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { NEW_ARRIVAL_ITEMS } from '@/lib/constants'
import {ShoppingBasket, ShoppingCart} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {supabase} from "@/lib/supabaseClient";
import {detectUserRegion, getExchangeRate, UserRegionConfig} from "@/lib/currencyService";




const cardVariants = {
	enter: {
		x: '100%',
		opacity: 0,
	},
	center: (isActive: boolean) => ({
		x: 0,
		opacity: 1,
		marginTop: isActive ? '0.5rem' : '2rem',
		scale: isActive ? 1.05 : 0.95,
	}),
	exit: {
		x: '-100%',
		opacity: 0,
	},
}

const Card = ({
	              item,
	              isActive,
	              positionIndex,
	              isMobile
              }: {
	item: any;
	isActive: boolean;
	positionIndex: number;
	isMobile: boolean
}) => {
	const [region, setRegion] = useState<UserRegionConfig | null>(null)
	const [conversionRate, setConversionRate] = useState<number>(1)



	const BASE_DATABASE_CURRENCY = 'NGN'

	useEffect(() => {
		const initializeLocalizationPipline = async () => {
			const detectRegion = await detectUserRegion();
			setRegion(detectRegion);

			const rate = await getExchangeRate(BASE_DATABASE_CURRENCY, detectRegion.currencyCode)
			setConversionRate(rate)
		}

		initializeLocalizationPipline()
	}, []);

	const renderLocalizedPrice = (basePrice: number) => {
		if(!region) return `₦${basePrice.toLocaleString()}`;

		const convertedAmount = basePrice * conversionRate;

		return  `${region.currencySymbol}${convertedAmount.toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})} ${region.currencyCode}`
	}

	return (
		<motion.div
			custom={isActive}
			variants={cardVariants}
			initial="enter"
			animate="center"
			exit="exit"
			transition={{
				x: { type: 'spring', stiffness: 300, damping: 30 },
				opacity: { duration: 0.4 },
				marginTop: { duration: 0.5, ease: 'easeInOut' },
				scale: { duration: 0.5, ease: 'easeInOut' },
			}}
			// Absolute width rules: 100% on mobile screens, 30% on desktop screens
			className="absolute aspect-[3/4] rounded-2xl cursor-pointer w-full md:w-[30%]"
			style={{
				// Centers the single item on mobile, offsets by 35% steps on desktop
				left: isMobile ? '0%' : `${positionIndex * 35}%`,
			}}
		>
			{/* Wraps both image container and label text underneath */}
			<div className="w-full h-full group flex flex-col">
				<div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg  bg-neutral-100">
				<Link href={`/products/${item.id}`}>
					<img
						src={item.image_url || "/fallback"}
						alt={item.name}
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
					/>
				</Link>
					<button className='absolute bottom-4 right-4 w-12 h-12 glass-panel cursor-pointer rounded-full flex items-center justify-center primary-text opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-300'>
						<ShoppingBasket />
					</button>
				</div>
				{/* 1. Label placed cleanly below the absolute image container boundary */}
				<div className="w-full py-4">
					<div className='w-full px-2'>
						<div className='flex justify-between items-center w-full'>
							<h3 className="text-sm font-bold text-neutral-800 transition-colors ">
								{item.name}
							</h3>
							<p className='primary-text text-sm'>{renderLocalizedPrice(item.price)}</p>
						</div>
						<p className='text-start text-sm mt-2'>{item.description}</p>
					</div>
				</div>
			</div>
		</motion.div>
	)
}

const NewArrivalsCard = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	const [isMobile, setIsMobile] = useState(false)



	const { data: newArrivals = [], isLoading } = useQuery({
		queryKey: ['products'],
		queryFn: async () => {
			const { data, error} = await supabase
				.from('products')
				.select('*')
				.order('created_at', { ascending: false})
				.limit(6)

			if (error) throw error;
			return data || []
		},

		staleTime: 1000 * 60 * 60 * 5,
	})
	// Tracks layout viewports to dynamically alter state arrays
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768)
		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const handleNext = () => {
		if (newArrivals.length === 0) return
		setActiveIndex((prev) => (prev + 1) % newArrivals.length)
	}

	const handlePrev = () => {
		if (newArrivals.length === 0) return
		setActiveIndex((prev) => (prev - 1 + newArrivals.length) % newArrivals.length)
	}

	// 2. Touch swipe gesture detection handler for mobile
	const handleDragEnd = (event: any, info: any) => {
		const swipeThreshold = 50
		if (info.offset.x < -swipeThreshold) {
			handleNext() // Swiped left -> load next image
		} else if (info.offset.x > swipeThreshold) {
			handlePrev() // Swiped right -> load previous image
		}
	}





	if(isLoading){
		return (
			<div className='text-center py-24 text-neutral-500 font-medium animate-pulse'>
				Loading newest arrivals...
			</div>
		)
	}

	// On mobile, show only the single active item. On desktop, show 3 items.
	const visibleItems = isMobile
		? [{ item: newArrivals[activeIndex], pos: 0 }]
		: [
			{ item: newArrivals[(activeIndex - 1 + newArrivals.length) % newArrivals.length], pos: 0 },
			{ item: newArrivals[activeIndex], pos: 1 },
			{ item: newArrivals[(activeIndex + 1) % newArrivals.length], pos: 2 },
		]

	return (
			<div className='text-center'>
			<div className='flex flex-col items-center justify-center'>
				<h3 className='text-[40px] font-bold'>New Arrivals</h3>
				<div className='w-24 border-b-4 border-[#a43c12] mt-4'/>
			</div>
			<div className="w-full mt-4 mb-24 px-4 md:px-6 flex flex-row items-center gap-6 justify-center">

			{/* Left Arrow Button: Visible only on desktop screens */}
			<div className="hidden md:block">
				<button
					onClick={handlePrev}
					className="p-3 rounded-full bg-white/70 hover:bg-white backdrop-blur-md text-black border border-black/10 transition-all active:scale-95 shadow-md"
					aria-label="Previous item"
				>
					<svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
					</svg>
				</button>
			</div>

			{/* Swipe Capture Layer Box */}
			<motion.div
				drag={isMobile ? "x" : false}
				dragConstraints={{ left: 0, right: 0 }}
				dragElastic={0.2}
				onDragEnd={handleDragEnd}
				className="relative w-full max-w-[350px] md:max-w-none h-[480px] flex items-center justify-start overflow-visible touch-pan-y select-none"
			>
				<AnimatePresence mode="popLayout" initial={false}>
					{visibleItems.map((slot, idx) => (
						<Card
							key={slot.item.id || slot.item.label}
							item={slot.item}
							isActive={isMobile ? true : idx === 1}
							positionIndex={slot.pos}
							isMobile={isMobile}
						/>
					))}
				</AnimatePresence>
			</motion.div>

			{/* Right Arrow Button: Visible only on desktop screens */}
			<div className="hidden md:block">
				<button
					onClick={handleNext}
					className="p-3 rounded-full bg-white/70 hover:bg-white backdrop-blur-md text-black border border-black/10 transition-all active:scale-95 shadow-md"
					aria-label="Next item"
				>
					<svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
						<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
					</svg>
				</button>
			</div>
			</div>
		</div>
	)
}

// @ts-ignore
export default NewArrivalsCard
