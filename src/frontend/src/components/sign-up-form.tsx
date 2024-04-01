'use client'

import { Register } from '@/actions/auth'
import { RegisterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CardWrapper } from './card-wrapper'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { SpinButton } from './ui/spin-button'

export const SignUpForm = () => {
	const [loading, setIsLoading] = useState<boolean>(false)
	const [accept, setAccept] = useState<boolean>(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			phone_number: '',
			email: '',
			password: '',
			first_name: '',
			last_name: '',
			middle_name: '',
			documents: {
				registration_address: '',
				passport_details: '',
				passport_issued_at: '',
				inn: '',
				snils: '',
				place_of_birth: '',
				date_of_birth: '',
			},
		},
	})

	const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
		setIsLoading(true)
		const res = await Register(data)
		setIsLoading(false)
		if (res.status !== 'Success') {
			setError('root', {
				message: 'Ошибка при регистрации',
			})
			return
		}
		router.replace('/sign-in')
	}

	return (
		<CardWrapper
			title={<>Регистрация</>}
			description={<>description...</>}
			linkHref='/sign-in'
			linkText={<span>Уже зарегистрированы? Войти в аккаунт</span>}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='max-w-2xl flex flex-col gap-y-4'
			>
				<div className='flex flex-col sm:flex-row justify-between gap-4'>
					<div className='flex-1 flex flex-col gap-y-4 sm:gap-y-2'>
						<Input
							text='Фамилия'
							id='id-last_name'
							{...register('last_name')}
							required
						/>
						<Input
							text='Имя'
							id='id-first_name'
							{...register('first_name')}
							required
						/>
						<Input
							text='Отчество'
							id='id-middle_name'
							{...register('middle_name')}
							required
						/>
						<Input
							text='Емейл'
							id='id-email'
							{...register('email')}
							required
							type='email'
						/>
						<Input
							text='Пароль'
							id='id-password'
							{...register('password')}
							required
							type='password'
						/>
						<Input
							text='Номер телефона'
							id='id-phone_number'
							{...register('phone_number')}
							required
							maxLength={12}
						/>
						<Input
							text='Серия и номер паспорта'
							id='id-passport_details'
							{...register('documents.passport_details')}
							maxLength={10}
							required
						/>
					</div>
					<div className='flex-1 flex flex-col gap-y-4 sm:gap-y-2'>
						<Input
							text='Дата выдачи паспорта'
							id='id-passport_issued_at'
							{...register('documents.passport_issued_at')}
							required
						/>
						<Input
							{...register('documents.registration_address')}
							required
							text='Адрес регистрации'
						/>
						<Input
							{...register('documents.inn')}
							required
							maxLength={12}
							text='ИНН'
						/>
						<Input
							{...register('documents.snils')}
							required
							type='snils'
							maxLength={15}
							text='СНИЛС'
						/>
						<Input
							{...register('documents.place_of_birth')}
							required
							text='Место рождения'
						/>
						<Input
							{...register('documents.date_of_birth')}
							required
							text='Дата рождения'
						/>
						<SpinButton
							type='submit'
							disabled={!accept}
							className='mt-2 sm:mt-auto'
							loading={loading}
						>
							Зарегистрироваться
						</SpinButton>
					</div>
				</div>
				{errors.root && (
					<span className='text-red-900 font-medium text-sm'>
						{errors.root.message}
					</span>
				)}
				<div className='flex items-center space-x-3 mt-auto'>
					<Checkbox
						required
						onCheckedChange={e => setAccept(e as boolean)}
						id='id-accept'
					/>
					<label
						htmlFor='id-accept'
						className='text-sm text-neutral-700 dark:text-neutral-400 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
					>
						Согласен на обработку персональных данных
					</label>
				</div>
			</form>
		</CardWrapper>
	)
}
