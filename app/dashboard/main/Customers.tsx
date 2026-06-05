'use client'

import React, {useCallback, useEffect, useState} from 'react'
import {CustomerProfile} from "@/types";
import {supabase} from "@/lib/supabaseClient";

const Customers = () => {
	const [customers, setCustomers] = useState<CustomerProfile[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)

	// Live Analytical Counter States
	const [totalCount, setTotalCount] = useState<number>(0)
	const [activeCount, setActiveCount] = useState<number>(0)
	const [avgLtv, setAvgLtv] = useState<number>(0)

	// Server-Side Pagination States
	const [currentPage, setCurrentPage] = useState<number>(1)
	const ITEM_PER_PAGE = 10;

	const fetchCustomersData = useCallback(async () => {
		setIsLoading(true)
		const from = (currentPage - 1) * ITEM_PER_PAGE
		const to = from + ITEM_PER_PAGE - 1

		try {
			const { data, error, count } = await supabase
				.from('customer_analytics_view')
				.select(`id, full_name, email, avatar_url, city, country, total_orders, total_spend, last_active`, {count: "exact"})
				.order('full_name', { ascending: false})
				.range(from, to)

			if(error) throw error
			if(data){
				setCustomers(data as unknown as CustomerProfile[])
				setTotalCount(count || 0)
			}

		// 	Fetch live metrics totals (Active status counters and aggregate average
		// 	fetch total active count

			const { count: activeRows } = await supabase
				.from('profiles')
				.select('id', { count: "exact", head: true })
				.not('last_active', 'is', null)

			setActiveCount(activeRows || 0)

			const { data: metricsData } = await supabase
				.from('customer_analytics_view')
				.select('total_spend')

			if(metricsData && metricsData.length > 0){
				const validSpends = metricsData.map(c => c.total_spend || 0)
				const totalSum = validSpends.reduce((acc, curr) => acc + curr, 0)
				setAvgLtv(totalSum / metricsData.length)
			}
		} catch (err: any){
			console.error('Failed retrieving client ecosystem ledger:', err.message)
		}finally {
			setIsLoading(false)
		}
	},[currentPage])

	useEffect(() => {
		fetchCustomersData()
	}, [fetchCustomersData]);

	const handleDeleteCustomer = async (id: string) => {
		if(!confirm("Are you sure you want to remove this client profile?")) return

		try {
			const {error} = await supabase
				.from('profiles')
				.delete()
				.eq('id', id)

			if(error) throw error

			fetchCustomersData()
		}catch (err: any){
			alert(`Failed deleting profile: ${err.message}`)
		}
	}

	const totalPages = Math.ceil(totalCount / ITEM_PER_PAGE)
	const currentStartRow = (currentPage - 1) * ITEM_PER_PAGE + 1
	const currentEndRow = Math.min(currentPage * ITEM_PER_PAGE, totalCount)
	return (
		<main className='overflow-y-auto scrollbar-hide-default bg-background text-on-background font-body-md h-screen mt-4 px-6 pb-12'>
			<div className='mb-12'>
				<h2 className='font-headline-lg text-headline-lg text-on-sruface mb-2'>Customers</h2>
				<p className='font-body-lg text-body-lg text-on-surface-variant'>Manage and analyze your global heritage clientele.</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter mb-12'>
				<div className='glass-panel p-6 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-transform cursor-default'>
					<div className='flex justify-between items-start mb-4'>
						<div className='p-3 rounded-xl bg-primary-fixed/50 text-primary'>
							<span className='material-symbols-outlined'>group</span>
						</div>
						<span className='text-secondary font-bold font-label-sm text-label-sm'>+2.4%</span>
					</div>
				<p className='font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1'>Total Customers</p>
					<h3 className='text-headline-lg font-headline-lg text-on-surface'>{isLoading ? '...' : totalCount.toLocaleString()}</h3>
				</div>

				<div
					className='glass-panel p-6 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-transform cursor-default'>
					<div className='flex justify-between items-start mb-4'>
						<div className="p-3 rounded-xl bg-tertiary-fixed/50 text-tertiary">
							<span className="material-symbols-outlined" data-icon="bolt">bolt</span>
						</div>
						<span className="text-tertiary font-bold font-label-sm text-label-sm">Active</span>
					</div>
					<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Active
						This Month</p>
					<h3 className="text-headline-lg font-headline-lg text-on-surface">{isLoading ? '...' : activeCount.toLocaleString()}</h3>
				</div>

				<div className='glass-panel p-6 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-transform cursor-default'>
					<div className='flex justify-between items-start mb-4'>
						<div className='p-3 rounded-xl bg-secondary-fixed/50 text-secondary'>
							<span className="material-symbols-outlined" data-icon="payments">payments</span>
						</div>
						<span className="text-on-surface-variant font-label-sm text-label-sm">Avg. LTV</span>
					</div>
					<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Avg.
						Lifetime Value</p>
					<h3 className="text-headline-lg font-headline-lg text-on-surface">${isLoading ? '...' : avgLtv.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h3>
				</div>

				<div className='glass-panel p-6 rounded-2xl flex flex-col justify-between group hover:-translate-y-1 transition-transform cursor-default'>
					<div className='flex justify-between items-start mb-4'>
						<div className='p-3 rounded-xl bg-secondary-fixed/50 text-secondary'>
							<span className="material-symbols-outlined" data-icon="payments">trending_up</span>
						</div>
						<span className="text-on-surface-variant font-label-sm text-label-sm">+12.5%</span>
					</div>
					<p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Avg.
						Customer Growth</p>
					<h3 className="text-headline-lg font-headline-lg text-on-surface">+12.5%</h3>
				</div>
				</div>

			{/*	Customer Table Section*/}
			<div className='glass-panel rounded-[2rem] overflow-hidden border border-white/40'>
				<div className='p-8 w-full flex flex-col md:flex-row justify-between items-center gap-6 border-b border-surface-variant/30'>
					<div className='flex items-center gap-4 w-full md:w-auto'>
						<button className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-lg font-label-sm text-label-sm border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
								<span className="material-symbols-outlined text-sm"
								      data-icon="filter_list">filter_list</span>
							Filters
						</button>
						<button
							className="flex items-center gap-2 px-4 py-2 bg-surface-container-low rounded-lg font-label-sm text-label-sm border border-outline-variant/30 hover:bg-surface-container-high transition-colors">
								<span className="material-symbols-outlined text-sm"
								      data-icon="location_on">location_on</span>
							Location
						</button>
					</div>
					<div className='flex items-center gap-3'>
						<span
							className="font-label-sm text-label-sm text-on-surface-variant">
							{isLoading ? 'Syncing...' : `Showing ${currentStartRow}-${currentEndRow} of ${totalCount.toLocaleString()}`}
						</span>

						<div className="flex gap-1">
							<button
								onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
								disabled={currentPage === 1 || isLoading}
								className="p-1 rounded hover:bg-surface-container-high transition-colors">
								<span className="material-symbols-outlined text-on-surface-variant" data-icon="chevron_left">chevron_left</span></button>

							<button
								onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
								disabled={currentPage === totalPages || isLoading}
								className="p-1 rounded hover:bg-surface-container-high transition-colors"><span
								className="material-symbols-outlined text-on-surface-variant"
								data-icon="chevron_right">chevron_right</span></button>
						</div>
					</div>
				</div>
				<div className='overflow-x-auto'>
					<table className='w-full text-left border-collapse'>
						<thead>
						<tr className="bg-surface-container-low/50">
							<th className="py-5 px-8 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Customer</th>
							<th className="py-5 px-8 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Location</th>
							<th className="py-5 px-8 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Orders</th>
							<th className="py-5 px-8 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Total
								Spend
							</th>
							<th className="py-5 px-8 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Last
								Active
							</th>
							<th className="py-5 px-8 font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-right">Actions</th>
						</tr>
						</thead>
						<tbody className='divide-y divide-slate-100'>
						{isLoading ? (
							<tr>
								<td colSpan={6} className='py-10 text-center text-sm text-slate-400'>
									Fetching client data records from Supabase...
								</td>
							</tr>
						) : customers.length === 0 ? (
							<tr>
								<td colSpan={6} className='py-10 text-center text-sm text-slate-400'>
									No client registry profiles detected.
								</td>
							</tr>
						) : (
							customers.map((customer) => (
								<tr key={customer.id} className='hover:bg-slate-50/80 transition-colors group'>
									<td className='py-5 px-8'>
										<div className='flex items-center gap-4'>
											<img
												alt={customer.full_name || 'User'}
												className='w-10 h-10 rounded-full object-cover bg-slate-100'
												src={customer.avatar_url || 'https://unsplash.com'}
											/>
											<div>
												<p className="font-semibold text-slate-800 text-sm">{customer.full_name || 'Anonymous Checkout'}</p>
												<p className="text-xs text-slate-400">{customer.email || 'N/A'}</p>
											</div>
										</div>
									</td>
									<td className="py-5 px-8">
										<div className="flex flex-col">
											<span className="text-sm font-medium text-slate-700">{customer.city || 'Unknown'}</span>
											<span className="text-xs text-slate-400">{customer.country || 'Global'}</span>
										</div>
									</td>
									<td className="py-5 px-8">
											<span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
												{customer.total_orders || 0} Orders
											</span>
									</td>
									<td className="py-5 px-8 font-semibold text-sm text-slate-800">
										${(customer.total_spend || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
									</td>
									<td className="py-5 px-8 text-sm text-slate-500">
										{customer.last_active ? new Date(customer.last_active).toLocaleDateString() : 'Never'}
									</td>
									<td className="py-5 px-8 text-right">
										<div className="flex justify-end gap-2 md:opacity-0 group-hover:opacity-100 transition-opacity">
											<button className="material-symbols-outlined p-2 text-slate-400 hover:text-primary transition-colors text-lg">
												edit
											</button>
											<button
												onClick={() => handleDeleteCustomer(customer.id)}
												className="material-symbols-outlined p-2 text-slate-400 hover:text-rose-600 transition-colors text-lg"
											>
												delete
											</button>
										</div>
									</td>
								</tr>
							))
						)}
						</tbody>
					</table>
				</div>
			</div>
		</main>
	)
}

export default Customers;
