import React from 'react'

const ProductCard = () => {
	return (
		<section className='mt-12'>
			<div className='py-12 bg-surface-container-low/30'>
				<div className='px-margin-desktop max-w-container-max mx-auto'>
					<div className='flex justify-between items-end mb-12'>
						<div>
							<h2 className='font-headline-lg text-headline-lg text-on-background'>
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

				{/*Product 1*/}
				<div className='group cursor-pointer'>
					<div className='relative aspect-[3/4] rounded-3xl overflow-hidden glass-panel mb-4'>
						<img alt='Product 1' className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
						     src='https://lh3.googleusercontent.com/aida-public/AB6AXuChBkb3UbW2TdKcUIuvPrryOTuCBJXR0u38sGFTOI4ksl_gzOwiHHScwSVb9Zok5HKT8AD5fOjqiohcbOBY4borK35UsbiNGwVbX06T4UIu49pH-f0wq0N404ydZKAcWJ4Ul15r-P-ifWPfcivfRAEufM0DrLyqyK5J28QpJbZHxBRc2pMK-02glV_8konRWSDxMTBEaRCVEX1EPPhGLYnpIEBdrnrL2gU0s93sJwigEUpMma_--u4BsHYTWIUV1W2RTM8M9EzvCFyK'
						/>
						<div className='absolute top-4 left-4'>
							<span className='bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full text-label-sm font-label-sm text-primary'>Limited Edition</span>
						</div>
						<div className='absolute px-8 bottom-0 left-0 right-0 glass-panel translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<button className='w-full shimmer-btn text-white py-3 rounded-xl font-title-md text-title-md flex justify-center items-center gap-2'>
								<span className='material-symbols-outlined' data-icon='add_shopping_cart'>add_shopping_cart</span>Add to Bag
							</button>
						</div>
					</div>
						<div className='px-2'>
							<h3 className='font-title-md text-title-md text-on-surface'>Linen Horizon Tunic</h3>
							<p className='text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-widest'>Heritage Cotton Mix</p>
							<span className='text-primary font-bold text-lg'>$185.00</span>
						</div>
				</div>

				{/*Product 2*/}
				<div className='group cursor-pointer'>
					<div className='relative aspect-[3/4] rounded-3xl overflow-hidden glass-panel mb-4'>
						<img alt='Product 1' className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
						     src='https://lh3.googleusercontent.com/aida-public/AB6AXuAs1lT5pLxoBmUUj-hG4BWfUFQwNJzEDakRW-NIjKAUQfKVuHhzilk5SryuHBUzEP57tsQKM7LSoL4a8uVH-61IkPsHZa9CdJYwAKwWJ-Iu_MbH-lHFINKLICzFaw6PHjVAIrU6Eqqs8Cjrv8C85LikLvu3mavdGk-VIC12m9QVTBt--mDJkK3v5oFB_NsFzh28kRJCCxqq7ZOzm6fG-CMb2gTMtpBAlLiB-y6Bi1V1TRLKQtb8blyjv3rJ0fX3FGr7sgHffE3wbQwY'
						/>
						<div className='absolute bottom-0 left-0 right-0 px-8 glass-panel translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<button className="w-full shimmer-btn text-white  py-3 rounded-xl font-title-md text-title-md flex justify-center items-center gap-2 bg-gradient-r from-primary to-secondary">
								<span className="material-symbols-outlined" data-icon="add_shopping_cart">add_shopping_cart</span> Add to Bag
							</button>
						</div>
					</div>
					<div className='px-2'>
						<h3 className='font-title-md text-title-md text-on-surface'>Indigo Accent Shirt</h3>
						<p className='text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-widest'>Adire
							Print Detail</p>
						<span className='text-primary font-bold text-lg'>$140.00</span>
					</div>
				</div>


				{/*Product 3*/}
				<div className='group cursor-pointer'>
					<div className='relative aspect-[3/4] rounded-3xl overflow-hidden glass-panel mb-4'>
						<img alt='Product 1' className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
						     src='https://lh3.googleusercontent.com/aida-public/AB6AXuAr4oofzY-y58-kus9XA8ZCoKrYvjf9E-aN7RWEWyLZgPshQ-TJDKP05kVzK80hbRS6b6vp2XMcvy0q-nmhkBjY5RJUy0kj9h4uFvRIkrwH7tPbTHI-BCxJK_2Y1TbISDSOj3RQqpD3eQrWhcMEKUqZeKd5kb71ypr_tu-Id-rLKxvLIyqLNXDpXX3z9e7mNrYv1CvKhr3wCgO0uKfDasO9K_8iIByDffSil2veSJ5OcW8q9BlW33u056auuw6syj4aR0vO76lq8HsZ'
						/>
						<div className='absolute bottom-0 px-8 left-0 right-0 glass-panel translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<button className='w-full shimmer-btn text-white py-3 rounded-xl font-title-md text-title-md flex justify-center items-center gap-2'>
								<span className='material-symbols-outlined' data-icon='add_shopping_cart'>add_shopping_cart</span>Add to Bag
							</button>
						</div>
					</div>
					<div className='px-2'>
						<h3 className='font-title-md text-title-md text-on-surface'>Sahara Drap Dress</h3>
						<p className='text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-widest'>Oraganic Silk Blend</p>
						<span className='text-primary font-bold text-lg'>$220.00</span>
					</div>
				</div>

				{/*Product 4*/}
				<div className='group cursor-pointer'>
					<div className='relative aspect-[3/4] rounded-3xl overflow-hidden glass-panel mb-4'>
						<img alt='Product 1' className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
						     src='https://lh3.googleusercontent.com/aida-public/AB6AXuA_elAYgD8FPhrGTXYwAuYWpEtoltGV9q4VhDwOeL3UyTH6-za_sAgt5vngRVOlM5_czSPPkDT6JTXAEF8cIORNMHr7ENVHFHHM_ArMAq9E-EsjvjlBQW68HMNT_UvdEiMKgMwY9Q5nH4dP6GncM9PF2X6jiqB7s0Dbuqd_LTfBtCF13zv1Wwirx1sdEsnx6uf_kH-F7LJWEkJFaQMoTsLeifnkZtxQBIzEzBtA0LTr86tByV7lHyz8uJJJG0Ef31_kqg1a9HzDrrhw'
						/>
						<div className='absolute top-4 left-4'>
							<span className='bg-tertiary/90 backdrop-blur-md px-3 py-1 rounded-full text-label-sm font-label-sm text-white'>Popular</span>
						</div>
						<div className='absolute px-8 bottom-0 left-0 right-0 glass-panel translate-y-full group-hover:translate-y-0 transition-transform duration-300'>
							<button className='w-full shimmer-btn text-white py-3 rounded-xl font-title-md text-title-md flex justify-center items-center gap-2'>
								<span className='material-symbols-outlined' data-icon='add_shopping_cart'>add_shopping_cart</span>Add to Bag
							</button>
						</div>
					</div>
					<div className='px-2'>
						<h3 className='font-title-md text-title-md text-on-surface'>Geometric Knit Shell</h3>
						<p className='text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-widest'>Fine Gauge Knit</p>
						<span className='text-primary font-bold text-lg'>$110.00</span>
					</div>
				</div>
			</div>
			<div className='mt-16 flex justify-center'>
				<button className='glass-panel px-12 py-4 rounded-full font-title-md text-title-md hover:scale-105 active:sc'>
					Explore More Casual Chic
				</button>
			</div>
		</section>
	)
}
export default ProductCard
