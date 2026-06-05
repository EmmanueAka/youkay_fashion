'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { OrderRecord } from '@/types'
import { supabase } from "@/lib/supabaseClient"


const FILTER_TABS = [
	{ label: 'All Orders', value: 'all' },
	{ label: 'Pending', value: 'pending' },
	{ label: 'Paid', value: 'paid' },
	{ label: 'Shipped', value: 'shipped' },
	{ label: 'Delivered', value: 'delivered' },
	{ label: 'Cancelled', value: 'cancelled' }
]

const Orders = () => {
	const [orders, setOrders] = useState<OrderRecord[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [activeFilter, setActiveFilter] = useState<string>('all')

	const [totalCount, setTotalCount] = useState<number>(0)
	const [processingCount, setProcessingCount] = useState<number>(0)

	// Pagination
	const [currentPage, setCurrentPage] = useState<number>(1)
	const ITEM_PER_PAGE = 10;

	// Wrap in useCallback to prevent infinite render loops
	const fetchOrders = useCallback(async () => {
		const from = (currentPage - 1) * ITEM_PER_PAGE
		const to = from + ITEM_PER_PAGE - 1

		setIsLoading(true)
		try {
			// Ask Supabase for exact matching rows count
			let query = supabase
				.from('orders')
				.select(`id, created_at, total, status, customer_name, product_name`, { count: 'exact' })
				.order('created_at', { ascending: false })
				.range(from, to);

			if (activeFilter !== "all") {
				query = query.eq('status', activeFilter)
			}

			const { data, error, count } = await query;

			if (error) throw error

			if (data) {
				setOrders(data as unknown as OrderRecord[])
				setTotalCount(count || 0)
			}

			// Independent real-time global counter for Processing state
			const { count: proCount } = await supabase
				.from('orders')
				.select('id', { count: 'exact', head: true })
				.eq('status', 'pending');

			setProcessingCount(proCount || 0);

		} catch (err: any) {
			console.error('Failed retrieving orders registry:', err.message)
		} finally {
			setIsLoading(false)
		}
	}, [currentPage, activeFilter]);

	useEffect(() => {
		fetchOrders()
	}, [fetchOrders]);

	const handleFilterChange = (statusType: string) => {
		setActiveFilter(statusType);
		setCurrentPage(1) // Always reset page index back to 1 on filter switch
	}

	const handleStatusUpdate = async (orderId: string | number, currentStatus: OrderRecord['status']) => {
		const statuses: OrderRecord['status'][] = ['paid', 'pending', 'shipped', 'delivered', 'cancelled']

		const normalizedCurrent = (currentStatus?.toLowerCase() || 'pending') as OrderRecord['status']
		const currentIndex = statuses.indexOf(currentStatus);
		const nextIndex = (currentIndex + 1) % statuses.length;
		const nextStatus = statuses[nextIndex];

		try {
			const { error } = await supabase
				.from('orders')
				.update({ status: nextStatus })
				.eq('id', orderId);

			if (error) throw error;

			// Instantly fetch pristine server data to recalculate layout ranges
			fetchOrders()

		} catch (err: any) {
			alert(`Error modifying item record status: ${err.message}`)
		}
	}

	const getStatusStyles = (status: OrderRecord['status']) => {
		switch (status?.toLowerCase()) {
			case 'paid': return 'bg-emerald-500/10 text-emerald-600';
			case 'pending': return 'bg-amber-500/10 text-amber-600';
			case 'shipped': return 'bg-gray-500/10 text-gray-600';
			case 'delivered': return 'bg-blue-500/10 text-blue-600';
			case 'cancelled': return 'bg-rose-500/10 text-rose-600';
			default: return 'bg-gray-500/10 text-gray-600';
		}
	}

	const totalPages = Math.ceil(totalCount / ITEM_PER_PAGE);

	return (
		<main className='overflow-y-auto scrollbar-hide-default h-screen mt-4 px-6 pb-12'>
			<div className='max-w-[1200px] mx-auto'>
				<div className='flex flex-col md:flex-row justify-between items-center mb-10 gap-6'>
					<div>
						<h2 className='font-display-lg text-headline-lg text-primary mb-1'>Orders</h2>
						<div className='flex items-center gap-2'>
							<span className='bg-primary/10 text-primary px-3 py-1 rounded-full text-label-sm font-label-sm'>
								{isLoading ? '...' : totalCount.toLocaleString()} Total
							</span>
							<span className='text-on-surface-variant/60 font-label-sm text-label-sm'>• Processing: {isLoading ? '...' : processingCount}</span>
						</div>
					</div>
					<div className='flex gap-3'>
						<button className='flex items-center gap-2 bg-white px-5 py-2.5 rounded-xl border border-outline-variant/30 text-on-surface-variant font-label-sm text-label-sm hover:border-primary transition-all'>
							<span className='material-symbols-outlined text-[18px]'>file_download</span>Export CSV
						</button>
						<button className='flex items-center gap-2 bg-gradient-to-r from-primary-container to-secondary-container px-6 py-2.5 rounded-xl text-on-primary-container font-label-sm text-label-sm font-bold shadow-lg shadow-primary-container/20 hover:scale-[1.02] active:scale-95 transition-all'>
							<span className='material-symbols-outlined text-[18px]'>add</span>Create Order
						</button>
					</div>
				</div>

				<div className='glass-card rounded-2xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 bg-white border border-outline-variant/20 shadow-sm'>
					<div className='flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar'>
						{FILTER_TABS.map((tab) => (
							<button
								key={tab.value}
								onClick={() => handleFilterChange(tab.value)}
								className={`px-6 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${activeFilter === tab.value ? 'bg-primary text-white' : 'hover:bg-primary/5 text-on-surface-variant'}`} >
								{tab.label}
							</button>
						))}
					</div>
					<div className='flex items-center gap-3 ml-auto'>
						<div className='flex items-center gap-2 bg-white/50 border border-outline-variant/20 rounded-lg px-3 py-2 text-on-surface-variant/70 text-sm'>
							<span className='material-symbols-outlined text-[18px]'>calendar_today</span>
							<span>Live Tracking Stream</span>
						</div>
					</div>
				</div>

				<div className='glass-panel rounded-2xl overflow-hidden bg-white border border-outline-variant/20 shadow-sm mb-6'>
					<table className='w-full text-left border-collapse'>
						<thead>
						<tr className="bg-surface-container/30 border-b border-outline-variant/10 bg-slate-50">
							<th className="px-6 py-5 font-semibold text-sm text-on-surface-variant/70">Order ID</th>
							<th className="px-6 py-5 font-semibold text-sm text-on-surface-variant/70">Customer</th>
							<th className="px-6 py-5 font-semibold text-sm text-on-surface-variant/70">Date</th>
							<th className="px-6 py-5 font-semibold text-sm text-on-surface-variant/70">Product</th>
							<th className="px-6 py-5 font-semibold text-sm text-on-surface-variant/70">Amount</th>
							<th className="px-6 py-5 font-semibold text-sm text-on-surface-variant/70">Status</th>
							<th className="px-6 py-5 font-semibold text-sm text-on-surface-variant/70 text-right">Actions</th>
						</tr>
						</thead>

						<tbody className="divide-y divide-outline-variant/5">
						{isLoading ? (
							<tr>
								<td colSpan={7} className='px-6 py-10 text-center text-sm text-on-surface-variant/60'>
									Synchronizing active orders with Supabase ledger...
								</td>
							</tr>
						) : orders.length === 0 ? (
							<tr>
								<td colSpan={7} className="px-6 py-10 text-center text-sm text-on-surface-variant/60">
									No transaction logs found matching this lifecycle scope.
								</td>
							</tr>
						) : (
							orders.map((order) => (
								<tr key={order.id} className='hover:bg-primary/5 transition-colors group'>
									<td className='px-6 py-4 text-sm text-primary font-bold'>
										#ORD-{order.id}
									</td>
									<td className='px-6 py-4'>
										<span className='text-sm font-semibold text-slate-800'>{order.customer_name || 'Guest Checkout'}</span>
									</td>
									<td className='px-6 py-4 text-sm text-slate-500'>
										{order.created_at ? new Date(order.created_at).toLocaleDateString() : 'N/A'}
									</td>
									<td className='px-6 py-4 text-sm text-slate-600'>
										{order.product_name}
									</td>
									<td className='px-6 py-4 text-sm font-semibold text-slate-800'>
										${order.total?.toLocaleString()}
									</td>
									<td className='px-6 py-4'>
											<span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(order.status)}`}>
												{order.status}
											</span>
									</td>
									<td className='px-6 py-4 text-right'>
										<button
											onClick={() => handleStatusUpdate(order.id, order.status)}
											className='text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg font-medium transition-colors'
										>
											Cycle Status
										</button>
									</td>
								</tr>
							))
						)}
						</tbody>
					</table>
				</div>

				{/* Interactive Pagination Controls */}
				{!isLoading && totalPages > 1 && (
					<div className='flex items-center justify-between px-2 py-4 border-t border-outline-variant/10'>
						<span className='text-sm text-slate-500'>
							Page <strong className='text-slate-800'>{currentPage}</strong> of <strong className='text-slate-800'>{totalPages}</strong> ({totalCount} entries)
						</span>
						<div className='flex gap-2'>
							<button
								onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
								disabled={currentPage === 1}
								className='px-4 py-2 text-sm border rounded-lg bg-white font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors'
							>
								Previous
							</button>
							<button
								onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
								disabled={currentPage === totalPages}
								className='px-4 py-2 text-sm border rounded-lg bg-white font-medium text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors'
							>
								Next
							</button>
						</div>
					</div>
				)}
			</div>
		</main>
	)
}

export default Orders;
