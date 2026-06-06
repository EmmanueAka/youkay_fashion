'use client'

import React, {useEffect, useState} from 'react'
import {Category} from "@/types";
import {useCart} from "@/app/context/CartContext";
import {supabase} from "@/lib/supabaseClient";
import products from "@/app/dashboard/main/Products";
import Link from "next/link";


const ITEMS_PER_PAGE = 3;

const ModernFusionProductCard = () => {
	const [products, setProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [categoryId, setCategoryId] = useState<string | null>(null);
	const [page, setPage] = useState<number>(0);
	const [hasMore, setHasMore] = useState<boolean>(true);

	// Tracks chosen sizes per product ID, e.g., { "prod_123": "M" }
	const [chosenSizes, setChosenSizes] = useState<Record<string, string>>({});


	const {addToCart} = useCart()


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

		cleanTag = cleanTag.trim();
		if (!cleanTag) return null;

		const normalizedTag = cleanTag.toUpperCase();

		let colorClass = "bg-neutral-500 text-white";

		if (normalizedTag === "BESTSELLER") {
			colorClass = "bg-primary text-white"
		} else if (normalizedTag === "NEW ARRIVAL") {
			colorClass = "bg-tertiary text-white"
		} else if (normalizedTag === "LIMITED EDITION") {
			colorClass = "bg-error text-white";
		} else if (normalizedTag === "SALE") {
			colorClass = "bg-secondary text-white"
		} else if (normalizedTag === "HANDMADE") {
			colorClass = "bg-orange-500 text-white"
		} else if (normalizedTag === "POPULAR") {
			colorClass = "bg-gray-600 text-white"
		}

		return (
			<div className='absolute top-4 left-4 z-20'>
				<span
					className={`${colorClass} px-3 py-1 rounded-full font-label-sm text-label-sm tracking-wider uppercase`}>
					{cleanTag}
				</span>
			</div>
		)

	}

	useEffect(() => {
		const fetchCategoryId = async () => {
			try {
				const {data: category, error: catError} = await supabase
					.from('categories')
					.select("id")
					.eq("name", "Modern Fashion")
					.single();

				if (catError) throw catError;
				if (category) setCategoryId(category.id);
			} catch (err) {
				console.error("Error fetching category configuration:", err);
				setLoading(false);
			}
		};
		fetchCategoryId();
	}, []);

	useEffect(() => {
		if (!categoryId) return;

		const fetchProducts = async () => {
			try {
				if (page === 0) setLoading(true);
				else setLoadingMore(true);

				const from = page * ITEMS_PER_PAGE;
				const to = from + ITEMS_PER_PAGE - 1;


				const {data: productsData, error: prodError} = await supabase
					.from("products")
					.select("*")
					.eq("category_id", categoryId)
					.range(from, to);

				if (prodError) throw prodError;

				const fetchedItems = productsData || [];

				// If we returned less items than the limit, we hit the end of the collection
				if (fetchedItems.length < ITEMS_PER_PAGE) {
					setHasMore(false);
				}

				setProducts(prev => (page === 0 ? fetchedItems : [...prev, ...fetchedItems]));
			} catch (error) {
				console.error("Data ingestion pipeline error:", error);
			} finally {
				setLoading(false);
				setLoadingMore(false);
			}
		};

		fetchProducts();
	}, [categoryId, page,]);


	const handleSelectSize = (productId: string, size: string) => {
		setChosenSizes(prev => ({
			...prev, [productId]: size
		}));
	};

	const handleAddToCartWithValidation = (product: any) => {
		const selectedSize = chosenSizes[product.id]
		if (!selectedSize && product.sizes && product.sizes.length > 0) {
			alert("Please select a canvas size before checkout processing")
			return
		}

		addToCart({
			...product,
			selectedSize: selectedSize
		})
	}
	return (
		<div className='md:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter'>
			{loading ? (
				<div className="col-span-full text-center py-10 text-on-surface-variant">Loading our collection...</div>
			) : products.length === 0 ? (
				<div className="col-span-full text-center py-10 text-on-surface-variant">No items found in this
					collection.</div>
			) : (
				products.map((product) => (
					<Link href={`/products/${product.id}`} key={product.id} className='group relative space-y-4 '>
						<div>
							<div className='aspect-[3/4] relative rounded-3xl overflow-hidden glass-panel'>
								<img
									className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
									alt={product.name}
									src={product.image_url}
								/>
								<div
									className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity'></div>
								<div
									className='absolute bottom-4 right-4 left-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all'>
									<button
										onClick={() => handleAddToCartWithValidation(product)}
										className='w-full py-3 bg-surface/90 backdrop-blur-md rounded-xl text-on-primary cursor-pointer font-title-md text-title-md shadow-xl'>Quick
										Add
									</button>
								</div>
								{renderTag(product.tag || product.tags)}
							</div>
							<div className='flex justify-between item-start'>
								<div>
									<h4 className='font-title-md text-title-md text-on-background'>{product.name}</h4>
									<p className='font-body-md text-body-md text-on-surface-variant'>Heritage Series</p>
								</div>
								<p className='font-title-md text-title-md text-primary'>${Number(product.price).toFixed(2)}</p>
							</div>
						</div>
						{product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0 && (
							<div className='mt-2 pt-2 border-t border-outline-variant/10'>
								<span
									className='text-[11px] uppercase tracking-wider text-on-surface-variant block mb-2 font-medium'>Select Size:</span>
								<div className='flex flex-wrap gap-1.5'>
									{product.sizes.map((size: string) => {
										const isSelected = chosenSizes[product.id] === size;
										return (
											<button
												key={size}
												type="button"
												onClick={() => handleSelectSize(product.id, size)}
												className={`text-xs px-2.5 py-1 rounded border transition-all font-semibold cursor-pointer ${
													isSelected
														? 'bg-primary text-white border-primary shadow-sm scale-105'
														: 'border-outline-variant text-on-surface hover:border-primary'
												}`}
											>
												{size}
											</button>
										)
									})}
								</div>
							</div>
						)}

					</Link>
				)))}


		</div>
	)
}
export default ModernFusionProductCard
