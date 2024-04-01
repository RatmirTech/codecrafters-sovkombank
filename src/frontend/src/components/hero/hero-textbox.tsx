import { cn } from '@/lib/utils'

interface HeroTextBoxProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeroTextbox = ({
	children,
	className,
	...props
}: HeroTextBoxProps) => {
	return (
		<div className={cn('flex flex-col gap-y-2', className)} {...props}>
			{children}
		</div>
	)
}
