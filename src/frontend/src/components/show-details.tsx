import { User } from '@/types/index.types'

interface ShowDetailsFormProps {
	user: User
}

export const ShowDetails = ({ user }: ShowDetailsFormProps) => {
	const date = new Date()
	const hrs = date.getHours()
	let greet

	if (hrs > 6 && hrs < 12) greet = 'Доброе утро, '
	else if (hrs >= 12 && hrs < 18) greet = 'Добрый день, '
	else if (hrs >= 18 && hrs < 24) greet = 'Добрый вечер, '
	else if ((hrs >= 1 && hrs <= 6) || hrs == 0) greet = 'Доброй ночи, '

	return (
		<div className='flex flex-col gap-y-6'>
			<h1 className='text-3xl text-neutral-800 font-bold'>
				{greet + user.first_name}
			</h1>
			<div className='p-4 bg-white flex flex-col gap-y-2 rounded-lg'>
				<h3 className='text-xl text-neutral-800 font-bold'>Номер телефона</h3>
				<p className='text-md text-neutral-600 font-medium'>
					Телефон нужен, чтобы подтверждать операции и настройки счета
				</p>
				<span className='mt-2 p-4 w-full max-w-[700px] bg-neutral-50 rounded-lg text-sm font-medium text-neutral-600'>
					{user.phone_number}
				</span>
			</div>
			<div className='p-4 bg-white flex flex-col gap-y-2 rounded-lg'>
				<h3 className='text-xl text-neutral-800 font-bold'>Емейл</h3>
				<p className='text-md text-neutral-600 font-medium'>
					На почту приходят выписки, cчета и справки
				</p>
				<span className='mt-2 p-4 w-full max-w-[700px] bg-neutral-50 rounded-lg text-sm font-medium text-neutral-600'>
					{user.email}
				</span>
			</div>
			<div className='p-4 bg-white flex flex-col gap-y-2 rounded-lg'>
				<h3 className='text-xl text-neutral-800 font-bold'>Адрес</h3>
				<p className='text-md text-neutral-600 font-medium'>
					Адрес, куда банк будет направлять почтовую корреспонденцию
				</p>
				<span className='mt-2 p-4 w-full max-w-[700px] bg-neutral-50 rounded-lg text-sm font-medium text-neutral-600'>
					{user.documents.registration_address}
				</span>
			</div>
			<div className='p-4 bg-white flex flex-col gap-y-2 rounded-lg'>
				<h3 className='text-xl text-neutral-800 font-bold'>
					Серия и номер паспорта
				</h3>
				<span className='mt-2 p-4 w-full max-w-[700px] bg-neutral-50 rounded-lg text-sm font-medium text-neutral-600'>
					{user.documents.passport_details}
				</span>
			</div>
			<div className='p-4 bg-white flex flex-col gap-y-2 rounded-lg'>
				<h3 className='text-xl text-neutral-800 font-bold'>
					Дата выдачи паспорта
				</h3>
				<span className='mt-2 p-4 w-full max-w-[700px] bg-neutral-50 rounded-lg text-sm font-medium text-neutral-600'>
					{user.documents.passport_issued_at}
				</span>
			</div>
			<div className='p-4 bg-white flex flex-col gap-y-2 rounded-lg'>
				<h3 className='text-xl text-neutral-800 font-bold'>ИНН</h3>
				<span className='mt-2 p-4 w-full max-w-[700px] bg-neutral-50 rounded-lg text-sm font-medium text-neutral-600'>
					{user.documents.inn}
				</span>
			</div>
			<div className='p-4 bg-white flex flex-col gap-y-2 rounded-lg'>
				<h3 className='text-xl text-neutral-800 font-bold'>СНИЛС</h3>
				<span className='mt-2 p-4 w-full max-w-[700px] bg-neutral-50 rounded-lg text-sm font-medium text-neutral-600'>
					{user.documents.snils}
				</span>
			</div>
			<div className='p-4 bg-white flex flex-col gap-y-2 rounded-lg'>
				<h3 className='text-xl text-neutral-800 font-bold'>Место рождения</h3>
				<span className='mt-2 p-4 w-full max-w-[700px] bg-neutral-50 rounded-lg text-sm font-medium text-neutral-600'>
					{user.documents.place_of_birth}
				</span>
			</div>
			<div className='p-4 bg-white flex flex-col gap-y-2 rounded-lg'>
				<h3 className='text-xl text-neutral-800 font-bold'>Дата рождения</h3>
				<span className='mt-2 p-4 w-full max-w-[700px] bg-neutral-50 rounded-lg text-sm font-medium text-neutral-600'>
					{user.documents.date_of_birth}
				</span>
			</div>
		</div>
	)
}
