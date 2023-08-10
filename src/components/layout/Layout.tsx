import { FC, PropsWithChildren } from 'react'
import { TonConnectButton } from '@tonconnect/ui-react'

import ThemeToggle from '@/ui/theme-toggle/ThemeToggle'

import styles from './Layout.module.scss'

const Layout: FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className={styles.layout}>
			<div className={styles.header}>
				<ThemeToggle />
				<TonConnectButton />
			</div>
			<div className={styles.center}>{children}</div>
		</div>
	)
}

export default Layout
