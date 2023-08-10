import { useEffect, useState } from 'react'

export function useAsyncInitialize<T>(func: () => Promise<T>, deps: any[] = []) {
	const [state, setState] = useState<T | undefined>()

	useEffect(() => {
		try {
			;(async () => {
				setState(await func())
			})()
		} catch (err) {
			console.log(err)
		}
	}, deps)

	return state
}
