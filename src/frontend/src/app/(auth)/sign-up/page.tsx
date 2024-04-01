'use client'

import { Header } from '@/components/header'
import { SignUpForm } from '@/components/sign-up-form'
import { GridBackground } from '@/components/ui/grid-background'
import { motion } from 'framer-motion'

export default function SignUpPage() {
	return (
		<>
			<Header />
			<motion.main
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
				}}
				className='container min-h-screen max-w-full pb-8 sm:pb-0 h-full pt-20 sm:pt-[5rem] flex items-center justify-center'
			>
				<motion.div
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
						delay: 0.25,
					}}
					className='z-10 flex items-center justify-center w-full'
				>
					<SignUpForm />
				</motion.div>
				<GridBackground />
			</motion.main>
		</>
	)
}
