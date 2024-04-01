'use client'

import { GetBankAccounts } from '@/actions/account'
import { BuyCurrencyForm } from '@/components/buy-currency-form'
import { OrdersWrapper } from '@/components/orders-wrapper'
import { RatesPredictionTable } from '@/components/rates-prediction-table'
import { ScrollableColumnWrapper } from '@/components/scrollable-column-wrapper'
import { AccountCard } from '@/components/ui/account-card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAccessToken } from '@/services/auth-token.service'
import { GetAccountResponse } from '@/types/index.types'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { CreateAccountDialog } from './create-account-dialog'

export const ExchangeWrapper = () => {
	const [accounts, setAccounts] = useState<GetAccountResponse>([])
	const [reload, setReload] = useState<boolean>(true)

	useEffect(() => {
		const fetchAccounts = async () => {
			setReload(false)
			if (getAccessToken()) {
				const res = await GetBankAccounts()
				if (res.length <= 0) {
					return
				}
				setAccounts(res)
			}
		}

		if (!reload) return
		fetchAccounts()
	}, [reload])
	return (
		<section className='relative h-full py-6 pb-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8'>
			<motion.div
				initial={{
					opacity: 0,
					y: -20,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				exit={{
					opacity: 0,
					y: -20,
				}}
				transition={{
					duration: 0.75,
					delay: 0.25,
				}}
				className='col-span-2 w-full'
			>
				<Tabs defaultValue='prediction' className='relative h-full w-full'>
					<TabsList className='flex-wrap min-h-10 h-max'>
						<TabsTrigger value='prediction'>Прогноз курса</TabsTrigger>
						<TabsTrigger value='buy'>Быстрая покупка/продажа</TabsTrigger>
						<TabsTrigger value='my-orders'>Мои заявки</TabsTrigger>
					</TabsList>
					<TabsContent value='prediction'>
						<RatesPredictionTable />
					</TabsContent>
					<TabsContent value='buy'>
						<BuyCurrencyForm setReload={setReload} accounts={accounts} />
					</TabsContent>
					<TabsContent value='my-orders'>
						<OrdersWrapper />
					</TabsContent>
				</Tabs>
			</motion.div>
			<motion.div
				className='sticky top-20 col-span-2 lg:col-span-1 h-max'
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
					delay: 0.5,
				}}
			>
				<ScrollableColumnWrapper textNode={<>Ваши счета</>}>
					<>
						{accounts.map((item, idx) => (
							<AccountCard
								key={`account-card-${idx}`}
								account_number={item.account_number}
								currency={item.currency}
								balance={item.balance}
								setReload={setReload}
							/>
						))}
						{accounts.length === 0 && (
							<div>
								<h3>У вас еще нет счетов</h3>
							</div>
						)}
						<CreateAccountDialog setReload={setReload} />
					</>
				</ScrollableColumnWrapper>
			</motion.div>
		</section>
	)
}
