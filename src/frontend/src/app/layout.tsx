import { Context } from '@/context/userContext'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'CodeCrafters',
	description: 'Описание',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body
				className={cn(
					'min-h-screen overflow-x-hidden bg-neutral-50',
					inter.className
				)}
			>
				<Context>{children}</Context>
			</body>
		</html>
	)
}
