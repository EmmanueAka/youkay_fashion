import React from 'react'
import Link from "next/link";

const CasualCard = () => {
	return (
		<section className='py-24 px-margin-desktop max-w-container-max mx-auto'>
			<div className='grid grid-cols-1 md:grid-cols-12 gap-gutter h-auto md:h-[600px]'>

				<div className='md:col-span-8 relative rounded-3xl overflow-hidden glass-panel group'>
					<img src='https://lh3.googleusercontent.com/aida-public/AB6AXuBsqkC3GYSAdbjEd7tYDa_ciR4w1Fpp5baNZl6gPcQar_YAAhhXvYkU5ZZNGGdSwsNreLyrIG82x6QP3f_4v3cRtJFZDVoHFHad21rLfhOza0SRgevF5w-ExovAUAVytI5kbNlTb_k8nOQc0sbo2pUqujxjSyeID4b9NU6bEMhIbRs1AG2hYvLr7TsFcyhtZwu1NF7Q402KT48RiM6phSAoT_uMCJXXafeyE_DEkgc-6wMHKl5l4RhPUSt07dNNfYyHrvcemItELerm'
					     alt='Relaxed Separates'
					     className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
					/>
					<div className='absolute bottom-0 left- right-0 p-12 bg-gradient-to-t from-background/90 to-transparent '>
						<h3 className='font-headline-lg text-headline-lg mb-2'>Everyday Luxury</h3>
						<p className='font-body-md text-body-md text-on-surface-variant max-w-md'>Our signature relaxed separates designed for transition from home to high-street.</p>
					</div>
				</div>

				<div className='md:col-span-4 grid grid-rows-2 gap-gutter'>
					<div className="relative rounded-3xl overflow-hidden glass-panel group">
						<img src='https://lh3.googleusercontent.com/aida-public/AB6AXuCvOX6_5l1MoqkOTvBkiFRPjUDeTPao9bnUmmct5OBeCNo7NUB6n9hZSE5FKbHQiJVaRxrs5vrwhDL-P2IjbwEUJ_zxbKBdXil_Z0evUTUVaVPzfnG4tsT2rOb9rKdTWx6nxxpVjKZBWEmVzRXl_qgS14gZE4Gizkk27PbQEi2fxNDJMge903sFLrNnZgFDiCjdtPvrrR11nVAX4v6-lWDxlaWf5bBed2QQY4JEHCzqj-HmF7vNXnp6Lt7z0p1kY5HdhiWLplThxyw-'
						     className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
						     alt='A close up shot focusing on the exquisite'
						/>
						<div className='absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/40 to-transparent text-white'>
							<span className='font-title-m text-title-md'>Artisanal Tunics</span>
						</div>
					</div>
					<div className='relative rounded-3xl overflow-hidden bg-primary-container p-8 flex flex-col justify-center text-on-primary-container'>
						<h4 className='font-headline-lg text-headline-lg mb-4'>Crafted with Soul</h4>
						<p className='font-body-md text-body-md mb-6'>Each piece integrates traditional Adire and Kente patterns into modern silhouettes.</p>
						<Link href='#' className='flex items-center gap-2 font-title-md text-title-md underline decoration-2 unerline-offset-4'>Learn about our process <span className='material-symbols-outlined' data-icon='arrow_forward'>arrow_forward</span></Link>
					</div>
				</div>
			</div>
		</section>
	)
}
export default CasualCard
