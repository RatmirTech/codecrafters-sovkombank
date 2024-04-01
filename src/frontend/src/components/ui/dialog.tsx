'use client'

import { cn } from '@/lib/utils'
import { useRef } from 'react'
import { Button } from './button'

interface DialogProps {
	className?: string
	btnClassName?: string
	variant?:
		| 'default'
		| 'destructive'
		| 'outline'
		| 'secondary'
		| 'ghost'
		| 'link'
	size?: 'default' | 'sm' | 'lg' | 'icon' | 'full'
	text: React.ReactNode
	children: React.ReactNode
}

export const Dialog = ({
	text,
	className,
	btnClassName,
	children,
	size,
	variant = 'default',
}: DialogProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null)
	return (
		<>
			<Button
				size={size}
				className={btnClassName}
				variant={variant}
				onClick={() => dialogRef.current?.showModal()}
			>
				{text}
			</Button>
			<dialog
				ref={dialogRef}
				className={cn(
					'inset-0 block w-2/3 max-w-[750px] translate-y-20 rounded-lg border p-8 opacity-0 transition-[opacity, transform] duration-300 backdrop:backdrop-blur-sm [&:not([open])]:pointer-events-none [&[open]]:translate-y-0 [&[open]]:opacity-100',
					className
				)}
				onClick={ev => {
					const target = ev.target as HTMLButtonElement
					if (target.nodeName === 'DIALOG' || target.value === 'cancel') {
						dialogRef.current?.close()
					}
				}}
				onClose={ev => {
					const target = ev.target as HTMLDialogElement
					if (target.nodeName === 'DIALOG') {
						target.close()
					}
				}}
				onSubmit={ev => {
					dialogRef.current?.close()
				}}
			>
				<div className='mb-3'>
					<h3 className='text-neutral-800 font-bold text-2xl'>{text}</h3>
					<Button
						type='button'
						variant='outline'
						size='icon'
						onClick={() => dialogRef?.current?.close()}
						className='absolute right-4 top-4 flex h-8 w-8 rounded-md p-3 text-xl flex-col gap-y-1'
					>
						<span className='h-[1px] w-4 block dark:bg-neutral-50 bg-neutral-500 -rotate-45 absolute' />
						<span className='h-[1px] w-4 block dark:bg-neutral-50 bg-neutral-500 rotate-45' />
					</Button>
				</div>
				{children}
			</dialog>
		</>
	)
}
