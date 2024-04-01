'use client'

import { UserContext } from '@/context/userContext'
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock'
import { cn } from '@/lib/utils'
import { removeTokenFromCookies } from '@/services/auth-token.service'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { Button } from './ui/button'

interface MobileNavProps {
	authorized: boolean
	links: {
		title: string
		href?: string
		action?: string
	}[]
}

export const MobileNav = ({ authorized, links }: MobileNavProps) => {
	const [isLocked, toggle] = useBodyScrollLock()
	const { setUser } = useContext(UserContext)
	const router = useRouter()
	const handleClick = () => {
		removeTokenFromCookies()
		setUser(null)
		router.replace('/')
	}
	return (
		<>
			<Button
				className='flex flex-col items-center justify-center gap-y-1 md:hidden'
				size='icon'
				onClick={toggle}
				variant='outline'
			>
				<span
					className={cn(
						'w-5 h-[2px] bg-foreground block transition-transform',
						isLocked && 'rotate-45'
					)}
				/>
				<span
					className={cn(
						'w-5 h-[2px] bg-foreground block transition-transform',
						isLocked && '-rotate-45 absolute'
					)}
				/>
			</Button>
			<div
				className={cn(
					'absolute backdrop-blur-lg flex top-[4rem] h-screen w-full left-0 transition-all z-40',
					isLocked
						? 'pointer-events-auto opacity-100'
						: 'pointer-events-none opacity-0'
				)}
				onClick={ev => {
					const target = ev.target as HTMLDivElement
					if (target.nodeName === 'DIV') {
						toggle()
					}
				}}
			>
				<nav
					className={
						'relative w-max backdrop-blur-lg flex md:hidden container pt-8 flex-col gap-y-5'
					}
				>
					<div
						className={cn(
							'flex flex-col gap-y-3 w-max',
							authorized && 'gap-y-6'
						)}
					>
						{!authorized && (
							<>
								<li className='list-none'>
									<Link href='/sign-in'>
										<Button size='lg' className='w-full' variant='default'>
											Войти в аккаунт
										</Button>
									</Link>
								</li>
								<li className='list-none'>
									<Link href='/sign-up'>
										<Button size='lg' variant='secondary'>
											Зарегистрироваться
										</Button>
									</Link>
								</li>
							</>
						)}
						{authorized &&
							links.map((item, idx) => (
								<li key={`mobile-menu-link-${idx}`} className='list-none'>
									{item.href && (
										<Link
											onClick={() => toggle()}
											className='list-none font-bold text-2xl transition-all text-neutral-800'
											href={item.href}
										>
											{item.title}
										</Link>
									)}
								</li>
							))}
						{authorized && (
							<Button size='lg' onClick={handleClick}>
								Выйти
							</Button>
						)}
					</div>
				</nav>
			</div>
		</>
	)
}
