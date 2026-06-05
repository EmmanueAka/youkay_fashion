'use client'

import React, {useEffect, useState} from 'react'
import {supabase} from "@/lib/supabaseClient";
import Link from "next/link";
import {DatabaseOrder, MonthlySales} from "@/types";


interface Order {
	month: string;
	total_amount: number
}

interface BarItem extends Order {
	height: number;
}

interface DashboardMetrics {
	totalRevenue: number;
	totalOrders: number;
	averageOrderValue: number;
}

const Dashboard = () => {
	const [rawOrders, setRawOrders] = useState<DatabaseOrder[]>([])
	const [salesChart, setSalesChart] = useState<MonthlySales[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [metrics, setMetrics] = useState<DashboardMetrics>({
		totalRevenue: 0,
		totalOrders: 0,
		averageOrderValue: 0,
	})
	const [searchQuery, setSearchQuery] = useState<string>('')

	useEffect(() => {
		const fetchSales = async() => {
			const { data, error } = await supabase
				.from("orders")
				.select("id, created_at, total, customer_name, product_name, status")
				.order('created_at', {ascending: false})

			if(error){
				console.error("Error fetching Orders", error.message)
			}else if(data){
				const ordersData = data as DatabaseOrder[]
				setRawOrders(ordersData)

				const totalRevenue = ordersData.reduce((sum, item)=> sum + Number(item.total || 0), 0);
				const totalOrders = ordersData.length;
				const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

				setMetrics({
					totalRevenue,
					totalOrders,
					averageOrderValue
				})

				const monthlyTotals: Record<string, number> = {}

				ordersData.forEach(order => {
					if(order.created_at){
						const month = new Date(order.created_at).toLocaleString("default", {month: "short"})
						monthlyTotals[month] = (monthlyTotals[month] || 0) + Number(order.total || 0)
					}
				});

				const formattedSales: MonthlySales[] = Object.entries(monthlyTotals).map(([month, total_amount]) => ({
					month,
					total_amount
				}));


				setSalesChart(formattedSales)
			}
			setLoading(false)
		}

		fetchSales()
	}, []);

	const maxAmount = salesChart.length > 0 ? Math.max(...salesChart.map(s => s.total_amount)) : 0;
	const bars: BarItem[] = salesChart.map(s => ({
		...s, height: maxAmount > 0 ? (s.total_amount / maxAmount) * 100 : 0,
	}))

	const getStatusStyles = ( status: string = 'pending') => {
		switch (status.toLowerCase()){
			case 'completed':
			case 'paid':
				return 'bg-green-100 text-green-800 border-green-200';
			case 'pending':
			case 'processing':
				return 'bg-amber-100 text-amber-800 border-amber-200';
			case 'failed':
			case 'cancelled':
				return 'bg-red-100 text-red-800 border-red-200';
			default:
				return 'bg-gray-100 text-gray-800 border-gray-200';
		}
	}

	if (loading ){
		return <div className='h-screen flex items-center justify-center gap-4'>
			<div className='w-12 h-12 rounded-full animate-spin border-b-2 border-gray-500'></div>
			<p>Loading...</p>
		</div>
	}
	return (
		<div className='px-16 h-screen overflow-y-auto scrollbar-hide-default mb-16'>
			<div className='mt-6'>
				<h1 className='text-primary text-5xl font-bold'>Dashboard Overview</h1>
				<h4 className='text-lg text-black/30'>Welcome, back here's what's happening today</h4>
			</div>

			{/*First*/}
			<div className='grid grid-cols-1 mt-8 md:grid-cols-3 gap-gutter'>

				<div
					className='glass-panel p-8 rounded-3xl flex flex-col justify-between h-48 group hover:-translate-y-1 transition-transform duration-300'>
					<div className='flex justify-between'>
						<div className='flex items-center justify-center p-2 rounded-xl bg-primary/30'>
							<span className='material-symbols-outlined text-primary'>payments</span>
						</div>
						<span className='text-tertiary font-bold text-label-sm flex items-center gap-1'>
							<span className='material-symbols-outlined text-sm'>trending_up</span>+12%
						</span>
					</div>
					<h3 className='text-black/40'>TOTAL REVENUE </h3>
					<p className='text-[34px] font-bold'>${metrics.totalRevenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
				</div>

				{/*Second*/}
				<div
					className='glass-panel p-8 rounded-3xl flex flex-col justify-between h-48 group hover:-translate-y-1 transition-transform duration-300'>
					<div className='flex justify-between'>
						<div className='flex items-start justify-center p-2 rounded-xl bg-secondary/20'>
							<span className='material-symbols-outlined text-secondary'>shopping_bag</span>
						</div>
						<span className='text-tertiary font-bold text-label-sm flex items-center gap-1'>
							<span className='material-symbols-outlined text-sm'>trending_up</span>+8%
						</span>
					</div>
					<h3 className='text-black/40'>TOTAL ORDERS</h3>
					<p className='text-[34px] font-bold'>{metrics.totalOrders.toLocaleString()}</p>
				</div>

				{/*Third*/}
				<div
					className='glass-panel p-8 rounded-3xl flex flex-col justify-between h-48 group hover:-translate-y-1 transition-transform duration-300'>
					<div className='flex justify-between'>
						<div className='flex items-center justify-center p-2 rounded-xl bg-tertiary/20 text-tertiary'>
							<span className='material-symbols-outlined '>analytics</span>
						</div>
						<span className='text-red-500 font-bold text-label-sm flex items-center gap-1'>
							<span className='material-symbols-outlined text-sm'>trending_down</span>-12%
						</span>
					</div>
					<h3 className='text-black/40'>AVG.ORDER VALUE</h3>
					<p className='text-[34px] font-bold'>${metrics.averageOrderValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
				</div>
			</div>
			<section className='grid grid-cols-1 lg:grid-cols-3 gap-gutter items-start'>
				<div className='h-64 w-full flex items-end gap-2 md:gap-4 overflow-hidden pt-4'>
					{bars.map((bar, i) => (
						<div key={i} className='flex-1 flex flex-col items-center h-full justify-end group'>
							<div className={`w-full rounded-t-lg transition-all duration-300 relative ${bar.total_amount === maxAmount ? "bg-primary-container/80 shadow-lg" : "bg-primary/20 hover:bg-primary/40"}`}
							     style={{ height: `${bar.height}%` }}
							     title={`$${bar.total_amount.toLocaleString()}`}
							>
								{bar.total_amount === maxAmount && (
									<div className='absolute -top-10 left-1/2 -translate-x-1/2 bg-on-surface text-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10'>
										Peak Sales
									</div>
								)}
							</div>
							<span className='text-[11px] text-black/40 mt-2 font-medium'>{bar.month}</span>
						</div>
					))}
				</div>

				{/*	New order*/}
				<div className='glass-panel overflow-hidden rounded-3xl mt-8 flex flex-col h-full group'>
					<div className='relative h-48'>
						<img alt="Textile focus"
						     className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700'
						     src='https://lh3.googleusercontent.com/aida-public/AB6AXuD2lwQkdD0biXZknP7zMkxZ2o-CY_t6TFNx2QPgpmZAmnRRPIiTn4GGqnYJTd5_2_Swzg8ZyV0buach37_3EyA9oGCjvSozzJuGLQEtlXqgU28Gr_NSoTpINEqiAA1M5k1MsZv92WmbPwC-HpEJkphgGbEM9PJezHLTkyPUOlhGe2-zvTNvTgFxY9sSD6OD8fWFrQsYRnrNyHKcaRHlbOjuPKtekTtqP_9rmSKPxhF-bjq572QjdD-JN_oZuerMkPxN5vne8pfwXjz4'

						/>
						<div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent'></div>
						<span className='absolute top-4 left-4 bg-tertiary/20 backdrop-blur-md border border-tertiary/30 text-white/50 font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter' >Limited Edition</span>
						<div className='absolute bottom-4 left-4 text-white'>
							<p className='font-label-sm opacity-80'>Latest Release</p>
							<h5 className='font-title-md'>Sahara Dawn Scarf</h5>
						</div>
					</div>
					<div className='p-6 space-y-4'>
						<p className='text-body-md text-on-surface-variant/80'>Our newest handmade silk blend is
							outperforming expectations by 45%.</p>
						<Link href='#'
						      className='text-primary font-bold text-label-sm inline-flex items-center gap-2 hover:gap-3 transition-all'>
							View Collections Detail <span className='material-symbols-outlined'>arrow_forward</span>
						</Link>
					</div>

				</div>
			</section>

			<section className="mt-6 glass-panel rounded-3xl overflow-hidden mb-12">
				<div className="p-8 border-b border-outline-variant/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
					<h4 className="font-title-md text-title-md text-on-surface">Recent Sales</h4>
					{/*Search input field*/}
					<input type='text' placeholder='Search customer' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
					       className='w-full bg-black/[0.03] hover:bg-black/[0.05] focus:bg-white border border-transparent focus:border-primary/30 pl-9 pr-4 py-2 rounded-full text-sm placeholder-black/30 text-on-surface transition-all outline-none'
					/>
					<div className="flex gap-4 w-full md:w-auto">
						<button
							className="flex-1 md:flex-none border border-outline-variant/30 px-6 py-2 rounded-full text-label-sm font-bold text-on-surface-variant hover:bg-surface-container transition-colors">Export
							CSV
						</button>
						<button
							className="flex-1 md:flex-none bg-surface-container-highest px-6 py-2 rounded-full text-label-sm font-bold text-on-surface transition-colors">See
							All Orders
						</button>
					</div>
				</div>
				<div className="overflow-x-auto">
					<table className="w-full text-left border-collapse">
						<thead>
						<tr className="bg-surface-container-low/50">
							<th className="px-8 py-5 text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Order
								ID
							</th>
							<th className="px-8 py-5 text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Customer</th>
							<th className="px-8 py-5 text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Product</th>
							<th className="px-8 py-5 text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Date</th>
							<th className="px-8 py-5 text-label-sm text-on-surface-variant uppercase tracking-widest font-bold">Status</th>
							<th className="px-8 py-5 text-label-sm text-on-surface-variant uppercase tracking-widest font-bold text-right">Amount</th>
						</tr>
						</thead>
						<tbody className="divide-y divide-outline-variant/10">
						{rawOrders.length === 0 ? (
							<tr>
								<td colSpan={6} className='px-8 py-10 text-center text-black/40'>No orders found</td>
							</tr>
						): (
							rawOrders.slice(0, 5).map((order) => (
								<tr key={order.id} className='hover:bg-black/[0.02] transition-colors'>
									<td className="px-8 py-4 font-mono text-sm text-primary">#{order.id.slice(0, 8)}</td>
									<td className="px-8 py-4 text-sm font-medium text-on-surface">{order.customer_name || 'Anonymous'}</td>
									<td className="px-8 py-4 text-sm text-on-surface-variant">{order.product_name || 'General Item'}</td>
									<td className="px-8 py-4 text-sm text-on-surface-variant">
										{order.created_at ? new Date(order.created_at).toLocaleDateString("default", { month: "short", day: "numeric", year: "numeric" }) : 'N/A'}
									</td>
									<td className="px-8 py-4 text-sm">
										<span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyles(order.status)}`}>
											{order.status || 'Pending'}
										</span>
									</td>
									<td className="px-8 py-4 text-sm font-bold text-on-surface">
										${Number(order.total || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
									</td>
								</tr>
							))
						)}
						</tbody>
					</table>
				</div>
			</section>
		</div>
	)
}
export default Dashboard
