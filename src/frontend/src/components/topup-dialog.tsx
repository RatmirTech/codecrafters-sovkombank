'use client'

import { PutMoney } from '@/actions/account'
import { TopUpSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import { Input } from './ui/input'
import { SpinButton } from './ui/spin-button'

interface TopUpDialogProps {
	account_number: string
	setReload: (val: boolean) => void
}

export const TopUpDialog = ({
	account_number,
	setReload,
}: TopUpDialogProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof TopUpSchema>>({
		resolver: zodResolver(TopUpSchema),
		defaultValues: {
			account_number: account_number,
			value: '',
		},
	})

	const onSubmit = async (data: z.infer<typeof TopUpSchema>) => {
		setIsLoading(true)
		await PutMoney({
			account_number: account_number,
			value: Number(data.value),
		})
		setReload(true)
		setIsLoading(false)
	}

	return (
		<Dialog text={<>Пополнить счет</>}>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
				<Input {...register('value')} placeholder='100' text='Сумма' required />
				<div className='self-end flex gap-x-2 mt-2'>
					<Button
						type='button'
						value='cancel'
						formMethod='dialog'
						variant='outline'
					>
						Отменить
					</Button>
					<SpinButton
						formMethod='dialog'
						type='submit'
						className='mt-auto'
						loading={isLoading}
						value='submit'
					>
						Пополнить счет
					</SpinButton>
				</div>
			</form>
		</Dialog>
	)
}
