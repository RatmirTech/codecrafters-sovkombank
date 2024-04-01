'use client'

import { Login } from '@/actions/auth'
import { LoginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { CardWrapper } from './card-wrapper'
import { Input } from './ui/input'
import { SpinButton } from './ui/spin-button'

export const SignInForm = () => {
	const [loading, setIsLoading] = useState<boolean>(false)
	const router = useRouter()

	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
	} = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			phone_number: '',
			password: '',
		},
	})

	const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
		setIsLoading(true)
		const res = await Login(data)
		setIsLoading(false)
		if (res.status !== 'Success') {
			setError('root', {
				message: 'Неправильный логин или пароль',
			})
			return
		}
		router.replace('/profile')
	}

	return (
		<CardWrapper
			title={<>Войти в аккаунт</>}
			description={<>description...</>}
			linkHref='/sign-up'
			linkText={<span>Еще нет аккаунта? Зарегистрироваться</span>}
		>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='md:max-w-lg flex flex-col gap-y-2'
			>
				<Input
					type='tel'
					text='Номер телефона'
					id='id-phone_number'
					{...register('phone_number')}
					required
				/>
				<Input
					text='Пароль'
					id='id-password'
					{...register('password')}
					required
					type='password'
				/>
				{errors.root && (
					<span className='text-red-900 font-medium text-sm'>
						{errors.root.message}
					</span>
				)}
				<SpinButton type='submit' className='mt-2' loading={loading}>
					Войти в аккаунт
				</SpinButton>
			</form>
		</CardWrapper>
	)
}
