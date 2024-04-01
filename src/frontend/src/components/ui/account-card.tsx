'use client'

import { AccountResponse } from '@/types/index.types'
import { TopUpDialog } from '../topup-dialog'

export const AccountCard = ({
	account_number,
	currency,
	balance,
	setReload,
}: AccountResponse & { setReload: (val: boolean) => void }) => {
	return (
		<div className='p-6 flex flex-col gap-y-2 bg-white rounded-lg snap-start snap-always'>
			<div className='flex items-start gap-x-3 mb-2'>
				<div className='p-2 h-full aspect-square flex items-center justify-center rounded-full bg-brand-red'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						className='w-7 h-7 fill-neutral-50'
					>
						<path d='M4.5 3.75a3 3 0 0 0-3 3v.75h21v-.75a3 3 0 0 0-3-3h-15Z' />
						<path
							fillRule='evenodd'
							d='M22.5 9.75h-21v7.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-7.5Zm-18 3.75a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z'
							clipRule='evenodd'
						/>
					</svg>
				</div>

				<div className='flex flex-col gap-y-1'>
					<h3 className='text-neutral-800 font-bold text-xl'>
						{balance}
						<span className='pl-2 text-neutral-600 text-sm font-medium'>
							{currency.code}
						</span>
					</h3>
					<p className='text-neutral-600 text-sm font-medium'>
						{account_number}
					</p>
				</div>
			</div>
			<TopUpDialog setReload={setReload} account_number={account_number} />
		</div>
	)
}
