'use client'

import { GetUserData } from '@/actions/user'
import { UserContext } from '@/context/userContext'
import { cn } from '@/lib/utils'
import {
	getAccessToken,
	removeTokenFromCookies,
} from '@/services/auth-token.service'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext, useEffect } from 'react'
import { MobileNav } from './mobile-nav'
import { Button } from './ui/button'

const links = [
	{
		title: 'Купить/продать',
		href: '/exchange',
	},
	{
		title: 'Профиль',
		href: '/profile',
	},
]

export const Header = () => {
	//const [user, setUser] = useState<User | null>(null)
	const router = useRouter()
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
			return
		}

		if (user) return
		fetchUser()
	}, [user])

	const handleClick = () => {
		removeTokenFromCookies()
		setUser(null)
		router.replace('/')
	}

	return (
		<motion.header
			initial={{
				y: -20,
				opacity: 0,
			}}
			animate={{
				y: 0,
				opacity: 1,
			}}
			exit={{
				y: -20,
				opacity: 0,
			}}
			transition={{
				duration: 0.75,
				delay: 0.25,
			}}
			className='fixed h-[5rem] container max-w-full bg-neutral-50 w-full z-30 flex items-center justify-between'
		>
			<Link href='/'>
				<svg
					className='hover:opacity-80 transition-opacity antialiased'
					width='48'
					height='47'
					viewBox='0 0 62 61'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M7.00613 29.845C6.93278 27.0569 7.51964 24.0977 8.64447 21.2852C9.52477 19.0352 10.7474 16.9808 12.2879 15.0977C13.1927 13.9727 15.2712 11.4537 18.719 9.49716C23.3161 6.85586 28.8424 6.09771 28.8424 6.09771C28.8424 6.09771 29.1114 6.07326 29.3559 6.02434C29.845 5.92652 29.9917 6.12217 29.9917 6.63576C29.9428 7.71184 29.9428 8.78793 29.9917 9.86401C30.0162 10.4021 29.8694 10.6222 29.307 10.6711C26.0793 10.989 23.0716 12.0406 20.3573 13.826C17.7164 15.5624 15.638 17.8124 14.0974 20.5515C12.0923 24.1221 11.4565 27.9618 11.7989 31.9971C12.239 37.0352 14.5865 41.1194 18.3033 44.421C20.8953 46.7444 23.9519 48.2851 27.3753 48.9944C28.0844 49.1411 28.818 49.2145 29.5271 49.2634C29.9184 49.2878 30.0895 49.4101 30.0895 49.8259C30.0651 51.0487 30.0895 52.2471 30.0895 53.4699C30.0895 53.8857 29.9673 54.0569 29.5027 53.9835C27.9866 53.7389 26.4461 53.69 24.9789 53.2987C23.4873 52.9074 22.0446 52.296 20.6508 51.6357C15.9803 49.3612 12.4346 45.9129 9.89156 41.3884C7.95979 37.8911 6.98168 34.1493 7.00613 29.845Z'
						fill='#013790'
					/>
					<path
						d='M16.3826 30.0406C16.407 28.7444 16.5782 27.3993 16.9694 26.0297C18.1432 21.7009 20.7352 18.4482 24.7943 16.4917C27.7531 15.0732 30.8586 14.5597 34.1597 15.2444C37.4364 15.9292 40.2484 17.3721 42.5715 19.7444C43.8674 21.0651 44.8945 22.5325 45.5791 24.2444C45.7992 24.8069 45.7503 24.8803 45.1634 24.8803C44.5277 24.8803 43.9164 24.8803 43.2806 24.8803C43.305 24.8803 43.305 24.8558 43.305 24.8314C42.6448 24.8314 41.9601 24.8803 41.2999 24.8069C41.0309 24.7825 40.713 24.5868 40.5663 24.3912C39.417 22.8015 38.0721 21.4564 36.3605 20.5515C35.1134 19.9156 33.7929 19.4754 32.3747 19.402C28.4622 19.1819 25.2345 20.4537 22.9359 23.633C21.5421 25.5651 20.7841 27.6928 20.8819 29.9917'
						fill='#E53C3C'
					/>
					<path
						d='M20.8817 29.6738C20.8083 31.9727 21.5419 34.1004 22.9357 36.0324C25.2343 39.2118 28.462 40.508 32.35 40.2634C33.7683 40.19 35.0887 39.7498 36.3358 39.114C38.0719 38.2091 39.4168 36.8395 40.5417 35.2743C40.6884 35.0542 41.0307 34.883 41.2753 34.8585C41.9355 34.8096 42.5957 34.8341 43.2804 34.8341C43.2804 34.8096 43.2804 34.7852 43.2559 34.7852C43.8917 34.7852 44.503 34.7852 45.1388 34.7852C45.7501 34.7852 45.799 34.883 45.5545 35.421C44.8698 37.133 43.8183 38.6004 42.5468 39.921C40.2238 42.2933 37.4117 43.7362 34.1351 44.421C30.8339 45.1058 27.7284 44.5922 24.7697 43.1737C20.7105 41.2172 18.1185 37.9645 16.9448 33.6357C16.578 32.2661 16.3824 30.921 16.3579 29.6248'
						fill='#E53C3C'
					/>
					<path
						d='M50.7521 31.6058C51.3145 31.5324 55.2514 31.3857 55.3981 31.5569C55.5449 31.7525 55.4715 31.9971 55.4715 32.1194C54.9824 35.6167 54.0288 38.9917 52.2926 42.0732C49.5295 46.94 45.4703 50.2905 40.3353 52.4427C38.5013 53.2009 36.6184 53.7389 34.6133 53.9101C34.1487 53.959 33.9775 53.8367 33.9775 53.3721C34.002 52.1492 33.9775 50.902 33.9775 49.6791C33.9775 49.3857 34.0264 49.2389 34.3688 49.1655C36.9119 48.8232 39.2838 47.9672 41.4845 46.6954C44.3944 45.0324 46.7419 42.7579 48.4047 39.8232C48.747 39.2118 49.505 38.1357 49.8963 36.5215C49.9452 36.277 49.9941 36.1058 50.0185 35.9835'
						fill='#013790'
					/>
					<path
						d='M52.366 24.9537C51.7546 24.9537 51.1433 24.9292 50.532 24.9537C50.1408 24.9781 49.9451 24.8558 49.7984 24.4645C49.4316 23.4374 49.0648 22.4102 48.6002 21.4319C47.6221 19.3776 46.2283 17.6167 44.59 16.0515C42.9272 14.4618 41.0688 13.1412 38.9659 12.2852C37.5231 11.6983 35.9826 11.3559 34.491 10.9401C34.1731 10.8667 34.002 10.7689 34.002 10.4265C34.002 9.15478 34.002 7.88304 34.002 6.6113C34.002 6.34228 34.0509 6.19554 34.4177 6.24446C36.5206 6.46457 38.5257 6.97815 40.4819 7.78522C43.4896 9.00804 46.0816 10.8667 48.3557 13.1412C51.0944 15.8803 53.0995 19.1086 54.3955 22.7526C54.5912 23.3151 54.7134 23.8776 54.8846 24.4401C54.9824 24.7825 54.8601 24.9292 54.5178 24.9292C53.7842 24.9292 53.0751 24.9292 52.366 24.9537C52.366 24.9292 52.366 24.9292 52.366 24.9537Z'
						fill='#013790'
					/>
				</svg>
			</Link>
			<menu className='flex gap-x-2'>
				<nav
					className={cn(
						'hidden gap-x-2 md:flex',
						user && 'gap-x-1 p-1 rounded-full border border-brand-blue'
					)}
				>
					{!user && (
						<>
							<li className='list-none'>
								<Link href='/sign-in'>
									<Button variant='default'>Войти в аккаунт</Button>
								</Link>
							</li>
							<li className='list-none'>
								<Link href='/sign-up'>
									<Button variant='outline'>Зарегистрироваться</Button>
								</Link>
							</li>
						</>
					)}
					{user &&
						links.map((item, idx) => (
							<Link
								key={`nav-link-${idx}`}
								className='font-medium transition-all hover:bg-brand-blue hover:text-neutral-50 text-brand-blue rounded-full p-3'
								href={item.href}
							>
								{item.title}
							</Link>
						))}
					{user && (
						<div
							onClick={handleClick}
							className='font-medium transition-all hover:bg-brand-blue hover:text-neutral-50 text-brand-blue rounded-full p-3 cursor-pointer'
						>
							Выйти
						</div>
					)}
				</nav>
				<nav className='flex gap-x-2'>
					<MobileNav authorized={user ? true : false} links={links} />
				</nav>
			</menu>
		</motion.header>
	)
}
