import { cn } from '@/lib/utils'

interface GradientTitleProps extends React.HTMLAttributes<HTMLElement> {
	defaultColors?: boolean
}

export const GradientTitle = ({
	defaultColors = true,
	className,
	children,
	...props
}: GradientTitleProps) => {
	return (
		<h1
			className={cn(
				'font-extrabold bg-clip-text text-transparent bg-gradient-to-br  bg-opacity-50',
				defaultColors && 'from-brand-blue to-brand-red',
				className ? className : 'text-6xl md:text-8xl'
			)}
			{...props}
		>
			{children}
		</h1>
	)
}
