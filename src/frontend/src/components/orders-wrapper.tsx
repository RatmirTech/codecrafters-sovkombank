'use client'

import { GetMyOrders } from '@/actions/orders'
import { cn } from '@/lib/utils'
import { GetOrdersResponse } from '@/types/index.types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'

export const OrdersWrapper = () => {
	const [orders, setOrders] = useState<GetOrdersResponse[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const res = await GetMyOrders()
			console.log(res)
			setOrders(res)
		}
		if (orders.length > 0) return
		fetchData()
	}, [])
	return (
		<motion.section
			initial={{
				opacity: 0,
				y: 20,
			}}
			animate={{
				opacity: 1,
				y: 0,
			}}
			exit={{
				opacity: 0,
				y: 20,
			}}
			transition={{
				duration: 0.75,
				delay: 0.25,
			}}
		>
			<div className='mt-6'>
				<h1 className='text-3xl mb-4 font-bold text-neutral-800'>Мои заявки</h1>
				{orders ? (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Счет 1</TableHead>
								<TableHead>Счет 2</TableHead>
								<TableHead>Валюта 1</TableHead>
								<TableHead>Валюта 2</TableHead>
								<TableHead>Статус</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map((item, idx) => (
								<TableRow
									className={cn(
										item.status === 'Одобрено' && 'bg-green-100',
										item.status === 'Отклонено' && 'bg-red-100'
									)}
									key={`order-${idx}`}
								>
									<TableCell
										className={cn(
											'text-neutral-800 font-medium',
											item.status === 'Одобрено' && 'text-green-900',
											item.status === 'Отклонено' && 'text-red-900'
										)}
									>
										{item.bankAccountFrom}
									</TableCell>
									<TableCell
										className={cn(
											'text-neutral-800 font-medium',
											item.status === 'Одобрено' && 'text-green-900',
											item.status === 'Отклонено' && 'text-red-900'
										)}
									>
										{item.bankAccountTo}
									</TableCell>
									<TableCell>
										<div className='flex gap-x-2 items-center'>
											<h5
												className={cn(
													'text-neutral-800 font-medium',
													item.status === 'Одобрено' && 'text-green-900',
													item.status === 'Отклонено' && 'text-red-900'
												)}
											>
												{item.currencyFromValue}
											</h5>
											<span
												className={cn(
													'text-neutral-800 font-medium',
													item.status === 'Одобрено' && 'text-green-900',
													item.status === 'Отклонено' && 'text-red-900'
												)}
											>
												{item.currencyFrom}
											</span>
										</div>
									</TableCell>
									<TableCell>
										<div className='flex gap-x-2 items-center'>
											<h5
												className={cn(
													'text-neutral-800 font-medium',
													item.status === 'Одобрено' && 'text-green-900',
													item.status === 'Отклонено' && 'text-red-900'
												)}
											>
												{item.currencyToValue}
											</h5>
											<span
												className={cn(
													'text-neutral-800 font-medium',
													item.status === 'Одобрено' && 'text-green-900',
													item.status === 'Отклонено' && 'text-red-900'
												)}
											>
												{item.currencyTo}
											</span>
										</div>
									</TableCell>
									<TableCell
										className={cn(
											'text-neutral-800 font-medium',
											item.status === 'Одобрено' && 'text-green-900',
											item.status === 'Отклонено' && 'text-red-900'
										)}
									>
										{item.status}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				) : (
					<div className='rounded-lg'>
						<span className='font-medium text-xl text-neutral-800'>
							Заявки отсутствуют
						</span>
					</div>
				)}
			</div>
		</motion.section>
	)
}
