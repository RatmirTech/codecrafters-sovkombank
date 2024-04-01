'use client'

import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from './button'

interface HoverEffectProps {
	items: {
		title: string
		href: string
		action?: () => void
	}[]
	className?: string
	authorized?: boolean
}

export const HoverEffect = ({ items, className }: HoverEffectProps) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
	return (
		<div
			className={cn(
				'flex gap-x-1 p-1 rounded-full border border-brand-blue',
				className
			)}
		>
			{items.map((item, idx) =>
				!item.action ? (
					<Link
						key={`hover-menu-item-${idx}`}
						className='relative group'
						onMouseEnter={() => setHoveredIndex(idx)}
						onMouseLeave={() => setHoveredIndex(null)}
						href={item.href}
					>
						<AnimatePresence>
							{hoveredIndex === idx && (
								<motion.span
									className='absolute inset-0 h-full w-full bg-brand-blue block rounded-full'
									layoutId='hoverBackground'
									initial={{ opacity: 0 }}
									animate={{
										opacity: 1,
										transition: { duration: 0.15 },
									}}
									exit={{
										opacity: 0,
										transition: { duration: 0.15, delay: 0.2 },
									}}
								/>
							)}
						</AnimatePresence>
						<li
							key={`link-${idx}`}
							className='relative p-2 list-none font-medium transition-all rounded-full group-hover:text-neutral-50 text-brand-blue'
						>
							{item.title}
						</li>
					</Link>
				) : (
					<Button variant='ghost' key={`nav-link-${idx}`} onClick={item.action}>
						<AnimatePresence>
							{hoveredIndex === idx && (
								<motion.span
									className='absolute inset-0 h-full w-full bg-brand-blue block rounded-full'
									layoutId='hoverBackground'
									initial={{ opacity: 0 }}
									animate={{
										opacity: 1,
										transition: { duration: 0.15 },
									}}
									exit={{
										opacity: 0,
										transition: { duration: 0.15, delay: 0.2 },
									}}
								/>
							)}
						</AnimatePresence>
						<li
							key={`link-${idx}`}
							className='relative p-2 list-none font-medium transition-all rounded-full group-hover:text-neutral-50 text-brand-blue'
						>
							{item.title}
						</li>
					</Button>
				)
			)}
		</div>
	)
}
