'use client'

import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {supabase} from "@/lib/supabaseClient";
import {Category, ProductUploadModalProps} from "@/types";

const ProductUploadModal = ({onClose, onSuccess} : ProductUploadModalProps)  => {
	// Database and Form States
	const [categories, setCategories] = useState<Category[]>([])
	const [name, setName] = useState<string>('')
	const [categoryId, setCategoryId] = useState<string>("")
	const [price, setPrice] = useState<string>('')
	const [description, setDescription] = useState<string>('')
	const [selectedSizes, setSelectedSizes] = useState<string[]>([])

	// Dynamic Tag & Inventory States
	const [totalUnits, setTotalUnits] = useState<string>('')
	const [productTags, setProductTags] = useState<string[]>(['Handmade', 'Limited Edition', 'Bestseller', 'New Arrival', 'Popular'])
	const [selectedTag, setSelectedTag] = useState("New Arrival")
	const [newTagInput, setNewTagInput] = useState<string>('')
	const [isAddingTag, setIsAddingTag] = useState<boolean>(false)

	// Image State Management (Primary View)
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [imagePreview, setImagePreview] = useState<string>('')
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

	// NEW: State arrays to capture multi-angle secondary views
	const [galleryFiles, setGalleryFiles] = useState<(File | null)[]>([null, null, null])
	const [galleryPreviews, setGalleryPreviews] = useState<string[]>(['', '', ''])

	const availableSizes = ['XS', 'S', 'M', 'L', 'XL']

	useEffect(() => {
		const fetchCategories = async () => {
			const { data, error } = await supabase
				.from("categories")
				.select("id, name")

			if(!error) setCategories(data)
		}
		fetchCategories()
	}, []);

	const handleAddTag = () => {
		const trimmed = newTagInput.trim()
		if(trimmed && !productTags.includes(trimmed)){
			setProductTags([...productTags, trimmed])
			setSelectedTag(trimmed)
		}
		setNewTagInput('')
		setIsAddingTag(false)
	}

	const handleRemoveTag = (tagToRemove: string) => {
		setProductTags(productTags.filter((tag) => tag !== tagToRemove))
	}

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.files && e.target.files[0]) {
			const file = e.target.files[0]
			setImageFile(file)
			setImagePreview(URL.createObjectURL(file))
		}
	}

	// NEW: Individual position file assignment handler
	const handleGalleryFileChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0]

			const newFiles = [...galleryFiles]
			newFiles[index] = file
			setGalleryFiles(newFiles)

			const newPreviews = [...galleryPreviews]
			newPreviews[index] = URL.createObjectURL(file)
			setGalleryPreviews(newPreviews)
		}
	}

	// NEW: Clear assigned image from state
	const handleRemoveGalleryImage = (index: number, e: React.MouseEvent) => {
		e.preventDefault()
		e.stopPropagation()

		const newFiles = [...galleryFiles]
		newFiles[index] = null
		setGalleryFiles(newFiles)

		const newPreviews = [...galleryPreviews]
		newPreviews[index] = ''
		setGalleryPreviews(newPreviews)
	}

	const handleSizeToggle = (size: string) => {
		if (selectedSizes.includes(size)){
			setSelectedSizes(selectedSizes.filter((s) => s !== size))
		}else {
			setSelectedSizes([...selectedSizes, size])
		}
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault()
		if(!name || !categoryId || !price){
			alert('Please fill out all required general detail')
			return
		}
		setIsSubmitting(true)

		let imageUrl = ''
		let galleryUrls: string[] = []

		try {
			// 1. Upload primary cover view asset
			if(imageFile){
				const fileExt = imageFile.name.split('.').pop()
				const fileName = `${Date.now()}-primary-${Math.random().toString(36).substring(2)}.${fileExt}`
				const filePath = `product-images/${fileName}`

				const { error: uploadError } = await supabase.storage
					.from('products')
					.upload(filePath, imageFile, { cacheControl: '3600', upsert: false })

				if(uploadError) throw uploadError

				const {data: publicUrlData} = supabase.storage
					.from('products')
					.getPublicUrl(filePath)

				imageUrl = publicUrlData.publicUrl
				galleryUrls.push(imageUrl) // Main cover view populates the first slot in the images column
			}

			// 2. Concurrently upload present secondary views
			for (let i = 0; i < galleryFiles.length; i++) {
				const activeFile = galleryFiles[i];
				if (activeFile) {
					const ext = activeFile.name.split('.').pop()
					const pathName = `product-images/${Date.now()}-angle-${i}-${Math.random().toString(36).substring(2)}.${ext}`

					const { error: gErr } = await supabase.storage
						.from('products')
						.upload(pathName, activeFile, { cacheControl: '3600', upsert: false })

					if (gErr) throw gErr

					const { data: pUrl } = supabase.storage
						.from('products')
						.getPublicUrl(pathName)

					galleryUrls.push(pUrl.publicUrl)
				}
			}

			// 3. Write structured payload to database rows
			const { error: insertError } = await supabase
				.from('products')
				.insert([
					{
						name,
						category_id: categoryId,
						price: parseFloat(price),
						description,
						image_url: imageUrl,
						images: galleryUrls, // Maps directly to the text array migration column field
						sizes: selectedSizes,
						tag: selectedTag,
						stock: totalUnits ? parseInt(totalUnits, 10) : null
					}
				])
			if(insertError) throw insertError

			alert('Product successfully cataloged!')
			if(onSuccess) onSuccess()
			onClose()

		}catch (error: any){
			console.error("Submission pipeline breakdown", error)
			alert(error.message || 'An error occurred while saving the product')
		}finally {
			setIsSubmitting(false)
		}
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{opacity: 0, y:-50}}
			transition={{ duration: 0.5, ease: 'easeInOut'}}

			className='flex justify-center px-16 mt-6 mb-12 overflow-y-auto scrollbar-hide-auto p-spacing-margin-desktop bg-surface-bright/70 fixed inset-0 z-50'>
			<div className='w-[70%] bg-white px-4'>
				<div className='w-full flex justify-between'>
					<div className=''>
						<h2 className='font-bold text-primary text-[30px]'>Add New Collection</h2>
						<p className='text-primary/60'>Catalog a new garment into the Heritage management system</p>
					</div>
					<div className='flex items-center gap-4'>
						<button
							type='button'
							disabled={isSubmitting}
							onClick={onClose} className='px-6 py-2.5 font-bold text-on-surface-variant hover:shadow-gray-500 glass-card rounded-xl cursor-pointer hover:bg-primary transition-all active:scale-95'>
							Cancel
						</button>
						<button
							type='button'
							onClick={handleSubmit}
							disabled={isSubmitting}
							className='px-8 py-2.5 font-bold text-white bg-primary shimmer-btn cursor-pointer rounded-lg shadow-xl hover:shadow-primary/20 active:scale-95'>
							{isSubmitting ? 'Saving...' : 'Save Product'}
						</button>
					</div>

				</div>
				<div className='grid grid-cols-1 lg:grid-cols-12 gap-gutter bg-white/80'>
					<div className='lg:col-span-5 space-y-gutter'>
						<div className='glass-panel rounded-xl p-6 overflow-hidden flex flex-col items-center'>
							<label className='w-full text-title-md font-bold text-primary mb-6 flex items-center'>
								<span className='material-symbols-outlined'>image</span>Product Visual
							</label>
							{/*Hidden Native Input activated by Custom UI click*/}

							<input type='file' id='primary-image-upload' accept='image/*' className='hidden' onChange={handleImageChange}/>
							<label
								htmlFor="primary-image-upload"
								className='relative w-full aspect-[3/5] rounded-lg overflow-hidden group cursor-pointer border border-outline-variant/20 mb-6 bg-surface-container-lowest'>
								{imagePreview ? (
								<img
									className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
									alt='Product preview'
									src={imagePreview}
								/>
								):(
									<div className="flex flex-col items-center text-on-surface-variant/60 p-4 text-center">
										<span className="material-symbols-outlined text-5xl mb-2">add_a_photo</span>
										<span className="font-semibold text-sm">Upload Base Artwork</span>
									</div>

								)}
								<div
									className="absolute inset-0 bg-on-surface/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
									<button className="flex flex-col items-center text-white">
										<span className="material-symbols-outlined text-4xl mb-2">upload_file</span>
										<span className="font-bold">{imagePreview ? 'Replace Image' : 'Choose File'}</span>
									</button>
								</div>
								<div className="absolute bottom-0 left-0 right-0 p-4 bg-white/40 backdrop-blur-md border-t border-white/20">
									<p className="text-label-sm text-on-surface font-bold uppercase tracking-wider">Primary View</p>
								</div>
							</label>

							<div className='grid grid-cols-3 gap-3 w-full'>
								{[0, 1, 2].map((idx) => {
									const labelText = idx === 0 ? 'Rear View' : idx === 1 ? 'Side View' : 'Detail View';
									return (
										<div key={idx} className="relative aspect-square w-full">
											<input
												type="file"
												id={`gallery-upload-${idx}`}
												accept="image/*"
												className="hidden"
												onChange={(e) => handleGalleryFileChange(e, idx)}
											/>

											{galleryPreviews[idx] ? (
												<div className="relative w-full h-full rounded-lg overflow-hidden border border-outline-variant group">
													<img src={galleryPreviews[idx]} alt={labelText} className="w-full h-full object-cover" />
													<button
														type="button"
														onClick={(e) => handleRemoveGalleryImage(idx, e)}
														className="absolute top-1 right-1 p-1 bg-black/60 rounded-full text-white hover:bg-red-500 transition-colors cursor-pointer z-10 flex items-center justify-center"
														title="Remove Image"
													>
														<span className="material-symbols-outlined text-xs">close</span>
													</button>
													<div className="absolute bottom-0 left-0 right-0 bg-black/50 text-[9px] text-white text-center py-0.5 font-medium uppercase tracking-wider">
														{labelText.split(' ')[0]}
													</div>
												</div>
											) : (
												<label
													htmlFor={`gallery-upload-${idx}`}
													className="w-full h-full rounded-lg border-2 border-dashed border-outline-variant/40 flex flex-col items-center justify-center text-on-surface-variant/40 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all cursor-pointer text-center p-1"
													title={`Upload ${labelText}`}
												>
													<span className="material-symbols-outlined text-2xl">add_photo_alternate</span>
													<span className="text-[9px] font-bold uppercase tracking-tighter mt-1">{labelText.split(' ')[0]}</span>
												</label>
											)}
										</div>
									);
								})}

							</div>

						</div>

					{/*	Inventory Quick Stats*/}
						<div className='glass-panel rounded-xl p-6 bg-tertiary/5 border-tertiary/10'>
							<h4 className='text-on-tertiary-container font-bold mb-4 flex items-center gap-2'>
								<span className='material-symbols-outlined'>analytics</span>Logistics Summary
							</h4>
							<div className='space-y-3'>
								<div className='flex justify-between items-center text-body-md text-on-surface-variant'>
									<span>Stock Health</span>
									<span className='px-2 py-0.5 rounded text-label-sm font-bold bg-tertiary-container/20 text-tertiary'>Drafting</span>
								</div>
								<div className='flex justify-between items-center text-body-md text-on-surface-variant'>
									<span>Storage Tier</span>
									<span className='font-bold text-on-surface'>Premium Silk</span>
								</div>
							</div>
						</div>
					</div>
					{/*Right: Form Details */}
					<div className='lg:col-span-7'>
						<div className='glass-panel rounded-xl p-8 h-full '>
							<form className='space-y-10' onSubmit={handleSubmit}>
								{/*	Section 1: Basic Info*/}
								<div>
									<h3 className="text-title-md font-bold text-primary mb-6 pb-2 border-b border-outline-variant/20">General
										Details</h3>
									<div className='grid grid-cols-1 md:grid-cols-2 gap-x-gutter gap-y-6'>
										<div className='col-span-2 w-full'>
											<label
												className="block text-label-sm font-bold text-on-surface-variant uppercase mb-2">Product
												Name</label>
											<input
												value={name}
												onChange={(e) => setName(e.target.value)}
												required
												className="input-minimal w-full py-3 px-2 text-body-lg font-medium"
											    placeholder="e.g. Royal Aso-Oke Gala Wrap" type="text"/>
										</div>
									</div>
									<div>
										<label
											className="block text-label-sm font-bold text-on-surface-variant uppercase mb-2">Collection
											Category</label>
										<select value={categoryId}
										        onChange={(e) => setCategoryId(e.target.value)}
										        className="input-minimal w-full py-3 px-0 text-body-md">
											<option value="">Select Category</option>
											{categories.map((c) => (
											<option key={c.id} value={c.id}>{c.name}</option>
											))}
										</select>
									</div>
									<div>
										<label
											className="block text-label-sm font-bold text-on-surface-variant uppercase mb-2">Base
											Price (USD)</label>
										<div className="relative">
											<span
												className="absolute left-0 top-1/2 -translate-y-1/2 font-bold text-on-surface-variant opacity-40">$</span>
											<input
												step="0.01"
												value={price}
												onChange={(e) => setPrice(e.target.value)}
												required
												className="input-minimal w-full py-3  px-4 pr-0 text-body-md font-bold"
												placeholder="0.00" type="number"/>
										</div>
									</div>
								</div>
								<div>
									<label
										className="block text-label-sm font-bold text-on-surface-variant uppercase mb-4">Artisanal
										Description</label>
									<div
										className='bg-surface-container-low rounded-lg p-2 border border-outline-variant/30'>

										<div
											className="flex items-center gap-1 mb-2 pb-2 border-b border-outline-variant/20">
											<button className="p-1.5 hover:bg-white rounded transition-colors"
											        type="button"><span
												className="material-symbols-outlined text-sm">format_bold</span>
											</button>
											<button className="p-1.5 hover:bg-white rounded transition-colors"
											        type="button"><span
												className="material-symbols-outlined text-sm">format_italic</span>
											</button>
											<button className="p-1.5 hover:bg-white rounded transition-colors"
											        type="button"><span
												className="material-symbols-outlined text-sm">format_list_bulleted</span>
											</button>
											<button className="p-1.5 hover:bg-white rounded transition-colors"
											        type="button"><span
												className="material-symbols-outlined text-sm">link</span></button>
										</div>

										<textarea
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											className="w-full bg-transparent border-none focus:ring-0 text-body-md resize-none"
											placeholder="Describe the heritage, weave pattern, and craftsman's intent..."
											rows={4}>
										</textarea>
									</div>
								</div>
								<div>
									<h3 className="text-title-md font-bold text-primary mb-6 pb-2 border-b border-outline-variant/20">Inventory &amp; Sizing</h3>
									<div>
										<label
											className="block text-label-sm font-bold text-on-surface-variant uppercase mb-2">Available Sizes
										</label>
										<div className="flex flex-wrap gap-2">
											{availableSizes.map((size) => {
												const isSelected = selectedSizes.includes(size);
												return (
													<button
														key={size}
														type='button'
														onClick={() => handleSizeToggle(size)}
														className={`px-4 py-2 rounded-lg border text-label-sm font-bold transition-all ${isSelected ? 'border-primary bg-primary/5 text-primary' : 'border-outline-variant/40 text-label-sm font-bold hover:bg-primary/5 hover:border-primary'}`}
													>
														{size}
													</button>
												)
											})}
										</div>
									</div>
								</div>
								<label className="block text-label-sm font-bold text-on-surface-variant uppercase mb-2">Total
									Unit Count</label>
								<input
									value={totalUnits}
									onChange={(e) => setTotalUnits(e.target.value) }
									className="input-minimal w-full py-3 px-2 text-body-md font-bold"
								       placeholder="25" type="number"/>

								<div className='pt-6'>
									<label
										className="block text-label-sm font-bold text-on-surface-variant uppercase mb-3">Attributes</label>
									<div className='flex flex-wrap gap-3'>
										{productTags.map((tag) => {
											const isSelected = selectedTag === tag;
											return(
												<button key={tag}
												        type='button'
												        onClick={() => setSelectedTag(tag)}
												        className={`text-xs px-3 py-1.5 rounded-full border transition-all font-semibold flex items-center gap-1 cursor-pointer ${
													        isSelected
														        ? 'bg-primary text-white border-primary shadow-sm scale-105'
														        : 'border-outline-variant/60 text-on-surface-variant hover:border-primary hover:text-primary'
												        }`}
												>
													<span>
													{tag}
													</span>
													{isSelected && <span className='material-symbols-outlined text-[10px]'>check</span>}
													<span onClick={() => handleRemoveTag(tag)}
													      className="material-symbols-outlined text-[14px] cursor-pointer">close</span>
										</button>
											)
										})}
										{!isAddingTag ? (
											<button type='button'
											        onClick={() => setIsAddingTag(true)}
											        className='text-xs px-3 py-1.5 rounded-full border border-dashed border-outline text-primary font-bold hover:bg-primary/5 transition-all cursor-pointer'
											>
												+ Custom Tag
											</button>
											):(
											<div className='flex items-center gap-1 border border-primary rounded-full px-3 py-1 bg-white'>
											<input
												type='text'
												value={newTagInput}
												onChange={(e) => setNewTagInput(e.target.value)}
												onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
												placeholder='Custom tag...'
												className='border border-primary rounded-lg px-2.5 py-1 text-xs focus:outline-none w-28 bg-white'
												autoFocus
											/>
												<button
													type='button'
													onClick={handleAddTag}
													className='p-1 bg-primary text-white rounded-md cursor-pointer'
												>
													<span className='material-symbols-outlined text-xs'>check</span>
												</button>
												<button
													type='button'
													onClick={() => setIsAddingTag(false)}
													className='p-1 bg-surface-container border border-outline text-on-surface-variant rounded-md cursor-pointer'
												>
													<span className='material-symbols-outlined text-xs'>close</span>
												</button>
											</div>
										)}
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

			</div>
		</motion.div>
	)
}
export default ProductUploadModal
