import { cn } from '@/lib/utils'

export const BentoGrid = ({
	className,
	children,
}: {
	className?: string
	children?: React.ReactNode
}) => {
	return (
		<div
			className={cn(
				'grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto',
				className
			)}
		>
			{children}
		</div>
	)
}

export const BentoGridItem = ({
	className,
	title,
	description,
	header,
}: {
	className?: string
	title?: string | React.ReactNode
	description?: string | React.ReactNode
	header?: React.ReactNode
}) => {
	return (
		<div
			className={cn(
				'row-span-1 rounded-xl group/bento hover:shadow-xl dark:shadow-neutral-900 transition duration-200 shadow-input p-4 dark:bg-neutral-950 dark:border-neutral-900 bg-white border border-neutral-200 justify-between flex flex-col space-y-4',
				className
			)}
		>
			{header}
			<div className='group-hover/bento:translate-x-1 transition duration-200'>
				<div className='font-bold text-neutral-900 dark:text-neutral-200 mb-2 mt-2'>
					{title}
				</div>
				<div className='font-normal text-balance text-neutral-400 text-xs dark:text-neutral-500'>
					{description}
				</div>
			</div>
		</div>
	)
}
