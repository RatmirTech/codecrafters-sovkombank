'use client'

import { CreateAccount } from '@/actions/account'
import { CreateAccountSchema } from '@/schemas'
import { Option } from '@/types/index.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import { Select } from './ui/select'

interface CreateAccountDialogProps {
	setReload: (val: boolean) => void
}

export const CreateAccountDialog = ({
	setReload,
}: CreateAccountDialogProps) => {
	const [selected, setSelected] = useState<Option | undefined>()
	const [isLoading, setIsLoading] = useState<boolean>()
	const options = [
		{
			label: 'AED',
			value: 'aed',
		},
		{
			label: 'RUB',
			value: 'rub',
		},
		{
			label: 'CNY',
			value: 'cny',
		},
	] as Array<Option>

	const {
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof CreateAccountSchema>>({
		resolver: zodResolver(CreateAccountSchema),
		defaultValues: {
			currency_code: '',
		},
	})

	const onSubmit = async (data: z.infer<typeof CreateAccountSchema>) => {
		if (!selected) {
			alert('Выберите валюту!')
			return
		}
		data.currency_code = selected.label
		setIsLoading(true)
		await CreateAccount({ currency_code: selected.label })
		setIsLoading(false)
		setReload(true)
	}

	return (
		<Dialog
			variant='outline'
			btnClassName='w-full self-end'
			text={<>Открыть новый счет</>}
		>
			<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-y-4'>
				<Select
					text='Выберите валюту'
					type='variants'
					options={options}
					value={selected}
					onChange={setSelected}
				/>
				<Button disabled={isLoading} className='w-max self-end'>
					Открыть счет
				</Button>
			</form>
		</Dialog>
	)
}
