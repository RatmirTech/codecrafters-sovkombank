'use client'

import { GetCurrency } from '@/actions/currency'
import { Currency, CurrencyRequestTypes, Option } from '@/types/index.types'
import { useEffect, useState } from 'react'
import { Select } from './ui/select'
/*import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from './ui/table'*/
import { motion } from 'framer-motion'
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

export const RatesPredictionTable = () => {
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
		options[0]
	)
	const [selectedValue2, setSelectedValue2] = useState<Option | undefined>(
		options[1]
	)
	const [values, setValues] = useState<{
		value1: number
		value2: number
	}>({
		value1: 0,
		value2: 0,
	})
	const [rates, setRates] = useState<Array<Currency>>([])

	const avgDiff = (arr: Array<Currency>) => {
		let sum = 0
		for (let i = 0; i < arr.length - 1; i++) {
			let diff = Math.abs(arr[i].rate - arr[i + 1].rate)
			sum += diff
		}

		return sum / arr.length
	}

	useEffect(() => {
		if (selectedValue1?.value == selectedValue2?.value) {
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
					const data = await GetCurrency({
						currency: currency_to_send,
						days: 7,
					})
					if (!data.ok) {
						return
					}
					const sorted = data.items.sort((item_1, item_2) =>
						item_1.date > item_2.date ? 1 : -1
					)
					let min = Math.min(...data.items.map(item => item.rate))
					let max = Math.max(...data.items.map(item => item.rate))
					let avg = avgDiff(data.items)
					setValues({ value1: min - avg * 3, value2: max + avg * 3 })
					setRates(sorted)
				}
			}
		}

		fetchData()
	}, [selectedValue1, selectedValue2])

	return (
		<motion.div
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
			className='mt-6 w-full flex flex-col gap-y-6'
		>
			<div className='flex flex-col gap-y-4'>
				<h3 className='text-3xl font-bold text-neutral-800'>
					Прогноз курса валют
				</h3>
				<div className='flex gap-x-6 gap-y-4 flex-wrap'>
					<Select
						text='Валюта 1'
						type='variants'
						value={selectedValue1}
						onChange={setSelectedValue1}
						options={options}
					/>
					<Select
						text='Валюта 2'
						type='variants'
						value={selectedValue2}
						onChange={setSelectedValue2}
						options={options.filter(el => el.value != selectedValue1?.value)}
					/>
				</div>
			</div>
			<div className='bg-white h-[65vh] rounded-lg p-3'>
				{rates.length > 0 ? (
					<ResponsiveContainer className='w-max' width='100%' height='100%'>
						<LineChart
							className='pr-2'
							width={500}
							height={300}
							font-medium
							data={rates}
						>
							<XAxis
								className='text-xs font-medium'
								dataKey='date'
								name='date'
								type='category'
								tickFormatter={tick =>
									new Date(tick).toLocaleString().slice(0, 10)
								}
							/>
							<YAxis
								className='text-xs font-medium'
								dataKey='rate'
								tickFormatter={tick => tick.toFixed(4)}
								domain={[values.value1, values.value2]}
							/>
							<Tooltip />
							<CartesianGrid strokeDasharray='3 3' />
							<Line
								type='monotone'
								className='stroke-brand-blue'
								dataKey='rate'
							/>
						</LineChart>
					</ResponsiveContainer>
				) : (
					<div>Загрузка...</div>
				)}
				{/*<Table>
					<TableHeader>
						<TableRow className='h-12 grid grid-cols-3 items-center'>
							<TableHead className='h-max'>Дата</TableHead>
							<TableHead className='h-max'>Валюта</TableHead>
							<TableHead className='h-max'>Цена</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rates?.map((rate, idx) => (
							<TableRow className='grid grid-cols-3' key={`row-${idx}`}>
								<TableCell className='text-md font-medium text-neutral-800'>
									{rate.date.toString().slice(0, 10)}
								</TableCell>
								<TableCell className='text-md font-medium text-neutral-800'>
									{selectedValue1?.label + '/' + selectedValue2?.label}
								</TableCell>
								<TableCell className='text-md font-medium text-neutral-800'>
									{rate.rate}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
						</Table>*/}
			</div>
		</motion.div>
	)
}
