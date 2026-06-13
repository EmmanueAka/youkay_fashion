'use client'


import React, {useEffect, useState} from 'react'
import {useQuery} from "@tanstack/react-query";
import {supabase} from "@/lib/supabaseClient";
import {useCart} from "@/app/context/CartContext";
import Link from "next/link";


const ITEMS_PER_PAGE = 4;

const SORT_OPTIONS = [
	{ value: 'created_at_desc', label: 'Newest Arrivals', column: 'created_at', ascending: false },
	{ value: 'price_asc', label: 'Price: Low to High', column: 'price', ascending: true },
	{ value: 'price_desc', label: 'Price: High to Low', column: 'price', ascending: false },
	{ value: 'name_asc', label: 'Alphabetical (A-Z)', column: 'name', ascending: true },
]

const EveningCard = () => {
	const [products, setProducts] = useState<any[]>([]);
	const [page, setPage] = useState<number>(0);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [sortBy, setSortBy] = useState<string>('created_at_desc');
	const [chosenSizes, setChosenSizes] = useState<Record<string, string>>({});

	// Destructure context methods (assuming standard updateCartQuantity / removeFromCart support)
	const { addToCart, cart, updateCartQuantity, removeFromCart } = useCart();


	// 1. Clean up tags defensively for display
	const renderTag = (rawTag: any ) => {
		if(!rawTag) return null;

		let cleanTag = "";

		if (typeof rawTag === "string") {
			if (rawTag.startsWith('["') && rawTag.endsWith('"]')) {
				try {
					const parsed = JSON.parse(rawTag);
					cleanTag = Array.isArray(parsed) ? parsed[0] : parsed;
				}catch{
					cleanTag = rawTag.replace(/[\[\]"]/g, '');
				}
			}else {
				cleanTag = rawTag;
			}
		}else if(Array.isArray(rawTag)){
			cleanTag = rawTag[0];
		}

		cleanTag = cleanTag.trim();
		if(!cleanTag) return null;

		const normalizedTag = cleanTag.toUpperCase();

		let colorClass = "bg-neutral-500 text-white";

		if(normalizedTag === "BESTSELLER"){
			colorClass = "bg-primary text-white"
		}else if(normalizedTag === "NEW ARRIVAL"){
			colorClass = "bg-tertiary text-white"
		}else if(normalizedTag === "LIMITED EDITION"){
			colorClass = "bg-error text-white";
		}else if(normalizedTag === "SALE"){
			colorClass = "bg-secondary text-white"
		}else if(normalizedTag === "HANDMADE"){
			colorClass = "bg-orange-500 text-white"
		}else if(normalizedTag === "POPULAR"){
			colorClass = "bg-gray-600 text-white"
		}

		return (
			<div className='absolute top-4 left-4 z-20'>
				<span className={`${colorClass} px-3 py-1 rounded-full font-label-sm text-label-sm tracking-wider uppercase`}>
					{cleanTag}
				</span>
			</div>
		)

	}

	const { data: categoryId } = useQuery({
		queryKey: ['category', 'Elegant Evening'],
		queryFn: async () => {
			const { data, error } = await supabase
				.from('categories')
				.select("id")
				.eq("name", "Elegant Evening")
				.single();
			if (error) throw error;
			return data?.id || null;
		},
		staleTime: 1000 * 60 * 60,
	});

	// 2. Cached Paginated & Sorted Product Query Engine
	const currentSort = SORT_OPTIONS.find(opt => opt.value === sortBy) || SORT_OPTIONS[0];

	const { data: fetchedProducts, isLoading, isFetching } = useQuery({
		queryKey: ['products', categoryId, page, sortBy],
		queryFn: async () => {
			const from = page * ITEMS_PER_PAGE;
			const to = from + ITEMS_PER_PAGE - 1;

			const { data, error } = await supabase
				.from("products")
				.select("*")
				.eq("category_id", categoryId)
				.order(currentSort.column, { ascending: currentSort.ascending })
				.range(from, to);

			if (error) throw error;
			return data || [];
		},
		enabled: !!categoryId,
		staleTime: 1000 * 60 * 5,
	});

	// 3. Synchronize incoming cached streams into view state safely
	useEffect(() => {
		if (fetchedProducts && fetchedProducts.length > 0) {
			setProducts(prev => {
				if (page === 0) {
					return fetchedProducts;
				}
				const existingIds = new Set(prev.map(p => p.id));
				const filteredNew = fetchedProducts.filter(p => !existingIds.has(p.id));
				return [...prev, ...filteredNew];
			});
			setHasMore(fetchedProducts.length === ITEMS_PER_PAGE);
		} else if (page === 0 && fetchedProducts && fetchedProducts.length === 0 && !isLoading && !isFetching) {
			if (products.length !== 0) {
				setProducts([]);
			}
			setHasMore(false);
		}
	}, [fetchedProducts, page, isLoading, isFetching, products.length]);

	const handleSelectSize = (productId: string, size: string) => {
		setChosenSizes(prev => ({ ...prev, [productId]: size }));
	};

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortBy(e.target.value);
		setPage(0);
		setHasMore(true);
		setProducts([]); // Instantly empty old styles to prevent data flickering
	};

	const handleAddToCartWithValidation = (product: any) => {
		const selectedSize = chosenSizes[product.id];
		if (!selectedSize && product.sizes && product.sizes.length > 0) {
			alert("Please select a canvas size before checkout processing");
			return;
		}

		addToCart({
			...product,
			selectedSize: selectedSize
		});
	};

	// Directly increments or modifies quantities based on context schema capabilities
	const handleAdjustQuantity = (productId: string, currentQty: number, adjustment: number) => {
		const targetProduct = products.find(p => p.id === productId);
		const selectedSize = chosenSizes[productId] || (targetProduct?.sizes?.[0] || "");

		if(adjustment > 0) {
			addToCart({
				...targetProduct,
				selectedSize: selectedSize
			})
		}else if(adjustment < 0){
			removeFromCart(productId, selectedSize);
		}

	};

	// Helper function to extract exact matching cart quantities per item ID
	const getProductQuantity = (productId: string) => {
		return cart
			.filter(item => item.id === productId)
			.reduce((sum, item) => sum + item.quantity, 0);
	};

	// Split data elements cleanly to display highlight features apart from standard grids
	const mainProduct = products[0];


	return (
		<section id='collection' className='md:py-24 py-12 px-6 md:px-margin-desktop max-w-container mx-auto'>
			<div className='flex justify-between items-end mb-16'>
				<div className='flex'>
					<h2 className='md:font-headline-lg md:text-headline-lg font-semibold text-tertiary mb-2'>The Evening Selection</h2>
				</div>
				<div className='flex gap-3'>

					{/*Sort drop down filter*/}
					<button
						className='flex items-center gap-2 border rounded-full border-outline-variant py-1 px-2 font-label-sm text-label-sm hover:bg-surface-variant transition-colors'>
						<span className='material-symbols-outlined' data-icon='filter_list'>filter_list</span>Filter
					</button>

					<select
						className='flex items-center gap-2 border rounded-full border-outline-variant py-1 px-2 font-label-sm text-label-sm hover:bg-surface-variant transition-colors'>
						{SORT_OPTIONS.map(opt => (
							<option key={opt.value} value={opt.value}>{opt.label}</option>
						))}
					</select>
				</div>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter'>
				{isLoading && page === 0 ? (
					<div className="col-span-full text-center py-10 text-on-surface-variant">Loading our collection...</div>
				) : products.length === 0 ? (
					<div className="col-span-full text-center py-10 text-on-surface-variant">No items found in this collection.</div>
				) :  (
				<div className='lg:col-span-2 relative group rounded-2xl overflow-hidden glass-card transition-all duration-500 hover:shadow-2xl'>
					{mainProduct && (
					<div className='md:aspect-[16/9] aspect-auto relative overflow-hidden'>
						<img
							className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
							alt={mainProduct.name}
							src={mainProduct.image_url}/>
						<div className='absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-white/90 to-transparent backdrop-blur-md'>
						<div className='flex justify-between items-end'>
						<div>
							{renderTag(mainProduct.tag)}
						<h3 className='md:font-headline-lg md:text-headline-lg text-[18px] mt-3 text-white md:text-primary'>{mainProduct.name}</h3>
						<p className='md:font-body-md md:text-body-md text-on-surface-variant text-[12px]'>{mainProduct.description}</p>
						</div>
						<div className='text-right'>
						<span className='md:font-title-md md:text-title-md text-on-background text-sm font-semibold'>${Number(mainProduct.price)}</span>

						</div>
						</div>
						</div>
					</div>

					)}
				</div>
				)}

				{/*Products*/}
				{isLoading && page === 0 ? (
					<div className="col-span-full text-center py-10 text-on-surface-variant">Loading our collection...</div>
				) : products.length === 0 ? (
					<div className="col-span-full text-center py-10 text-on-surface-variant">No items found in this collection.</div>
				) : (
					products.map((product) => (
						<div key={product.id}
							className='relative group rounded-2xl overflow-hidden glass-card transition-all duration-500 hover:shadow-2xl'>
							<div className='aspect-[3/4] overflow-hidden'>
								<Link href={`/products/${product.id}`}>
								<img
									src={product.image_url}
									alt='Detail shot of a black French lace dress'
									className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'/>
								</Link>
								{renderTag(product.tag || product.tags)}
							</div>
							<div
								className='absolute bottom-0 left-0 w-full p-6 bg-white/40 backdrop-blur-xl border-t border-white/20'>
								<h3 className='font-title-md text-title-md text-white mb-1'>{product.name}</h3>
								<p className='font-label-sm text-label-sm text-on-surface-variant mb-4'>${Number(product.price).toFixed(2)}</p>
								{product.sizes && product.sizes.length > 0 && (
									<div className='mt-2 pt-2 border-t border-outline-variant/10 flex flex-col items-start justify-start gap-2 mb-3'>
										<div className='flex items-center gap-3'>
											<span className='text-[11px] uppercase tracking-wider text-on-surface-variant block mb-2 font-medium'>Select Size:</span>
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
													);
												})}
											</div>
										</div>
										<div>
											{(() => {
												const qty = getProductQuantity(mainProduct.id);
												if (qty === 0) return null;
												return (
													<div className="inline-flex items-center gap-2 mt-3 bg-white/20 backdrop-blur-md px-2 py-1 rounded border border-white/30 text-black">
														<button
															onClick={() => handleAdjustQuantity(mainProduct.id, qty, -1)}
															className="w-5 h-5 flex items-center justify-center font-bold hover:bg-white/20 rounded cursor-pointer transition-colors"
														>
															-
														</button>
														<span className="text-xs font-bold tracking-wider uppercase">In Bag: {qty}</span>
														<button
															onClick={() => handleAdjustQuantity(mainProduct.id, qty, 1)}
															className="w-5 h-5 flex items-center justify-center font-bold hover:bg-white/20 rounded cursor-pointer transition-colors"
														>
															+
														</button>
													</div>
												);
											})()}
										</div>
									</div>
								)}
								<button
									onClick={() => handleAddToCartWithValidation(product)}
									className='w-full py-2 border border-white/40 text-white rounded-lg font-label-sm text-label-sm hover:bg-primary hover:text-white cursor-pointer transition-all'>Add
									to Cart
								</button>
							</div>
						</div>
					))
				)}

			</div>

			<div className="md:px-margin-desktop px-6 mt-6 max-w-container-max mx-auto text-center relative z-10">
				<h2 className="md:font-display-lg md:text-display-lg font-semibold text-primary mb-6">Own the Heritage.</h2>
				<p className="md:font-body-lg md:text-body-lg text-on-surface-variant max-w-xl mx-auto mb-10">
					Join our inner circle for early access to limited collections and the stories behind our master
					weavers.
				</p>
				<form className="max-w-md mx-auto flex md:flex-row flex-col gap-4">
					<input
						className="flex-1 bg-white/40 border-none rounded-lg md:px-6 md:py-4 px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary/20 transition-all"
						placeholder="Your email address" type="email"/>
					<button
						className="glass-panel shimmer-btn shadow-lg hover:bg-primary text-primary hover:text-white cursor-pointer rounded-lg px-4 py-2 md:px-8 md:py-4">Subscribe
					</button>
				</form>

			</div>
		</section>
	)
}
export default EveningCard
