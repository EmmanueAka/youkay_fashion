import React, {useEffect, useState} from 'react'
import Footer from "@/components/Footer";
import {useCart} from "@/app/context/CartContext";
import {supabase} from "@/lib/supabaseClient";


const ITEMS_PER_PAGE = 4;

const SORT_OPTIONS = [
	{ value: 'created_at_desc', label: 'Newest Arrivals', column: 'created_at', ascending: false },
	{ value: 'price_asc', label: 'Price: Low to High', column: 'price', ascending: true },
	{ value: 'price_desc', label: 'Price: High to Low', column: 'price', ascending: false },
	{ value: 'name_asc', label: 'Alphabetical (A-Z)', column: 'name', ascending: true },
]

const Hero = () => {
	const [products, setProducts] = useState<any[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadingMore, setLoadingMore] = useState<boolean>(false);
	const [categoryId, setCategoryId] = useState<string | null>(null);
	const [page, setPage] = useState<number>(0);
	const [hasMore, setHasMore] = useState<boolean>(true);

	// Track Selected sorting choice
	const [sortBy, setSortBy] = useState<string>('created_at_desc');

	// Tracks chosen sizes per product ID, e.g., { "prod_123": "M" }
	const [chosenSizes, setChosenSizes] = useState<Record<string, string>>({});

	const { addToCart } = useCart();


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


	useEffect(() => {
		const fetchCategoryId = async () => {
			try {
				const { data: category, error: catError } = await supabase
					.from('categories')
					.select("id")
					.eq("name", "Traditional")
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

	// 3. Paginated fetch engine linked to page and categoryId changes
	useEffect(() => {
		if (!categoryId) return;

		const fetchProducts = async () => {
			try {
				if (page === 0) setLoading(true);
				else setLoadingMore(true);

				const from = page * ITEMS_PER_PAGE;
				const to = from + ITEMS_PER_PAGE - 1;

				const currentSort = SORT_OPTIONS.find(opt => opt.value === sortBy) || SORT_OPTIONS[0];

				const { data: productsData, error: prodError } = await supabase
					.from("products")
					.select("*")
					.eq("category_id", categoryId)
					.order(currentSort.column, { ascending: currentSort.ascending})
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
	}, [categoryId, page, sortBy]);



	const handleSelectSize = (productId: string, size: string) => {
		setChosenSizes(prev => ({
			...prev, [productId]: size
		}));
	};

	const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSortBy(e.target.value);
		setPage(0);
		setHasMore(true)
	}

	const handleAddToCartWithValidation = (product: any) => {
		const selectedSize = chosenSizes[product.id]
		if(!selectedSize && product.sizes && product.sizes.length > 0){
			alert("Please select a canvas size before checkout processing")
			return
		}

		addToCart({
			...product,
			selectedSize: selectedSize
		})
	}


	return (
		<div className='bg-background text-on-background font-body-md overflow-x-hidden'>
			<section className='relative h-[716px] flex items-center overflow-hidden'>
				<div className='absolute inset-0 z-0'>
					<img src='/benin-attire2.png' alt='benin attired' className='w-full h-full object-cover'/>
					<div className='absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent'></div>
				</div>
				<div className='relative z-10 px-margin-desktop max-auto w-full'>
					<div className='max-w-2xl'>
						<div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-10 text-tertiary/10 mb-6'>
							<span className='material-symbols-outlined text-[10px]' data-icon='auto_awsome'>auto_awesome</span>
							<span className='font-label-sm text-label-sm uppercase tracking-widest'>Heritage Collections</span>
						</div>
						<h1 className='font-display-lg text-display-lg mb-6 '>The Soul of <span className='text-primary'>Tradition</span> </h1>
						<p className='font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg'>
							Explore the intricate weaves of Kente, the regal stiffness of Aso-oke, and the rhythmic flow of Dashiki. Each stitch carries a century of storytelling and ancestral wisdom.
						</p>

						<div className='flex gap-4'>
							<button className='shimmer-btn heritage-gradient cursor-pointer px-8 rounded-full  font-title-md text-white shadow-lg hover:shadow-primary/20 transition-all'>
								View All Styles
							</button>
							<button className='glass-card cursor-pointer px-8 py-4 group group-hover:scale-105 rounded-full font-title-md text-primary border border-primary/20 hover:bg-white/20 transition-all'>
								Our Process
							</button>
						</div>
					</div>
				</div>
			</section>
			<section className='py-24 px-margin-desktop max-w-container mx-auto'>
				<div className='flex flex-col md:flex-row justify-between items-end mb-16 gap-6'>
					<div className='max-w-xl'>
						<h2 className='font-headline-lg text-headline-lg mb-4'>Fabric Legacies</h2>
						<p className='font-body-md text-body-md text-on-surface-variant'>We source our textiles directly from master weavers across the continent, ensuring every garment supports the preservation of ancient techniques.</p>
					</div>
					<div className='flex gap-4'>
						<button className='p-4 border border-outline-variant rounded-full hover:bg-primary hover:text-white transition-all'>
							<span className='material-symbols-outlined' data-icon='chevron_left'>chevron_left</span>
						</button>
						<button className='p-4 border border-outline-variant rounded-full hover:bg-primary hover:text-white transition-all'>
							<span className='material-symbols-outlined' data-icon='chevron_right'>chevron_right</span>
						</button>
					</div>
				</div>
				<div className='grid gird-cols-1 md:grid-cols-12 gap-gutter'>
					<div className='md:col-span-7 group relative overflow-hidden roundex-xl h-[500px] shadow-sm'>
						{products.map((product) => (
						<img key={product.id} src={product.image_url} alt={product.name} className='w-full h-full object-cover transition-transform druation-700 group-hover:scale-110 '/>
						))}
						<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
						<div className='absolute bottom-0 left-0 right-0 p-4 glass-card m-6 rounded-lg'>
							<span className='font-label-sm text-label-sm text-secondary-container mb-2 block'>GHANA</span>
							{products.map((product) => (
							<h3 key={product.id} className='font-headline-lg text-headline-lg text-white mb-2'>{product.title}</h3>
							))}
							<p className='text-white/80 font-body-sm'>Reserved for kings and queens, our Kente is woven using the double-weave technique in Bonwire.</p>
						</div>
					</div>
					<div className='md:col-span-5 group relative overflow-hidden rounded-xl h-[500px] shadow-sm'>
						<img src='/trad.png' alt='traditional attire' className='w-full h-full object-cover transition-transoform duration-700 group-hover:scale-110'/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
						<div className='absolute bottom-0 left-0 right-0 p-4 glass-card m-6 rounded-lg'>
							<span className='font-label-sm text-label-sm text-secondary mb-2 block'>NIGERIA</span>
							<h3 className='font-headline-lg text-headline-lg text mb-2 '>Aso-Oke Silk</h3>
							<p className='text-white/80 font-body-md'>The 'Top Cloth' of the Yoruba, known for its prestige and structural elegance.</p>
						</div>
					</div>
					<div>
					</div>
				</div>
			</section>
			<section className='py-24 bg-surface-container-low'>
				<div className='px-margin-desktop max-w-container-max mx-auto'>
					<div className='flex justify-between items-center mb-16'>
						<h2 className='font-display-lg text-display-lg'>The Collection</h2>

						<div className='flex items-center gap-4 min-w-[200px]'>
							<label htmlFor='sortProducts' className='sr-only'>Sort Products</label>
							<select
								id='sortProducts'
								value={sortBy}
								onChange={handleSortChange}
								className='w-full px-4 py-3 bg-transparent border border-outline-variant rounded-xl font-label-md text-on-background focus:outline-none focus:border-primary transition-all cursor-pointer'
							>
								{SORT_OPTIONS.map((option) => (
									<option key={option.value} value={option.value} className='bg-background text-on-background'>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter px-6'>
					{loading ? (
						<div className="col-span-full text-center py-10 text-on-surface-variant">Loading our collection...</div>
					) : products.length === 0 ? (
						<div className="col-span-full text-center py-10 text-on-surface-variant">No items found in this collection.</div>
					) : (
						products.map((product) => (
							<div key={product.id} className='group flex flex-col justify-between h-full'>
								<div>
									<div className='relative aspect-[3/4] overflow-hidden rounded-xl mb-4 shadow-sm bg-surface-container-high'>
										<img
											src={product.image_url || "/fallback-product.png"}
											alt={product.name}
											className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
										/>

										{renderTag(product.tag || product.tags)}

										<button
											onClick={() => handleAddToCartWithValidation(product)}
											className='absolute bottom-4 p-2 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-primary opacity-0 translate-y-4 transition-all group-hover:translate-y-0 group-hover:opacity-100 shadow-md cursor-pointer hover:bg-primary hover:text-white z-30'
										>
											<span className='material-symbols-outlined' data-icon='shopping_bag'>shopping_bag</span>
										</button>
									</div>

									<h4 className='font-title-md text-title-md mb-1'>{product.name}</h4>
									<p className='text-primary font-bold mb-2'>${Number(product.price).toFixed(2)}</p>
									<p className='font-label-sm text-label-sm text-on-surface-variant mb-3 line-clamp-2'>{product.description}</p>
								</div>

								{/* Sizes Selector Implementation Interface */}
								{product.sizes && product.sizes.length > 0 && (
									<div className='mt-2 pt-2 border-t border-outline-variant/10'>
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
								)}
							</div>
						))
					)}
				</div>

				{/* Load More Controller */}
				{hasMore && products.length > 0 && (
					<div className='mt-20 text-center'>
						<button
							disabled={loadingMore}
							onClick={() => setPage(prev => prev + 1)}
							className='px-12 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all scale-95 active:scale-90 disabled:opacity-50 cursor-pointer'
						>
							{loadingMore ? 'Fetching Collections...' : 'Load More Designs'}
						</button>
					</div>
				)}

			</section>
			<section className='py-32 bg-background overflow-hidden relative'>
				<div className='absolute top-0 left-0 w-full h-full opacity-5 pointer-events:none'>
					<div className='grid grid-cols-6 h-full'>
						<div className='border-r border-primary'></div>
						<div className='border-r border-primary'></div>
						<div className='border-r border-primary'></div>
						<div className='border-r border-primary'></div>
						<div className='border-r border-primary'></div>
					</div>
				</div>
				<div className='px-margin-desktop max-w-container-max mx-auto text-center relative z-10'>
					<span className='material-symbols-outlined text-primary text-5xl mb-8' data-icon="format_quote"
					      style={{fontVariationSettings: "'FILL' 1"}}>format_quote</span>
					<blockquote className='font-display-lg text-display-lg mb-8 max-w-4xl mx-auto leading-tight'>
						"We don't just sell clothing; we preserve the rhythmic <span
						className="text-primary italic">heritage</span> that defines a continent's future."
					</blockquote>
					<cite className="font-label-sm text-label-sm text-on-surface-variant tracking-[0.2em] uppercase">Eucharia Chikwado, Master Weaver</cite>
				</div>
			</section>
			<Footer/>
		</div>
	)
}
export default Hero
