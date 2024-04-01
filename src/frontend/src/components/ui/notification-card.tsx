'use client'

import { ReadNotification } from '@/actions/notification'
import { Button } from './button'

export const NotificationCard = ({
	text,
	desc,
	date,
	id,
}: {
	text: string
	desc: string
	date: string
	id: string
}) => {
	return (
		<div className='p-6 flex flex-col gap-y-2 bg-white rounded-lg snap-start snap-always'>
			<div className='flex justify-between items-center'>
				<div className='flex w-full gap-x-4 items-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						className='w-10 h-10 fill-brand-blue'
					>
						<path
							fillRule='evenodd'
							d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z'
							clipRule='evenodd'
						/>
					</svg>
					<div className='flex flex-1 justify-between items-center'>
						<h5 className='text-xl text-neutral-800 font-bold'>{text}</h5>
						<Button
							onClick={async () => await ReadNotification(id)}
							variant='outline'
							size='icon'
						>
							&times;
						</Button>
					</div>
				</div>
			</div>
			<div className='flex flex-col gap-y-2'>
				<p className='text-md text-neutral-500 font-medium line-clamp-2'>
					{desc}
				</p>
				<p className='text-xs text-neutral-400 font-medium line-clamp-2'>
					{date.slice(0, 10)}
				</p>
			</div>
		</div>
	)
}
