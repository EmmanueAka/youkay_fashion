'use client'
import {motion} from 'framer-motion'

const FeatureCard = () => {
	return (
		<section className='py-24 bg-surface-container-lowest overflow-hidden'>
			<div className='px-margin-desktop max-w-container-max mx-auto'>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-20 items-center'>
					<div className='relative'>
						<div className='aspect-square rounded-[4rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-700'>
							<img src='https://lh3.googleusercontent.com/aida-public/AB6AXuB5eh9YRkYoyTa7OwX8kaazrBb5UES0ZvR41Doq_7an82bvKBFFmEyp579UhZkv4867KLvuhacUqNqo-7_6qDYjBaoupXBAvgGjTHlb_OsTXEX6kjnDdAEaHWGcneL8drcE7zlmCNe_xpLjJR-gh5jRgnmVNxSKnb6DYbQSBxhVC80LLGaY0VmkRlPZDpZLksPg1dOpb4BorBMm5ww7N7Yebuqvz-Leh1dDDlN5vznifHzYQ2AWiWlGZrUgLO6lCpsZCdo5zBamR_yI'
							     className='w-full h-full object-cover '
							     alt='high-end environment'
							/>
						</div>
						<div className='absolute -bottom-10 -right-10 glass-card p-10 rounded-3xl max-w-xs hidden md:block'>
							<p className='font-display-lg text-display-lg text-primary leading-tight'>100%</p>
							<p className='font-title-md text-title-md text-on-background'>Ethically Crafted Heritage Textiles</p>
						</div>
					</div>
					<div className='space-y-8'>
						<motion.h2
							initial={{opacity: 0, x:50}}
							whileInView={{opacity: 1, x:0}}
							transition={{ duration: 0.6, ease:"easeIn"}}
							className='font-headline-lg text-headline-lg text-on-background'>The Craft Behind the
							Fusion</motion.h2>
						<motion.p
							initial={{opacity: 0, y:50, rotate: 15}}
							whileInView={{opacity: 1, y:0, rotate: 0}}
							transition={{duration: 0.6, ease:"easeIn"}}

							className='font-body-lg text-body-lg text-on-surface-variant'>Every piece in our Modern
							Fusion collection begins in small artisan hubs across West Africa. We preserve century-old
							techniques while providing sustainable livelihoods for master weavers and dyers.</motion.p>
						<ul className='space-y-4'>
							<motion.li
								initial={{opacity: 0, y: 100}}
								whileInView={{opacity: 1, y:0}}
								transition={{duration: 0.3, ease: "easeInOut"}}
								className="flex items-center gap-4">
								<span className="material-symbols-outlined text-tertiary">check_circle</span>
								<span className="font-body-md text-body-md">Hand-spun organic cotton yarns</span>
							</motion.li>
							<motion.li
								initial={{opacity: 0, y: 100}}
								whileInView={{opacity: 1, y:0}}
								transition={{duration: 0.6, ease: "easeInOut"}}
								className="flex items-center gap-4">
								<span className="material-symbols-outlined text-tertiary">check_circle</span>
								<span className="font-body-md text-body-md">Botanical-based natural indigo dyes</span>
							</motion.li>
							<motion.li
								initial={{opacity: 0, y: 100}}
								whileInView={{opacity: 1, y:0}}
								transition={{duration: 0.8, ease: "easeInOut"}}
								className="flex items-center gap-4">
								<span className="material-symbols-outlined text-tertiary">check_circle</span>
								<span className="font-body-md text-body-md">Zero-waste pattern cutting designs</span>
							</motion.li>
						</ul>
						<button className="text-primary font-title-md text-title-md flex items-center gap-2 group">
							Our Sustainability Story
							<span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
						</button>
					</div>
				</div>
			</div>
			<div className='py-32 px-margin-desktop max-w-container-max max-auto text-center'>
				<div className="glass-card rounded-[3rem] p-16 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full"></div>
					<div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary/5 blur-[100px] rounded-full"></div>
					<div className="relative z-10 max-w-xl mx-auto space-y-8">
						<h2 className="font-headline-lg text-headline-lg">Join the Stitch Movement</h2>
						<p className="font-body-lg text-body-lg text-on-surface-variant">Subscribe to receive early
							access to new drops and invitations to our exclusive heritage showcases.</p>
						<div className="flex flex-col md:flex-row gap-4">
							<input
								className="flex-1 rounded-xl border-outline-variant bg-primary/40 text-white p-4 focus:ring-2 focus:ring-primary outline-none transition-all"
								placeholder="Your email address" type="email"/>
							<button
								className="shimmer-btn bg-on-background text-surface px-8 py-4 rounded-xl font-title-md text-title-md text-white">Subscribe
							</button>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
export default FeatureCard
