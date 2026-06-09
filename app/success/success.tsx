import React from 'react'
import Link from "next/link";

const Success = () => {
	return (
		<div className='w-full h-screen bg-black/40'>
			<div className='max-w-4xl w-auto h-64 rounded-xl bg-backround/60 backdrop-blur-xl fixed inset-0 flex items-center justify-center'>
				<p className='text-primary font-bold italic text-2xl'>Thank you for patronage</p>
				<Link href="/public">Check other products</Link>
			</div>
		</div>
	)
}
export default Success
