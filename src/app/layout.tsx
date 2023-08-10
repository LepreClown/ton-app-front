import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import MainProvider from '@/providers/MainProvider'

import '../assets/global.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Web 3.0 dApp',
	description: 'Do transition and save your money',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body className={inter.className} suppressHydrationWarning={true}>
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
