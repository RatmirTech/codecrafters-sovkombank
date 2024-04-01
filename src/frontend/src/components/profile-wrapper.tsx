'use client'

import { GetUserData } from '@/actions/user'
import { UserContext } from '@/context/userContext'
import { getAccessToken } from '@/services/auth-token.service'
import { Notification } from '@/types/index.types'
import { motion } from 'framer-motion'
import { useContext, useEffect } from 'react'
import { ScrollableColumnWrapper } from './scrollable-column-wrapper'
import { ShowDetails } from './show-details'
import { NotificationCard } from './ui/notification-card'

interface ProfileWrapperProps {
	notifications: Notification[]
}

export const ProfileWrapper = ({ notifications }: ProfileWrapperProps) => {
	const { user, setUser } = useContext(UserContext)

	useEffect(() => {
		const fetchUser = async () => {
			if (getAccessToken()) {
				const res = await GetUserData()
				if (!res.email) {
					return
				}
				setUser(res)
			}
		}

		if (user) return
		fetchUser()
	}, [user])

	return (
		<section className='h-full py-6 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-8'>
			<motion.div
				initial={{
					opacity: 0,
					y: -20,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				exit={{
					opacity: 0,
					y: -20,
				}}
				transition={{
					duration: 0.75,
					delay: 0.25,
				}}
				className='col-span-2 w-full'
			>
				{user !== null && <ShowDetails user={user} />}
			</motion.div>
			<motion.div
				className='sticky top-20 col-span-2 lg:col-span-1 h-max'
				initial={{
					opacity: 0,
					y: 20,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				exit={{
					opacity: 0,
					y: 20,
				}}
				transition={{
					duration: 0.75,
					delay: 0.5,
				}}
			>
				<ScrollableColumnWrapper textNode={<>Мои уведомления</>}>
					{notifications.map((item, idx) => (
						<NotificationCard
							key={`notification-${idx}`}
							text={item.title}
							date={item.datetime}
							desc={item.description}
							id={item.id}
						/>
					))}
					{notifications.length === 0 && (
						<div className='rounded-lg'>
							<span className='font-medium text-xl text-neutral-800'>
								У вас нет непрочитанных уведомлений
							</span>
						</div>
					)}
				</ScrollableColumnWrapper>
			</motion.div>
		</section>
	)
}
