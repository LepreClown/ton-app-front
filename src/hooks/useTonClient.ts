import { useTonConnect } from './useTonConnect'
import { useAsyncInitialize } from './useAsyncInitialize'
import { TonClient } from 'ton'
import { getHttpEndpoint } from '@orbs-network/ton-access'
import { CHAIN } from '@tonconnect/sdk'

export const useTonClient = () => {
	const { network } = useTonConnect()

	return {
		client: useAsyncInitialize(async () => {
			if (!network) return

			return new TonClient({
				endpoint: await getHttpEndpoint({
					network: network === CHAIN.MAINNET ? 'mainnet' : 'testnet',
				}),
			})
		}, [network]),
	}
}
