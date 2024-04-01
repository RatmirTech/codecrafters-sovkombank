'use client'

import { ExchangeWrapper } from '@/components/exchange-wrapper'
import { Header } from '@/components/header'

export default function ExchangePage() {
	return (
		<>
			<Header />
			<main className='pt-[5rem] min-h-screen overflow-hidden container max-w-full'>
				<ExchangeWrapper />
			</main>
		</>
	)
}
