'use client'

import { cn } from '@/lib/utils'
import React, { forwardRef } from 'react'

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
	id?: string
	type?: string
	className?: string
	text: string
	placeholder?: string
	value?: string
	setValue?: (s: string) => void
	required?: boolean
	maxLength?: number
	disabled?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			id,
			className,
			type = 'text',
			text,
			value,
			placeholder,
			required,
			maxLength,
			disabled,
			...props
		},
		ref
	) => {
		return (
			<div className='relative flex flex-col gap-y-1'>
				<label className='text-sm dark:text-neutral-300' htmlFor={`id-${text}`}>
					{text}
				</label>
				{type === 'file' && (
					<label
						htmlFor={`id-${text}`}
						className='py-3 px-3 border rounded-lg border-neutral-300 text-xs text-neutral-500'
					>
						Выбрать файл
					</label>
				)}
				<input
					ref={ref}
					id={`id-${text}`}
					name={`id-${text}`}
					value={value}
					disabled={disabled}
					className={cn(
						'py-2 px-2 hover:border-brand-blue/75 outline-brand-blue/75 bg-neutral-50 border rounded-lg border-neutral-300  placeholder:text-sm placeholder:text-neutral-400 transition-all duration-300 file:border-none file:bg-transparent file:text-sm file:placeholder:hidden disabled:cursor-not-allowed disabled:text-neutral-500',
						type === 'file' && 'hidden',
						className
					)}
					maxLength={maxLength}
					required={required}
					placeholder={placeholder}
					type={type}
					{...props}
				/>
			</div>
		)
	}
)

Input.displayName = 'Input'
