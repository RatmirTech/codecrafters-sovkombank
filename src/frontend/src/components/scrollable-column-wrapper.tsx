interface ScrollableColumnWrapperProps {
	textNode: React.ReactNode
	children: React.ReactNode
}

export const ScrollableColumnWrapper = ({
	textNode,
	children,
}: ScrollableColumnWrapperProps) => {
	return (
		<section className='h-full max-h-screen flex flex-col gap-y-6'>
			<h3 className='text-3xl font-bold text-neutral-800'>{textNode}</h3>
			<div className='flex max-h-[81vh] overflow-y-scroll snap-y snap-mandatory flex-col gap-y-6'>
				{children}
			</div>
		</section>
	)
}
