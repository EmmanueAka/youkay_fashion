'use client'

import React, {useEffect, useState} from 'react'
import Dashboard from "@/app/dashboard/main/Dashboard";
import Customers from "@/app/dashboard/main/Customers";
import Orders from "@/app/dashboard/main/Orders";
import Products from "@/app/dashboard/main/Products";
import Analytics from "@/app/dashboard/main/Analytics";
import {useAuth} from "@/app/dashboard/AuthProvider";

const Page = () => {
	const [activePage, setActivePage] = useState('Dashboard')
	const [loading, setLoading] = useState(false)



	const {user, logout } = useAuth()

	const handleLogout = async () => {
		try {
			setLoading(true)
			await logout()
		}catch (error:any){
			console.error("Error logging out", error.message)
		}finally {
			setLoading(false)
		}
	}

	return (
		<div className='relative overflow-hidden'>
			<div className='grid grid-cols-4'>
			{/*	Left pane*/}
				<section className='col-span-1 h-full w-full relative bg-primary/10'>
					<div className='w-[120px] h-[100px] px-2'>
						<img src='/u-logo.png' alt='logo' className='w-full h-full object-cover'/>
					</div>
						<h3 className='text-[36px] px-2 text-primary font-bold'>Fashion by U-Kay Admin</h3>
					<p className='text-black/50 px-2'>Premium Management</p>
					<hr className='border-primary/20 mt-4'/>
					<div>
						<nav className='flex-grow mt-16'>
							<button
								onClick={() => setActivePage('Dashboard')}
								className={`cursor-pointer flex w-full items-center justify-between p-4 transition-transform scale-95 active:scale-90 gap-2  rounded-lg ${activePage === 'Dashboard' ? 'bg-primary/30 text-primary' : 'text-black'}`}>
								<span className='material-symbols-outlined'>dashboard</span>
								<span>Dashboard</span>
							</button>

							<button
								onClick={() => setActivePage('Products')}
								className={`cursor-pointer flex w-full items-center justify-between p-4 transition-transform scale-95 active:scale-90 gap-2  rounded-lg ${activePage === 'Products' ? 'bg-primary/30 text-primary' : 'text-black'}`}>
								<span className='material-symbols-outlined'>inventory_2</span>
								<span>Products</span>
							</button>

							<button
								onClick={() => setActivePage('Orders')}
								className={`cursor-pointer flex w-full items-center justify-between p-4 transition-transform scale-95 active:scale-90 gap-2  rounded-lg ${activePage === 'Orders' ? 'bg-primary/30 text-primary' : 'text-black'}`}>
								<span className='material-symbols-outlined'>shopping_cart</span>
								<span>Orders</span>
							</button>

							<button
								onClick={() => setActivePage('Customers')}
								className={`cursor-pointer flex w-full items-center justify-between p-4 transition-transform scale-95 active:scale-90 gap-2  rounded-lg ${activePage === 'Customers' ? 'bg-primary/30 text-primary' : 'text-black'}`}>
								<span className='material-symbols-outlined'>group</span>
								<span>Customers</span>
							</button>

							<button
								onClick={() => setActivePage('Analytics')}
								className={`cursor-pointer flex w-full items-center justify-between p-4 transition-transform scale-95 active:scale-90 gap-2  rounded-lg ${activePage === 'Analytics' ? 'bg-primary/30 text-primary' : 'text-black'}`}>
								<span className='material-symbols-outlined'>analytics</span>
								<span>Analytics</span>
							</button>

						</nav>
					</div>
					<div className='mt-16 mb-12'>
						<button onClick={handleLogout} className='w-full flex p-3 bg-primary text-white items-center justify-center'>
							{loading ? (
								<div className='flex items-center justify-center'>
									<span className='material-symbols-outlined animate-spin'>progress_activity</span>
									<span>Signing Out...</span>
								</div>
							) : (
								<div className='flex gap-3'>
									<span className='material-symbols-outlined'>logout</span>
									<span>Sign Out</span>
								</div>
							)}

						</button>
					</div>
				</section>

				<section className='col-span-3'>
					{activePage === "Dashboard" && <Dashboard />}
					{activePage === "Customers" && <Customers />}
					{activePage === "Orders" && <Orders />}
					{activePage === "Products" && <Products />}
					{activePage === "Analytics" && <Analytics />}
				</section>
			</div>
		</div>
	)
}
export default Page
