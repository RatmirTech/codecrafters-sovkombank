import { cn } from '@/lib/utils'

interface SubtitleProps extends React.HTMLAttributes<HTMLElement> {}

export const Subtitle = ({ children, className, ...props }: SubtitleProps) => {
	return (
		<p
			className={cn(
				'font-normal leading-loose dark:text-neutral-400 text-neutral-500 max-w-2xl',
				className
			)}
			{...props}
		>
			{children}
		</p>
	)
}
