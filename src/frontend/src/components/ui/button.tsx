import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
	'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-75',
	{
		variants: {
			variant: {
				default:
					'bg-brand-blue text-neutral-50 hover:bg-brand-blue/90 transition-colors',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border dark:border-neutral-800 border-neutral-200 bg-neutral-50 dark:bg-neutral-950 dark:hover:bg-neutral-900 hover:bg-neutral-100 hover:text-accent-foreground transition-colors',
				secondary:
					'bg-brand-red text-neutral-50 hover:bg-brand-red/90 transition-colors',
				ghost: 'hover:bg-accent hover:text-accent-foreground',
				link: 'text-primary underline-offset-4 hover:underline',
			},
			size: {
				default: 'h-10 px-4 py-2',
				sm: 'h-9 rounded-lg px-3',
				lg: 'rounded-lg px-12 h-12 sm:h-14',
				icon: 'h-10 w-10',
				full: 'h-full',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
)

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, size, asChild = false, ...props }, ref) => {
		const Comp = asChild ? Slot : 'button'
		return (
			<Comp
				className={cn(buttonVariants({ variant, size, className }), '')}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = 'Button'

export { Button, buttonVariants }
