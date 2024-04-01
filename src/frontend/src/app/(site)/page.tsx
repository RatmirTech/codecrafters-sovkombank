'use client'

import { Header } from '@/components/header'
import { HeroWrapper } from '@/components/hero/hero-wrapper'
import { motion } from 'framer-motion'

export default function Home() {
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
				className='min-h-screen'
			>
				<HeroWrapper />
			</motion.main>
		</>
	)
}
