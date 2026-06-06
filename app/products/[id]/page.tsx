'use client'

import React, { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/app/context/CartContext";
import {motion} from "framer-motion"

interface PageProps {
	params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
	const resolvedParams = use(params);
	const productId = resolvedParams.id;

	const [product, setProduct] = useState<any | null>(null);
	const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [selectedSize, setSelectedSize] = useState<string>("");

	// Tracks which image asset index is currently expanded inside the main viewfinder
	const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

	const { addToCart, cart, removeFromCart } = useCart();

	useEffect(() => {
		const fetchProductAndRelated = async () => {
			try {
				setLoading(true);
				// 1. Fetch target core product row
				const { data: mainItem, error: mainError } = await supabase
					.from('products')
					.select('*')
					.eq('id', productId)
					.single();

				if (mainError) throw mainError;
				if (mainItem) {
					setProduct(mainItem);
					setActiveImageIndex(0); // Reset gallery pointer on item changes

					// 2. Fetch up to 4 items from the same category to render the bottom recommendations
					if (mainItem.category_id) {
						const { data: relatedData, error: relatedError } = await supabase
							.from('products')
							.select('*')
							.eq('category_id', mainItem.category_id)
							.neq('id', mainItem.id)
							.limit(4);

						if (!relatedError && relatedData) {
							setRelatedProducts(relatedData);
						}
					}
				}
			} catch (err) {
				console.error("Error executing parallel table details lookup:", err);
			} finally {
				setLoading(false);
			}
		};
		fetchProductAndRelated();
	}, [productId]);

	const renderTag = (rawTag: any) => {
		if (!rawTag) return null;

		let cleanTag = "";
		if (typeof rawTag === "string") {
			if (rawTag.startsWith('["') && rawTag.endsWith('"]')) {
				try {
					const parsed = JSON.parse(rawTag);
					cleanTag = Array.isArray(parsed) ? parsed[0] : parsed;
				} catch {
					cleanTag = rawTag.replace(/[\[\]"]/g, '');
				}
			} else {
				cleanTag = rawTag;
			}
		} else if (Array.isArray(rawTag)) {
			cleanTag = rawTag[0];
		}

		cleanTag = cleanTag?.trim();
		if (!cleanTag) return null;

		const normalizedTag = cleanTag.toUpperCase();
		let colorClass = "bg-neutral-500 text-white";

		if (normalizedTag === "BESTSELLER") colorClass = "bg-primary text-white";
		else if (normalizedTag === "NEW ARRIVAL") colorClass = "bg-tertiary text-white";
		else if (normalizedTag === "LIMITED EDITION") colorClass = "bg-error text-white";
		else if (normalizedTag === "SALE") colorClass = "bg-secondary text-white";

		return (
			<div className='absolute top-4 left-4 z-20'>
				<span className={`${colorClass} px-3 py-1 rounded-full font-label-sm text-label-sm tracking-wider uppercase`}>
					{cleanTag}
				</span>
			</div>
		);
	};

	const handleAddToCartWithValidation = () => {
		if (!selectedSize && product?.sizes && product.sizes.length > 0) {
			alert("Please select a canvas size before checkout processing");
			return;
		}
		addToCart({ ...product, selectedSize });
	};

	const getProductQuantity = () => {
		if (!product) return 0;
		return cart
			.filter(item => item.id === product.id && item.selectedSize === selectedSize)
			.reduce((sum, item) => sum + item.quantity, 0);
	};

	const handleAdjustQuantity = (adjustment: number) => {
		if (!product) return;
		if (adjustment > 0) {
			addToCart({ ...product, selectedSize });
		} else {
			removeFromCart(product.id, selectedSize);
		}
	};

	if (loading) return <div className="text-center py-24 font-body-md text-on-surface-variant">Loading our collection...</div>;
	if (!product) return <div className="text-center py-24 font-body-md text-on-surface-variant">No items found in this collection.</div>;

	const productQuantity = getProductQuantity();

	// Fallback array matrix safely handling presence of text arrays or individual columns
	const galleryImages = product.images && Array.isArray(product.images) && product.images.length > 0
		? product.images
		: [product.image_url || "/fallback-product.png"];
	return (
		<main className="min-h-screen bg-background text-on-background px-margin-desktop py-24 max-w-container mx-auto">
			{/* Core Product Presentation Section */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">

				{/* Dynamic Viewport Section: Thumbnail Stream + Expanded Main Panel */}
				<div className="flex flex-col-reverse sm:flex-row gap-4 h-max">
					{/* Main Focused Display Area */}
					<div className="flex-grow aspect-[3/4] relative rounded-3xl overflow-hidden glass-panel shadow-lg bg-surface-container-high">
						{renderTag(product.tag || product.tags)}
						<img
							src={galleryImages[activeImageIndex]}
							alt={product.name}
							className="w-full h-full object-cover transition-all duration-500"
						/>
					</div>

					{/* Left Sidebar Thumbnail Array */}
					{galleryImages.length > 1 && (
						<div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible">
							{galleryImages.map((imgUrl: string, idx: number) => (
								<button
									key={idx}
									onClick={() => setActiveImageIndex(idx)}
									className={`w-20 aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-high border-2 transition-all flex-shrink-0 cursor-pointer ${
										activeImageIndex === idx ? 'border-primary scale-105 shadow-md' : 'border-outline-variant opacity-70 hover:opacity-100'
									}`}
								>
									<img src={imgUrl} alt={`view angle ${idx + 1}`} className="w-full h-full object-cover" />
								</button>
							))}
						</div>
					)}


				</div>

				{/* Product Narrative Information Panel */}
				<div className="flex flex-col justify-center space-y-6">
					<div>
						<h1 className="font-display-lg text-display-lg text-on-background mb-1">{product.name}</h1>
						<p className="font-body-md text-body-md text-on-surface-variant">Heritage Series</p>
					</div>
					<p className="font-title-lg text-title-lg text-primary">${Number(product.price).toFixed(2)}</p>
					<p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">{product.description}</p>

					{product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && (
						<div className="pt-2 border-t border-outline-variant/10">
							<span className="text-[11px] uppercase tracking-wider text-on-surface-variant block mb-2 font-medium">Select Size:</span>
							<div className="flex flex-wrap gap-1.5">
								{product.sizes.map((size: string) => {
									const isSelected = selectedSize === size;
									return (
										<button
											key={size}
											type="button"
											onClick={() => setSelectedSize(size)}
											className={`text-xs px-2.5 py-1 rounded border transition-all font-semibold cursor-pointer ${
												isSelected ? 'bg-primary text-white border-primary shadow-sm scale-105' : 'border-outline-variant text-on-surface hover:border-primary'
											}`}
										>
											{size}
										</button>
									);
								})}
							</div>
						</div>
					)}

					<div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
						<button
							onClick={handleAddToCartWithValidation}
							className="px-8 py-3 bg-primary text-white rounded-xl font-title-md text-title-md shadow-xl hover:bg-primary/90 transition-all cursor-pointer"
						>
							Add to Cart
						</button>
						{productQuantity > 0 && (
							<div className="inline-flex items-center gap-1.5 px-3 bg-primary/10 text-primary font-label-sm text-[12px] font-bold uppercase rounded-xl py-2 border border-primary/20">
								<button onClick={() => handleAdjustQuantity(-1)} className="px-2 py-0.5 hover:bg-primary/20 rounded cursor-pointer text-sm">-</button>
								<span>In Cart: {productQuantity}</span>
								<button onClick={() => handleAdjustQuantity(1)} className="px-2 py-0.5 hover:bg-primary/20 rounded cursor-pointer text-sm">+</button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Related Products Grid Component Layer */}
			{relatedProducts.length > 0 && (
				<motion.section
					initial={{opacity: 0, x: 200}}
					animate={{opacity: 1, x: 0}}
					transition={{duration: 0.6, ease: "easeInOut"}}

					className="pt-16 border-t border-outline-variant">
					<h2 className="font-headline-lg text-headline-lg mb-8 text-start">Complete the Look</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
						{relatedProducts.map((item) => (
							<Link key={item.id} href={`/products/${item.id}`} className="group block space-y-3">
								<div className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-surface-container-high shadow-sm">
									<img
										src={item.image_url || "/fallback-product.png"}
										alt={item.name}
										className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
									/>
								</div>
								<div className="flex justify-between items-start px-1">
									<div>
										<h4 className="font-title-sm text-sm text-on-background font-bold group-hover:text-primary transition-colors line-clamp-1">{item.name}</h4>
										<p className="text-xs text-on-surface-variant">Heritage Series</p>
									</div>
									<p className="font-title-sm text-sm text-primary font-semibold">${Number(item.price).toFixed(2)}</p>
								</div>
							</Link>
						))}
					</div>
				</motion.section>
			)}
		</main>
	);
}
