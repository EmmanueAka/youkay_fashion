import React from 'react'
import Footer from "@/components/Footer";

const Hero = () => {
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
						<img src='/material.png' alt='evening gow' className='w-full h-full object-cover transition-transform druation-700 group-hover:scale-110 '/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent'></div>
						<div className='absolute bottom-0 left-0 right-0 p-4 glass-card m-6 rounded-lg'>
							<span className='font-label-sm text-label-sm text-secondary-container mb-2 block'>GHANA</span>
							<h3 className='font-headline-lg text-headline-lg text-white mb-2'>Master Kante</h3>
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
						<div className='flex items-center gap-4'>
							<span className='font-label-sm text-label-sm text-on-surface-variant'>SORT BY:</span>
							<select className='bg-transparent border-none font-title-md text-primary focus:ring-0'>
								<option>Latest Arrival</option>
								<option>Popularity</option>
								<option>Price: High to Low</option>
							</select>
						</div>
					</div>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter px-6'>

					{/*Product 1*/}
					<div className='group'>
						<div className='relative aspect-[3/4] overflow-hidden rounded-xl mb-6 shadow-sm'>
							<img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI1nYwjizDAPUeapKQjsXgwLexdg7FKYlWks7diq8SQY5IH0PMawRNtsW-MgGqs3GVg0dkH1-uhOchNRAPz4zqDyl2vU7xIVqMpFkAr4GCz9EdRclhtA5RYQ-_bkNm043q8hs3OZPNvZMsiUyfQV4hy2z_rAG8YgMkAwAkUi71WSJvFAe7MYRD0JcBKtfF8EdlPoC2ryt3ZtjC7Aa4Y8FkoMrk-KvGaW1MYL3r18rPZ1mSbcknuqZdzD976Vwlw4XWWYvrafd9b2ye"
							     alt='dashiki' className='w-full h-full object-cover transition-transform druation-700 group-hover:scale-110'
							/>
							<div className='absolute top-4 left-4'>
								<span className='bg-primary text-white px-3 py-1 rounded-full font-label-sm text-label-sm'>BESTSELLER</span>
							</div>
							<button className='absolute bottom-4 p-2 right-4 w-12 rounded-full bg-white/90 backdrup-blur-md flex items-center justify-center text-primary opacity-0 translate-y-4 transition-all group-hover:translate-y-0 group-hover:opacity-100'>
								<span className='material-symbols-outlined' data-icon='shopping_bag'>shopping_bag</span>
							</button>
						</div>
						<h4 className='font-title-md text-title-md mb-1'>Ancestral Dashiki Set</h4>
						<p className='text-primary font-bold mb-2'>$182.00</p>
						<p className='font-label-sm text-label-sm text-on-surface-variant'>Hand-embroidered ivory cotton</p>
					</div>

					{/*Product 2*/}
					<div className='group'>
						<div className='relative aspect-[3/4] overflow-hidden rounded-xl mb-6 shadow-sm'>
							<img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-XW6h1J9bSZU0kJoE509K-t-30UVWfKkioMtz7-B3CE4LGGM7zwxwGCw5oKdZW2FRBR2wu9ENX_S8Js7Shwkm1eUUW9hddNed6u8xpnc64VSTpC7tycjMuV16Rgq7afcAelniVqlSTEg02iGTeyEjM5renXy1-cw8XGy9GyP62BEEfSVXKH8GTTasgJH5BMqpT1CCvK2ENxDW1MVl_vcDjpQ6PiWGzoIoF4GgK4AuonVpERe8qgBhk2pfJ9w2d9DuACQR8G5CtG-k"
							     alt='dashiki' className='w-full h-full object-cover transition-transform druation-700 group-hover:scale-110'
							/>
							<div className='absolute top-4 left-4'>
								<span className='bg-tertiary text-white px-3 py-1 rounded-full font-label-sm text-label-sm'>LIMITED EDITION</span>
							</div>
							<button className='absolute bottom-4 p-2 right-4 w-12 rounded-full bg-white/90 backdrup-blur-md flex items-center justify-center text-primary opacity-0 translate-y-4 transition-all group-hover:translate-y-0 group-hover:opacity-100'>
								<span className='material-symbols-outlined' data-icon='shopping_bag'>shopping_bag</span>
							</button>
						</div>
						<h4 className='font-title-md text-title-md mb-1'>Ochre Heritage Gown</h4>
						<p className='text-primary font-bold mb-2'>$420.00</p>
						<p className='font-label-sm text-label-sm text-on-surface-variant'>Silk Kente &amp; Organza</p>
					</div>

					{/*Product 3*/}
					<div className='group'>
						<div className='relative aspect-[3/4] overflow-hidden rounded-xl mb-6 shadow-sm'>
							<img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6AlVXmRMNbYLgkFVIHhIEbd3azcKOCQ65g08ZB14GI07tZFBDvmlloALGCry_hZnNweNX_g1UP0YmaCgYdSQjDPIMPAsnmmOQiWtPHWqITRpZMHUAliaWlE8ScHHP2g7Ynp0nQNEu9fQSghCrXguYtBoGQKUEKIVSHjuU-3D45Qe7dNKGvmwP0Tlvcux-FwOKQZMHyiL54iFL65JuPnEZEcgX9h9TetB4XrEXItfH_mVGYDSDGlvnKbdr9_ubaKFS9ApNZPPLZe5Q"
							     alt='dashiki' className='w-full h-full object-cover transition-transform druation-700 group-hover:scale-110'
							/>

							<button className='absolute bottom-4 p-2 right-4 w-12 rounded-full bg-white/90 backdrup-blur-md flex items-center justify-center text-primary opacity-0 translate-y-4 transition-all group-hover:translate-y-0 group-hover:opacity-100'>
								<span className='material-symbols-outlined' data-icon='shopping_bag'>shopping_bag</span>
							</button>
						</div>
						<h4 className='font-title-md text-title-md mb-1'>Heritage Wrap Scarf</h4>
						<p className='text-primary font-bold mb-2'>$75.00</p>
						<p className='font-label-sm text-label-sm text-on-surface-variant'>Forest Green Aso-oke</p>
					</div>

					{/*Product 4*/}
					<div className='group'>
						<div className='relative aspect-[3/4] overflow-hidden rounded-xl mb-6 shadow-sm'>
							<img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCutlL2Vr44YcecTNTHGJrINFQWzQQGKr33T12HYa41xPxcJO4jLyz4XmKBYF5oOarwwUt8o5Z2SJqgw51c4LXjZ-Z-XwHjpE27svjUNMlTnFsbryGJmfcbTor5-PrR7BUcXgo5K5DqiK7hRcFordZ5l93QG33_YvxEQpeYA1h0dP9L-FszLsgsxAXAmFTwlrpfEhnY4yGyVbsJLskAJMErNiBr2_kNgV8EuN9VkY-198J5GR2lqlf-DDucK_KnTYaJhrCubOjuwRKR"
							     alt='dashiki' className='w-full h-full object-cover transition-transform druation-700 group-hover:scale-110'
							/>
							<div className='absolute top-4 left-4'>
								<span className='bg-secondary text-white px-3 py-1 rounded-full font-label-sm text-label-sm'>NEW</span>
							</div>
							<button className='absolute bottom-4 right-4 w-12 p-2 rounded-full bg-white/90 backdrup-blur-md flex items-center justify-center text-primary opacity-0 translate-y-4 transition-all group-hover:translate-y-0 group-hover:opacity-100'>
								<span className='material-symbols-outlined' data-icon='shopping_bag'>shopping_bag</span>
							</button>
						</div>
						<h4 className='font-title-md text-title-md mb-1'>Terracotta Formal Suit</h4>
						<p className='text-primary font-bold mb-2'>$310.00</p>
						<p className='font-label-sm text-label-sm text-on-surface-variant'>Tailored Loomed Cotton</p>
					</div>
				</div>
				<div className='mt-20 text-center'>
					<button className='px-12 py-4 border-2 border-primary text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-all scale-95 active:scale-90'>
						Load More Designs
					</button>
				</div>

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
