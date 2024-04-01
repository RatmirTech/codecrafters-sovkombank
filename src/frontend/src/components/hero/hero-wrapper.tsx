'use client'

import { cn } from '@/lib/utils'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { GradientTitle } from '../ui/gradient-title'
import { GridBackground } from '../ui/grid-background'
import { Subtitle } from '../ui/subtitle'
import { HeroTextbox } from './hero-textbox'

interface HeroWrapperProps extends React.HTMLAttributes<HTMLDivElement> {}

export const HeroWrapper = ({
	children,
	className,
	...props
}: HeroWrapperProps) => {
	const containerRef = useRef<any>(null)
	const { scrollYProgress } = useScroll({
		target: containerRef,
	})
	const [isMobile, setIsMobile] = useState<boolean>(false)

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768)
		}
		checkMobile()
		window.addEventListener('resize', checkMobile)
		return () => {
			window.removeEventListener('resize', checkMobile)
		}
	}, [])
	const scaleDimensions = () => {
		return isMobile ? [0.7, 0.9] : [1.05, 1]
	}

	const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
	const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
	const translate = useTransform(scrollYProgress, [0, 1], [0, -100])
	return (
		<section
			className={cn(
				'relative pt-12 md:pt-48 pb-12 h-full min-h-screen flex flex-col items-center justify-center container max-w-full gap-12',
				className
			)}
			{...props}
			ref={containerRef}
			style={{
				perspective: '1800px',
			}}
		>
			<HeroTextbox className='z-10 items-center'>
				<GradientTitle defaultColors>CodeCrafters</GradientTitle>
				<Subtitle className='text-center text-sm leading-loose'>
					Ваш верный проводник в мире финансов. Покупайте и продавайте валюту с
					легкостью, а точные прогнозы от искусственного интеллекта помогут вам
					принимать осознанные решения с уверенностью и безопасностью.
				</Subtitle>
				<div className='flex gap-x-2'>
					<Link href='/exchange'>
						<Button size='lg' className='mt-2' variant='default'>
							Купить валюту
						</Button>
					</Link>
					<Link href='/exchange'>
						<Button size='lg' className='mt-2' variant='secondary'>
							Попробовать AI
						</Button>
					</Link>
				</div>
			</HeroTextbox>
			<motion.div
				initial={{
					opacity: 0,
					y: 30,
				}}
				animate={{
					opacity: 1,
					y: 0,
				}}
				exit={{
					opacity: 0,
					y: 30,
				}}
				style={{
					rotateX: rotate,
					translate: translate,
					scale,
				}}
				transition={{
					duration: 0.75,
					delay: 0.25,
				}}
				className='z-10 bg-transparent rounded-3xl shadow-2xl hidden md:block'
			>
				<Image
					className='object-cover'
					width={1280}
					height={670}
					src={'/images/bg.png'}
					alt=''
				/>
			</motion.div>
			<GridBackground className='top-26 md:top-0' />
		</section>
	)
}
