'use client'
import { FC, PropsWithChildren } from 'react'
import { TonConnectUIProvider } from '@tonconnect/ui-react'
import { ThemeProvider } from 'next-themes'

import Layout from '@/components/layout/Layout'

const manifestUrl = 'https://raw.githubusercontent.com/LepreClown/manifest/main/manifest.json'

const MainProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<TonConnectUIProvider
			manifestUrl={manifestUrl}
			language="en"
			uiPreferences={{ theme: 'SYSTEM' }}>
			<ThemeProvider attribute="class" defaultTheme="system" storageKey="theme">
				<Layout>{children}</Layout>
			</ThemeProvider>
		</TonConnectUIProvider>
	)
}

export default MainProvider
