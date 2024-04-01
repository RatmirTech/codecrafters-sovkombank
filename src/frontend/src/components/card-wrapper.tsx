import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'

interface CardWrapperProps {
	title?: React.ReactNode
	description?: React.ReactNode
	children: React.ReactNode
	linkHref: string
	linkText: React.ReactNode
	className?: string
}

export const CardWrapper = ({
	title,
	description,
	children,
	linkHref,
	linkText,
	className,
}: CardWrapperProps) => {
	return (
		<Card
			className={cn(
				'w-full shadow-none sm:shadow-xl sm:w-max sm:min-w-[500px] z-20',
				className
			)}
		>
			<CardHeader className='pb-4 px-0 sm:px-6'>
				<CardTitle className='text-3xl font-bold text-neutral-800 dark:text-neutral-50'>
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent className='px-0 sm:px-6'>{children}</CardContent>
			<CardFooter className='flex justify-center px-0 sm:px-6'>
				<Link
					className='dark:text-neutral-400  text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-600 transition-colors text-sm text-center'
					href={linkHref}
				>
					{linkText}
				</Link>
			</CardFooter>
		</Card>
	)
}
