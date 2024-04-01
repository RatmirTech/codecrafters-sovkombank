import { cn } from '@/lib/utils'

interface GridBackgroundProps {
	className?: string
}

export const GridBackground = ({ className }: GridBackgroundProps) => {
	return (
		<div
			className={cn(
				'absolute h-[80%] w-full lg:w-1/2 rounded-full overflow-hidden',
				className
			)}
		>
			<div
				className={cn(
					'absolute top-0 left-0 h-[200vh] w-full bg-transparent  bg-grid-blue-500/[0.2] flex items-center justify-center bg-[length:2.5rem_2.5rem] animate-[moving-background_60s_linear_infinite]'
				)}
			/>
			<div className='absolute h-full w-full rounded-full shadow-neutral-50 shadow-[inset_0_0_10rem_10rem]' />
		</div>
	)
}
