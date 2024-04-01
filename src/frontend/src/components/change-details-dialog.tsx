'use client'

import { UpdateSchema } from '@/schemas'
import { User } from '@/types/index.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from './ui/button'
import { Dialog } from './ui/dialog'
import { Input } from './ui/input'
import { SpinButton } from './ui/spin-button'

interface ChangeDetailsFormProps {
	user: User
}

export const ChangeDetailsDialog = ({ user }: ChangeDetailsFormProps) => {
	const [loading, setIsLoading] = useState<boolean>(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof UpdateSchema>>({
		resolver: zodResolver(UpdateSchema),
		defaultValues: {
			phone_number: user.phone_number || '',
			email: user.email || '',
			first_name: user.first_name || '',
			last_name: user.last_name || '',
			middle_name: user.middle_name || '',
			documents: {
				registration_address: user.documents.registration_address || '',
				passport_details: user.documents.passport_details || '',
				passport_issued_at: user.documents.passport_issued_at || '',
				inn: user.documents.inn || '',
				snils: user.documents.snils || '',
				place_of_birth: user.documents.place_of_birth || '',
				date_of_birth: user.documents.passport_issued_at || '',
			},
		},
	})

	const onSubmit = (data: any) => {
		setIsLoading(true)
		console.log(data)
		setIsLoading(false)
	}

	return (
		<Dialog
			variant='secondary'
			size='lg'
			btnClassName='w-max self-end'
			text='Изменить данные аккаунта'
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='w-full flex flex-col gap-y-4'
			>
				<div className='flex flex-col lg:flex-row justify-between gap-x-4'>
					<div className='flex-1 flex flex-col gap-y-2'>
						<Input
							{...register('last_name')}
							placeholder={user.last_name}
							text='Фамилия'
						/>
						<Input
							{...register('first_name')}
							placeholder={user.first_name}
							text='Имя'
						/>
						<Input
							{...register('middle_name')}
							placeholder={user.middle_name}
							text='Отчество'
						/>
						<Input
							{...register('email')}
							placeholder={user.email}
							type='email'
							text='Емейл'
						/>
						<Input
							{...register('phone_number')}
							placeholder={user.phone_number}
							text='Номер телефона'
							maxLength={12}
						/>
						<Input
							{...register('documents.registration_address')}
							placeholder={user.documents.registration_address}
							text='Адрес регистрации'
						/>
					</div>
					<div className='flex-1 flex flex-col gap-y-2'>
						<Input
							disabled
							{...register('documents.passport_details')}
							placeholder={user.documents.passport_details}
							text='Серия и номер паспорта'
							maxLength={11}
						/>
						<Input
							disabled
							{...register('documents.passport_issued_at')}
							value={user.documents.passport_issued_at}
							text='Дата выдачи паспорта'
						/>
						<Input
							disabled
							{...register('documents.inn')}
							placeholder={user.documents.inn}
							text='ИНН'
							maxLength={10}
						/>
						<Input
							disabled
							{...register('documents.snils')}
							placeholder={user.documents.snils}
							text='СНИЛС'
							maxLength={11}
						/>
						<Input
							disabled
							{...register('documents.place_of_birth')}
							placeholder={user.documents.place_of_birth}
							text='Место рождения'
						/>
						<Input
							{...register('documents.date_of_birth')}
							value={user.documents.date_of_birth}
							text='Дата рождения'
							disabled
						/>
					</div>
				</div>
				<div className='flex self-end gap-x-3'>
					<Button
						type='button'
						value='cancel'
						formMethod='dialog'
						variant='outline'
					>
						Закрыть
					</Button>
					<SpinButton
						formMethod='dialog'
						type='submit'
						className='mt-auto'
						loading={loading}
						value='submit'
					>
						Изменить данные
					</SpinButton>
				</div>
			</form>
		</Dialog>
	)
}
