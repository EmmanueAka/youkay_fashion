import React, {useEffect, useRef, useState} from 'react'
import ProductUploadModal from "@/components/ProductUploadModal";
import {Category, ProductRecord} from "@/types";
import {supabase} from "@/lib/supabaseClient";


const Products = () => {
	const [showModal, setShowModal] = useState(false)
	const [products, setProducts] = useState<ProductRecord[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [isDeletingId, setIsDeletingId] = useState<string | number | null>(null)

	// Filter States
	const [categories, setCategories] = useState<Category[]>([])
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | number | 'all'>('all')
	const [showFilterDropDown, setShowFilterDropDown] = useState<boolean>(false)
	const dropdownRef = useRef<HTMLDivElement>(null)

	// Pagination States
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalCount, setTotalCount] = useState<number>(0)
	const ITEMS_PER_PAGE = 10


	useEffect(() => {
		const fetchCategories = async () => {
			const {data, error} = await supabase
				.from('categories')
				.select("id, name")

			if(!error && data ) setCategories(data)
		}
		fetchCategories()
	}, []);

	useEffect(() => {
		const handleClickOutSide = (event: MouseEvent ) => {
			if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
				setShowFilterDropDown(false)
			}
		}

		document.addEventListener('click', handleClickOutSide, true);

		return () => {
			document.removeEventListener('click', handleClickOutSide, true)
		}
	}, []);


	const fetchInventory = async () => {
		setIsLoading(true)
		try {
			const from = (currentPage - 1) * ITEMS_PER_PAGE
			const to = from + ITEMS_PER_PAGE - 1

			let query = supabase
				.from('products')
				.select(`id, name, price, description, image_url, sizes, tag, stock, created_at, categories (name)`, { count: 'exact'})

			if (selectedCategoryId !== 'all'){
				query = query.eq('category_id', selectedCategoryId)
			}

			const { data, error, count} = await query
				.order('created_at', { ascending: false})
				.range(from, to)

			if( error ) throw error
			if(data) setProducts(data as any[])
			if(count !== null ) setTotalCount(count)
		}catch (error){
			console.error('Inventory retrieval exception:', error)
		}finally {
			setIsLoading(false)
		}

	}


	useEffect(() => {
		fetchInventory()
	}, [currentPage, selectedCategoryId]);

	const handleCategorySelect = (id: string | number | 'all') => {
		setSelectedCategoryId(id)
		setCurrentPage(1)
		setShowFilterDropDown(false)
	}

	const handleDelete = async (product: ProductRecord) => {
		const confirmDelete = window.confirm(`Are you sure you want to permanently remove "${product.name}" from the inventory?`)
		if(!confirmDelete) return

		try {
			if(product.image_url){
				const urlParts = product.image_url.split('/storage/v1/object/public/products')

				if(urlParts.length === 2){
					const filePath = urlParts[1]

					const { error: storageError } = await supabase.storage
						.from('products')
						.remove([filePath])

					if (storageError){
						console.warn("storage deletion warning (Proceeding with DB purge):", storageError.message)
					}
				}
			}

			const { error: dbError } = await supabase
				.from('products')
				.delete()
				.eq('id', product.id)

			if(dbError) throw dbError

			setProducts((prevProducts) => prevProducts.filter((p) => p.id !== product.id))
			alert('Artifact removed successfully.')
		}catch (error:any){
			console.error('Delete handler failed:', error.message)
			alert(error.message || 'An error occurred while attempting delete')
		}finally {
			setIsDeletingId(null)
		}
	}

	const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)
	const getPaginationRange = () => {
		const delta = 1
		const range: (number | string)[] = []

		for(let i = 1; i <= totalPages; i++){
			if(i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta )){
				range.push(i)
			}else if (range[range.length - 1] ! !== '...'){
				range.push('...')
			}
		}

		return range
	}

	const showingFrom = totalCount === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1
	const showingTo = Math.min(currentPage * ITEMS_PER_PAGE, totalCount)
	const activeCategoryLabel = selectedCategoryId === 'all' ? 'All Pieces' : categories.find(c => c.id === selectedCategoryId)

	const totalArtifactsCount = products.reduce((acc, curr) => acc + (curr.stock || 0), 0)
	return (
		<div>
				<div className='w-full flex items-center justify-between px-4 relative'>
					{showModal && (<ProductUploadModal onClose={() => setShowModal(false)}/>)}
					<div>
						<h2 className='font-bold text-primary text-[36px]'>Product Inventory</h2>
						<p className='text-on-surface-variant'>
							{isLoading ? 'Scanning inventory collections...' : `Managing ${totalArtifactsCount.toLocaleString()} high-end textile artifacts`}
						</p>
					</div>

					<div className='flex items-center gap-3' ref={dropdownRef}>
						<span>Filter Category</span>
						<button
							onClick={() => setShowFilterDropDown(!showFilterDropDown)}
							className={`flex items-center cursor-pointer gap-2 px-4 py-2.5 rounded-lg transition-colors font-semibold ${selectedCategoryId !== 'all' ? 'bg-primary/5 border-primary text-primary shadow-sm' : 'bg-surface-container border-outline-variant text-primary hover:bg-surface-bright'}`}>
							<span className='material-symbols-outlined text-[20px]'>filter_list</span>
						</button>
						{showFilterDropDown && (
							<div className="absolute right-5 top-full mt-2 w-56 bg-white border border-outline-variant/30 rounded-xl shadow-xl z-50 overflow-hidden py-1 animate-in fade-in slide-in-from-top-2 duration-150">
								<div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant/60 border-b border-outline-variant/10">
									Filter Collection
								</div>
								<button
									onClick={() => handleCategorySelect('all')}
									className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-container flex items-center justify-between ${selectedCategoryId === 'all' ? 'text-primary bg-primary/5 font-bold' : 'text-on-surface-variant'}`}
								>
									<span>All Collections</span>
									{selectedCategoryId === 'all' && <span className="material-symbols-outlined text-sm">check</span>}
								</button>
								{categories.map((cat) => {
									const isSelected = selectedCategoryId === cat.id
									return (
										<button
											key={cat.id}
											onClick={() => handleCategorySelect(cat.id)}
											className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors hover:bg-surface-container flex items-center justify-between ${isSelected ? 'text-primary bg-primary/5 font-bold' : 'text-on-surface-variant'}`}
										>
											<span>{cat.name}</span>
											{isSelected && <span className="material-symbols-outlined text-sm">check</span>}
										</button>
									)
								})}
							</div>
						)}

						<button onClick={() => setShowModal(true)} className='shimmer-btn cursor-pointer flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg shadow-lg hover:scale-[1.02] transition-transform active:scale-95 font-bold'>
							<span className='material-symbols-outlined '>add</span>
							<span>Add New Product</span>
						</button>

					</div>
				</div>
			<section
				className='glass-panel px-4 rounded-xl overflow-y-auto scrollbar-hide-default border border-white/20 '>
				<div className='overflow-x-auto'>
					<table className='w-full border-collapse text-left'>
						<thead>
						<tr className="border-b border-outline-variant/20 bg-surface-container-low/50">
							<th className="p-6 font-title-md text-on-surface-variant text-[14px] uppercase tracking-widest">Product
								Details
							</th>
							<th className="p-6 font-title-md text-on-surface-variant text-[14px] uppercase tracking-widest">Category</th>
							<th className="p-6 font-title-md text-on-surface-variant text-[14px] uppercase tracking-widest">Price</th>
							<th className="p-6 font-title-md text-on-surface-variant text-[14px] uppercase tracking-widest">Stock
								Status
							</th>
							<th className="p-6 font-title-md text-on-surface-variant text-[14px] uppercase tracking-widest text-right">Actions</th>
						</tr>
						</thead>
						<tbody className='divide-y divide-outline-variant/10'>
						{isLoading ? (
							<tr>
								<td colSpan={5} className='p-12 text-center text-on-surface-variant'>
									<div className='flex flex-col items-center gap-2'>
										<span
											className='material-symbols-outlined animate-spin text-3xl'>progress_activity</span>
										<span className='font-semibold text-sm'>Syncing with the Database...</span>
									</div>
								</td>
							</tr>
						) : products.length === 0 ? (
							<tr>
								<td colSpan={5} className="p-12 text-center text-on-surface-variant">
									<div className="flex flex-col items-center gap-2">
										<span className="material-symbols-outlined text-4xl">inventory_2</span>
										<span
											className="font-semibold">No luxury products found in database stock.</span>
									</div>
								</td>
							</tr>
						) : (
							products.map((product) => {
								const units = product.stock ?? 0;

								let statusColor = 'bg-tertiary';
								let statusText = `In Stock (${units})`

								if (units === 0) {
									statusColor = 'bg-error'
									statusText = 'Out of Stock'
								} else if (units <= 5) {
									statusColor = 'bg-amber-500'
									statusText = `Low Stock(${units})`
								}
								return (
									<tr key={product.id} className='hover:bg-surface-bright/50 transition-colors group'>
										<td className='p-6'>
											<div className='flex items-center gap-4'>
												<div
													className='h-16 w-16 block items-center justify-center relative rounded-lg overflow-hidden border border-outline-variant/20 shadow-sm'>
													{product.image_url ? (
														<img
															className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
															alt={product.name}
															src={product.image_url}
														/>
													) : (
														<span
															className='material-symbols-outlined text-on-surface-variant/40'>image</span>
													)}
												</div>
												<div>
													<div
														className="font-title-md text-primary text-body-lg">{product.name}
													</div>
													<div
														className="text-on-surface-variant font-label-sm opacity-60">ID:
														#HER-{product.id}
													</div>
												</div>
											</div>
										</td>
										<td className="p-6">
											<span
												className="inline-flex items-center px-3 py-1 rounded-full text-tertiary bg-tertiary/10 font-label-sm border border-tertiary/20">{product.categories?.name || 'Unassigned'}</span>
										</td>
										<td className="p-6">
											<div
												className="font-title-md text-on-surface">${product.price.toLocaleString(undefined, {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2
											})}</div>
											<div className="text-on-surface-variant font-label-sm">USD</div>
										</td>
										<td className="p-6">
											<div className="flex items-center gap-2">
												<div
													className={`w-2 h-2 rounded-full bg-tertiary ${statusColor}`}></div>
												<span className="text-on-surface font-body-md">{statusText}</span>
											</div>
										</td>

										<td className="p-6 text-right flex items-center gap-2">
											<button
												className="p-2 flex items-center justify-center text-outline hover:text-primary hover:bg-primary/5 rounded-full transition-all">
												<span className="material-symbols-outlined">edit</span>
											</button>
											<button
												onClick={() => handleDelete(product)}
												className="p-2 flex items-center justify-center text-outline hover:text-error hover:bg-error/5 rounded-full transition-all">
												{isDeletingId ? (
													<span
														className="material-symbols-outlined animate-spin text-[24px]">progress_activity</span>

												) : (
													<span className="material-symbols-outlined">delete</span>
												)}
											</button>
										</td>
									</tr>
								)
							})
						)}

						</tbody>
					</table>
				</div>
				<div className="p-6 border-t border-outline-variant/20 flex justify-between items-center bg-surface-container-low/30">
					<span className="text-on-surface-variant font-body-md">Showing {showingFrom} to {showingTo} of {totalCount.toLocaleString()} products</span>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
							className="p-2 rounded-lg border border-outline-variant/40 hover:bg-surface-bright disabled:opacity-30"
							disabled={currentPage === 1 || isLoading}>
							<span className="material-symbols-outlined">chevron_left</span>
						</button>
						{getPaginationRange().map((page, idx) => {
							if (page === '...'){
								return <span key={`ellipsis-${idx}`} className='mx-1 text-on-surface-variant'>...</span>
							}
							const isActive = page === currentPage
							return (
								<button
									key={`page-${page}`}
									onClick={() => setCurrentPage(page as number)}
									disabled={isLoading}
									className={`h-10 w-10 rounded-lg font-bold transition-all cursor-pointer ${isActive ? 'bg-primary text-white' : 'hover:bg-surface-container-lowest text-on-surface-variant'}`}
								>
									{page}
								</button>
							)
						})}
						<button
							onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
							disabled={currentPage === totalPages || totalPages === 0 || isLoading}
							className="p-2 rounded-lg border border-outline-variant/40 hover:bg-surface-bright disabled:opacity-30 flex items-center cursor-pointer disabled:cursor-not-allowed"
						>
							<span className="material-symbols-outlined">chevron_right</span>
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}
export default Products
