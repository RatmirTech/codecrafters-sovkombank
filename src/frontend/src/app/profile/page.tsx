'use client'

import { Header } from '@/components/header'
import { ProfileWrapper } from '@/components/profile-wrapper'
import { getUserId } from '@/services/auth-token.service'
import { Notification } from '@/types/index.types'
import { useEffect, useState } from 'react'

export default function ProfilePage() {
	const [conn, setConn] = useState<WebSocket | null>(null)
	const [notifications, setNotifications] = useState<Notification[]>([])

	useEffect(() => {
		if (conn === null) {
			setConn(
				new WebSocket(
					`ws://${
						process.env.NEXT_PUBLIC_WEBSOCKET_URL
					}/ws/notifications/${getUserId()}`
				)
			)
			return
		}

		conn.onmessage = message => {
			const m: Notification = JSON.parse(message.data)
			setNotifications(p => [...p, m])
		}
	}, [conn, notifications])
	return (
		<>
			<Header />
			<main className='pt-[5rem] min-h-screen container max-w-full'>
				<ProfileWrapper notifications={notifications} />
			</main>
		</>
	)
}
