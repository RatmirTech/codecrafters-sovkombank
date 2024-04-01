'use client'
import { GetTodaysCurrency } from '@/actions/currency'
import { CreateOrder } from '@/actions/orders'
import { cn } from '@/lib/utils'
import { CreateOrderSchema } from '@/schemas'
import {
	AccountResponse,
	CurrencyRequestTypes,
	GetAccountResponse,
	Option,
} from '@/types/index.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { SpinButton } from './ui/spin-button'

interface BuyCurrencyForm {
	accounts: GetAccountResponse
	setReload: (val: boolean) => void
}

export const BuyCurrencyForm = ({ accounts, setReload }: BuyCurrencyForm) => {
	const options = [
		{
			label: 'AED',
			value: 'aed',
		},
		{
			label: 'RUB',
			value: 'rub',
		},
		{
			label: 'CNY',
			value: 'cny',
		},
	] as Array<Option>

	const [selectedValue1, setSelectedValue1] = useState<Option | undefined>(
		undefined
	)
	const [selectedValue2, setSelectedValue2] = useState<Option | undefined>(
		undefined
	)
	const [currency, setCurrency] = useState<number>(0)
	const [value, setValue] = useState<number>(0)
	const [active, setActive] = useState<AccountResponse | undefined>(undefined)
	const [active2, setActive2] = useState<AccountResponse | undefined>(undefined)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)
	const router = useRouter()

	const handleChange = (e: any) => {
		if (currency > 0) {
			setValue(Number(e.target.value) * currency)
		}
	}

	useEffect(() => {
		if (
			selectedValue1?.value == selectedValue2?.value &&
			selectedValue1 != undefined &&
			selectedValue2 != undefined
		) {
			setSelectedValue2(
				options.filter(el => el.value != selectedValue1?.value)[0]
			)
		}

		const fetchData = async () => {
			if (
				selectedValue1 &&
				selectedValue1.value &&
				selectedValue2 &&
				selectedValue2.value
			) {
				if (selectedValue1.value != selectedValue2.value) {
					let currency_to_send = (selectedValue1.value +
						'-' +
						selectedValue2.value) as CurrencyRequestTypes
					const data = await GetTodaysCurrency({
						currency: currency_to_send,
					})
					setCurrency(data.items[0].rate)
					if (Number(inputRef.current?.value) > 0) {
						setValue(Number(inputRef.current?.value) * currency)
					}
				}
			}
		}
		fetchData()
	}, [selectedValue1, selectedValue2])

	useEffect(() => {
		setActive(undefined)
	}, [selectedValue1])

	useEffect(() => {
		setActive2(undefined)
	}, [selectedValue2])

	useEffect(() => {
		setValue(Number(inputRef.current?.value) * currency)
	}, [currency])

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<z.infer<typeof CreateOrderSchema>>({
		resolver: zodResolver(CreateOrderSchema),
		defaultValues: {
			order_type: '',
			currency_from_value: 0,
			bank_account_from: '',
			bank_account_to: '',
		},
	})

	const onSubmit = async (data: z.infer<typeof CreateOrderSchema>) => {
		data.order_type = selectedValue1?.label === 'RUB' ? 'Покупка' : 'Продажа'
		if (!active?.account_number) {
			setError('root', {
				message: 'Выберите счет валюты 1 или если его нет, то создайте его',
			})
			return
		}
		data.bank_account_from = active.account_number
		data.currency_from_value = Number(inputRef.current?.value)
		if (!active2?.account_number) {
			setError('root', {
				message: 'Выберите счет валюты 2 или если его нет, то создайте его',
			})
			return
		}
		data.bank_account_to = active2.account_number
		if (!data.bank_account_from || !data.currency_from_value) {
			setError('root', { message: 'Заполните все поля' })
			return
		}
		if (Number(active?.balance) - data.currency_from_value < 0) {
			setError('root', { message: 'Недостаточно средств' })
			return
		}
		setIsLoading(true)
		await CreateOrder({
			order_type: data.order_type,
			currency_from_value: data.currency_from_value,
			bank_account_from: data.bank_account_from,
			bank_account_to: data.bank_account_to,
		})
		setTimeout(() => {
			setReload(true)
			setIsLoading(false)
		}, 11000)
	}

	return (
		<motion.form
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
			onSubmit={handleSubmit(onSubmit)}
			className='mt-6 flex flex-col gap-y-3 w-full lg:max-w-[650px]'
		>
			<Select
				text='Валюта 1'
				type='variants'
				value={selectedValue1}
				onChange={setSelectedValue1}
				options={options}
			/>
			{selectedValue1?.label && (
				<div className='flex flex-col gap-y-1'>
					<span className='text-neutral-600 font-regular'>
						Выберите счет для валюты 1
					</span>
					<div className='flex gap-x-2'>
						{accounts.filter(e => e.currency.code == selectedValue1?.label)
							.length > 0 ? (
							accounts
								.filter(e => e.currency.code == selectedValue1?.label)
								.map((item, idx) => (
									<div
										onClick={() => setActive(item)}
										className={cn(
											'p-3 rounded-lg bg-white hover:bg-neutral-100 transition-all cursor-pointer',
											active?.account_number === item.account_number &&
												'bg-brand-blue hover:bg-brand-blue/90'
										)}
										key={idx}
									>
										<h4
											className={cn(
												'text-lg font-bold text-neutral-900',
												active?.account_number === item.account_number &&
													'text-neutral-50'
											)}
										>
											{item.balance + ' ' + item.currency.code}
										</h4>
										<p
											className={cn(
												'text-xs text-neutral-600 font-medium',
												active?.account_number === item.account_number &&
													'text-neutral-200'
											)}
										>
											{item.account_number}
										</p>
									</div>
								))
						) : (
							<div className='p-3 rounded-lg bg-brand-blue'>
								<span className='font-medium text-neutral-50'>
									У вас нет счета в данной валюте
								</span>
							</div>
						)}
					</div>
				</div>
			)}
			<Input
				{...register('currency_from_value')}
				onChange={e => handleChange(e)}
				ref={inputRef}
				text='Оплатить'
				placeholder='Введите сумму'
			/>
			<Select
				text='Валюта 2'
				type='variants'
				value={selectedValue2}
				onChange={setSelectedValue2}
				options={options.filter(el => el.value != selectedValue1?.value)}
			/>
			{selectedValue2?.label && (
				<div className='flex flex-col gap-y-1'>
					<span className='text-neutral-600 font-regular'>
						Выберите счет для валюты 2
					</span>
					<div className='flex gap-x-2'>
						{accounts.filter(e => e.currency.code == selectedValue2?.label)
							.length > 0
							? accounts
									.filter(e => e.currency.code == selectedValue2?.label)
									.map((item, idx) => (
										<div
											onClick={() => setActive2(item)}
											className={cn(
												'p-3 rounded-lg bg-white hover:bg-neutral-100 transition-all cursor-pointer',
												active2?.account_number === item.account_number &&
													'bg-brand-blue hover:bg-brand-blue/90'
											)}
											key={idx}
										>
											<h4
												className={cn(
													'text-lg font-bold text-neutral-900',
													active2?.account_number === item.account_number &&
														'text-neutral-50'
												)}
											>
												{item.balance + ' ' + item.currency.code}
											</h4>
											<p
												className={cn(
													'text-xs text-neutral-600 font-medium',
													active2?.account_number === item.account_number &&
														'text-neutral-200'
												)}
											>
												{item.account_number}
											</p>
										</div>
									))
							: selectedValue2 !== undefined && (
									<div className='p-3 rounded-lg bg-brand-blue'>
										<span className='font-medium text-neutral-50'>
											У вас нет счета в данной валюте
										</span>
									</div>
							  )}
					</div>
				</div>
			)}
			<div className='flex flex-col gap-y-2'>
				<Input text='Получить' value={value.toFixed(2).toString()} disabled />
				<span className='text-xs text-neutral-600'>
					Текущий курс: {currency ? currency.toFixed(2) : '--'}
				</span>
			</div>
			<SpinButton type='submit' loading={isLoading}>
				{selectedValue1?.label === 'RUB' ? 'Купить' : 'Продать'}
			</SpinButton>
			{errors.root && (
				<span className='text-red-900 font-medium text-sm'>
					{errors.root.message}
				</span>
			)}
		</motion.form>
	)
}
