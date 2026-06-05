import React from 'react'

const ProductModal = () => {
	return (
		<div className='relative h-[calc(100vh-80px)] w-full flex overflow-hidden'>
			<div className='absolute inset-0 z-0'>
				<img alt='Adire Silk Evening Gown' className='w-full h-full object-cover object-center'
				     src='https://lh3.googleusercontent.com/aida-public/AB6AXuDRQSQWDcH8SUJsvapwz6DM8aulMDgOngZNwEWfw-fzwWkRrZmJgZcAsRJJ68ajO3fPsrUfdgeKPma7BhACnO4kngwQsEDLZzDoaUAnPiYeI3O4_UrFqv6cLenIHLINd2oo9K7aVIKHLj0dpdV7Wh81mL-ptInl-bneb5FHijWRBTx5c5j7Md2I80jmrNay42Ct0cG0mNkuTkHuEsa2wChrR01ibbm4yoc1ZsyoZlrc3hp_VuVQZgKYielZu_zAWD7uVwdMRvCDfeb9'
				/>
			</div>
			{/*Left Sliding Detail Pane*/}
			<aside className='relative z-10 glass-panel w-full md:w-[480px] h-full flex flex-col overflow-y-auto scroll-hide transition-transform duration-700 ease-out translate-x-0' id='detail-pane'>
				<div className='p-margin-desktop space-y-10'>

					{/*Product Identity*/}
					<section>
						<div className='flex items-center gap-2 mb-4'>
							<span className='bg-tertiary/10 text-tertiary px-3 py-1 rounded-full text-label-sm font-label-sm uppercase tracking-wider'>Limited Edition</span>
						</div>
						<h1 className='font-display-lg text-display-lg text-on-surface leading-tight mb-2'>Adire Silk Evening Gown</h1>
						<p className='text-primary font-headline-lg text-headline-lg'>$280</p>
					</section>

				{/*Size Selector*/}
					<section>
						<h3 className="font-title-md text-title-md mb-4 flex justify-between items-center">
							Select Size
							<span
								className="text-on-surface-variant text-label-sm font-label-sm border-b border-outline-variant cursor-pointer">Size Guide</span>
						</h3>
						<div className="flex flex-wrap gap-3">
							<button
								className="size-btn px-6 py-3 border border-outline rounded-lg hover:border-primary transition-all text-body-md font-body-md active:scale-95"
								onClick="selectSize(this)">Small
							</button>
							<button
								className="size-btn px-6 py-3 border-2 border-primary bg-primary/5 text-primary rounded-lg font-bold transition-all text-body-md"
								onClick="selectSize(this)">Medium
							</button>
							<button
								className="size-btn px-6 py-3 border border-outline rounded-lg hover:border-primary transition-all text-body-md font-body-md active:scale-95"
								onClick="selectSize(this)">Large
							</button>
							<button
								className="size-btn px-6 py-3 border border-outline rounded-lg hover:border-primary transition-all text-body-md font-body-md active:scale-95"
								onClick="selectSize(this)">Custom
							</button>
						</div>
					</section>
				{/*	Quantity Control*/}
					<section className='flex items-center gap-6'>
						<h3 className="font-title-md text-title-md">Quantity</h3>
						<div
							className="flex items-center bg-white/40 border border-white/60 rounded-full px-2 py-1 shadow-sm">
							<button
								className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/60 transition-all active:scale-90 bounce-click"
								onClick="changeQty(-1)">
								<span className="material-symbols-outlined text-on-surface">remove</span>
							</button>
							<span className="w-12 text-center font-bold text-body-lg" id="qty-val">1</span>
							<button
								className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/60 transition-all active:scale-90 bounce-click"
								onClick="changeQty(1)">
								<span className="material-symbols-outlined text-on-surface">add</span>
							</button>
						</div>
					</section>

				{/*	Accessories / Complete the look*/}
					<section>
						<div
							className='group relative bg-white/20 rounded-xl p-3 border border-white/40 overflow-hidden hover:bg-white/40 transition-all cursor-pointer'>
							<div className='aspect-square rounded-lg mb-3 overflow-hidden bg-surface-dim'>
								<img
									className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
									alt='Close up of traditional Nigerian Gele'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuCm5bn5kPK_MWwUarqN04KDI7vk6YNL3pbpFYEVJ85HuvcffSeqR3PXN5xSd_osoK4TLyqcFvg8GlAY65Omn6_7aApxyeF4Vxsy3gxCcTka8Q7JR1DNTLL27VlRtD2muptOIAXlnnyNo4eRbHHxALkzHdk0gbdKl4tCGx8an-kRKuG63RWimQyvIJvt0VQmh9sPDR97OZ67s2FEbimXg6CzA0uqi0d1BBEFPf_68oxPuCHSDAI0OjCHmQ8pJrPfTIe19UO6lPt1R_6L'/>
							</div>
							<p className="font-label-sm text-label-sm text-on-surface-variant truncate">Gele
								Head-tie</p>
							<p className="font-bold text-primary">$45</p>
							<button
								className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm active:scale-90 transition-transform">
								<span className="material-symbols-outlined text-base">add</span>
							</button>
						</div>
						<div
							className='group relative bg-white/20 rounded-xl p-3 border border-white/40 overflow-hidden hover:bg-white/40 transition-all cursor-pointer'>
							<div className='aspect-square rounded-lg mb-3 overflow-hidden bg-surface-dim'>
								<img
									className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
									alt='A luxurious handcrafted beaded necklace'
									src='https://lh3.googleusercontent.com/aida-public/AB6AXuAISNt835-aDnPmg9eMe59NYeSn91D0hIpKUQKj4iMaRq142W9bhefW7vEUpC16zec66sFVyMrsYeFawVUGv8cmzUaX4K4TiOfpOmut41lQ4ge0Z7zmmaZuCYQXmz8NUnvQXKZMkWOtub_v7KBtGRHFR73zHVgDgpyjImuq4iEUdjFFar_p_o17dCXhMdkoj5mWU34ciasR98KyT6OHZrqS3E8_Z85sJ763weS7Gxs1A3ULg9uCmBrZ69DaNBOJtXYJDGGKbIrOExyC'
								/>
							</div>
							<p className="font-label-sm text-label-sm text-on-surface-variant truncate">Beaded
								Necklace</p>
							<p className="font-bold text-primary">$120</p>
							<button
								className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm active:scale-90 transition-transform">
								<span className="material-symbols-outlined text-base">add</span>
							</button>
						</div>
					</section>
				{/*	Action Buttons*/}
					<section className='flex flex-col gap-4 pb-12'>
						<button
							className="premium-gradient text-white py-5 rounded-xl font-headline-lg text-headline-lg shadow-lg relative overflow-hidden active:scale-95 transition-transform shimmer-effect">
							Add to Cart
						</button>
						<button
							className="bg-white/30 backdrop-blur-md border-2 border-white text-on-surface py-5 rounded-xl font-headline-lg text-headline-lg hover:bg-white/50 transition-all active:scale-95">
							Buy Now
						</button>
					</section>
				</div>
			</aside>
		</div>
	)
}
export default ProductModal
