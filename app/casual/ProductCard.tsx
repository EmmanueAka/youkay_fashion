'use client'
import React, {useEffect, useState} from 'react'
import {supabase} from "@/lib/supabaseClient";
import {useCart} from "@/app/context/CartContext";
import {motion} from 'framer-motion'
import Link from "next/link";
import {detectUserRegion, getExchangeRate, UserRegionConfig} from "@/lib/currencyService";


const ITEMS_PER_PAGE = 4
const ProductCard = () => {
	const [products, setProducts] = useState<any[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [categoryId, setCategoryId] = useState<string | null>(null)
	const [page, setPage] = useState<number>(0)
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [loadingMore, setLoadingMore] = useState<boolean>(true)


	const [chosenSizes, setChosenSizes] = useState<Record<string, string>>({})
	const [region, setRegion] = useState<UserRegionConfig | null>(null)
	const [conversionRate, setConversionRate] = useState<number>(1)

	const {addToCart} = useCart()




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
					.eq("name", "Casual Chic")
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
		<section id="collection" className='mt-12'>
			<div className='py-12 bg-surface-container-low/30'>
				<div className='md:px-margin-desktop px-3 max-w-container-max mx-auto'>
					<div className='flex justify-between items-end mb-12'>
						<div>
							<h2 className='md:font-headline-lg md:text-headline-lg text-lg font-bold text-red-800'>
								Browse Casual Chic
							</h2>
							<p className='text-on-surface-variant mt-2'>Filter by style, fabric or heritage motif</p>
						</div>
						<div className='flex gap-4'>
							<button className='glass-panel px-6 py-2 rounded-full flex items-center gap-2 font-label-sm text-label-sm'>
								<span className='material-symbols-outlined' data-icon='filter_list'>filter_list</span>Filter
							</button>

							<button className='glass-panel px-6 py-2 rounded-full flex items-center gap-2 font-label-sm text-label-sm'>
								<span className='material-symbols-outlined' data-icon='sort'>sort</span>Sort
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className='px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter'>
				{loading ? (
					<div className="col-span-full text-center py-10 text-on-surface-variant">Loading our collection...</div>
				): products.length === 0 ? (
					<div className="col-span-full text-center py-10 text-on-surface-variant">No items found in this
						collection.</div>
				) : (
					products.map((product) => (
					<div key={product.id} className='group cursor-pointer'>
					<motion.div
						initial={{opacity: 0, x:50}}
						whileInView={{opacity: 1, x:0}}
						transition={{duration: 0.6, ease: "easeIn"}}
						className='relative aspect-[3/4] rounded-3xl overflow-hidden glass-panel mb-4'>

					<Link href={`/products/${product.id}`}>
						<img alt={product.name} className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
						     src={product.image_url}
						/>
					</Link>
					<div className='absolute top-4 left-4'>
						{renderTag(product.tag || product.tags)}
					</div>
					<div className='absolute px-8 bottom-0 left-0 right-0 glass-panel translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
					<button
						onClick={() => handleAddToCartWithValidation(product)}
						className='w-full shimmer-btn text-white py-3 rounded-xl font-title-md text-title-md flex justify-center items-center gap-2'>
					<span className='material-symbols-outlined' data-icon='add_shopping_cart'>add_shopping_cart</span>Add to Bag
					</button>
					</div>
					</motion.div>
					<div className='px-2'>
					<h3 className='font-title-md text-title-md text-on-surface'>{product.name}</h3>
					<p className='text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-widest'>Heritage Cotton Mix</p>
					<span className='text-primary font-bold text-lg'>{renderLocalizedPrice(product.price)}</span>
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
					</div>

					))
				)}


			</div>
			{hasMore && products.length > 0 && (
			<div className='mt-16 flex justify-center'>
				<button
					disabled={loadingMore}
					onClick={() => setPage(prev => prev + 1)}
					className='bg-gray-300 shimmer-btn px-12 py-4 rounded-full font-title-md text-title-md hover:scale-105 active:sc'>
					{loadingMore ? "Loading More..." : "Explore More Casual Chic"}
				</button>
			</div>
			)}
		</section>
	)
}
export default ProductCard
