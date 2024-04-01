'use client'

import { cn } from '@/lib/utils'
import { Option } from '@/types/index.types'
import { useState } from 'react'

interface SingleSelectProps {
	value?: Option
	multiple?: false
	onChange: (value: Option | undefined) => void
}

interface MultipleSelectProps {
	value: Option[]
	multiple: true
	onChange: (value: Option[]) => void
}

type SelectProps = {
	options: Option[]
	text?: string
	withoutText?: boolean
	type: 'input' | 'variants'
} & (SingleSelectProps | MultipleSelectProps)

export const Select = ({
	value,
	onChange,
	options,
	multiple,
	text,
	withoutText = false,
	type,
}: SelectProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	function clearOptions() {
		multiple ? onChange([]) : onChange(undefined)
	}

	function isOptionSelected(option: Option) {
		return multiple ? value.includes(option) : option.value === value?.value
	}

	function selectOption(option: Option) {
		if (multiple) {
			if (value?.includes(option)) {
				onChange(value.filter(o => o !== option))
				return
			}
			onChange([...value, option])
			return
		}
		if (option !== value) {
			onChange(option)
		}
	}

	return type === 'input' ? (
		<div
			onBlur={() => setIsOpen(false)}
			onClick={() => setIsOpen(!isOpen)}
			tabIndex={0}
			className='relative min-w-[300px] border border-neutral-300 rounded-lg py-2 px-4 flex justify-between z-100'
		>
			<span
				className={cn(
					'text-neutral-800 font-medium',
					multiple && 'flex gap-x-1'
				)}
			>
				{multiple ? (
					value.length > 0 ? (
						value.map(v => (
							<button
								className='bg-neutral-100  rounded-lg px-2 outline-transparent'
								key={v.value}
								onClick={e => {
									e.stopPropagation()
									selectOption(v)
								}}
							>
								{v.label}
								<span className='ml-1'>&times;</span>
							</button>
						))
					) : (
						<span className='text-neutral-800 font-bold'>
							{text ? text : 'Выберите что-то'}
						</span>
					)
				) : value ? (
					value.label
				) : (
					text
				)}
			</span>
			<button
				onClick={e => {
					e.stopPropagation()
					clearOptions()
				}}
				className=''
			>
				&times;
			</button>
			<ul
				className={cn(
					'absolute top-12 border dark:border-neutral-600 border-neutral-300 w-full left-0 rounded-lg py-2 px-4 translate-y-3 pointer-events-none opacity-0 transition-all duration-300 flex flex-col gap-y-2',
					isOpen && 'translate-y-0 pointer-events-auto opacity-100'
				)}
			>
				{options.map(option => (
					<li
						onClick={e => {
							e.stopPropagation()
							selectOption(option)
							!multiple && setIsOpen(false)
						}}
						key={option.value}
						className={cn(
							'py-1 px-2 rounded-lg font-medium text-neutral-400 hover:bg-neutral-100 hover:text-neutral-900 transition-colors duration-300',
							isOptionSelected(option) && 'text-neutral-900 bg-neutral-100'
						)}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	) : (
		<div className='flex flex-col gap-y-2'>
			<span className='text-neutral-600 font-regular'>
				{!withoutText && (text || 'Выберите что-то')}
			</span>
			<ul className={cn('flex flex-wrap gap-2')}>
				{options.map(option => (
					<li
						onClick={e => {
							e.stopPropagation()
							selectOption(option)
							!multiple && setIsOpen(false)
						}}
						key={option.value}
						className={cn(
							'py-2 px-3 rounded-lg font-medium text-neutral-400 bg-neutral-100 hover:text-neutral-900 dark:hover:text-neutral-50 hover:opacity-90 transition-all duration-300 cursor-pointer',
							isOptionSelected(option) &&
								'text-neutral-50 bg-brand-red hover:text-neutral-50'
						)}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	)
}
