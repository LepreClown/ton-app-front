'use client'
import { useEffect, useState } from 'react'
import { Address, OpenedContract, toNano } from 'ton-core'
import { useSearchParams } from 'next/navigation'

import { useAsyncInitialize } from '@/hooks/useAsyncInitialize'
import { useTonConnect } from '@/hooks/useTonConnect'
import { useTonClient } from '@/hooks/useTonClient'

import { Card, WithdrawOwner, WithdrawUser } from '@/build/Factory/tact_Card'

export const useWithdrawContract = () => {
	const { wallet, sender } = useTonConnect()
	const { client } = useTonClient()

	const searchParams = useSearchParams()
	const query = searchParams.get('address')

	const [owner, setOwner] = useState<Address>()
	const [balance, setBalance] = useState<string>('')
	const [item, setItem] = useState<bigint>()
	const [address, setAddress] = useState<Address>()
	const [mounted, setMounted] = useState<boolean>(false)

	const contractWithdraw = useAsyncInitialize(async () => {
		if (!client || !wallet || !query) return

		const contract = Card.fromAddress(Address.parse(query.toString()))

		return client.open(contract) as OpenedContract<Card>
	}, [client, wallet])

	useEffect(() => {
		async function fetchData() {
			try {
				if (!contractWithdraw) return
				const [owner, balance, item, address] = await Promise.all([
					contractWithdraw.getOwner(),
					contractWithdraw.getBalance(),
					contractWithdraw.getCardByIndex(),
					contractWithdraw.getAddressContract(),
				])

				setOwner(owner)
				setBalance(balance)
				setItem(item)
				setAddress(address)
				setMounted(true)
			} catch (error) {
				console.error('Ошибка при получении данных:', error)
				setMounted(false)
			}
		}
		if (mounted === false) {
			setInterval(() => fetchData(), 2000)
		} else {
			fetchData()
		}
	}, [contractWithdraw])

	return {
		address: address,
		owner: owner,
		balance: balance,
		index: item,
		withdrawUser: (quantity: string, password: string) => {
			const message: WithdrawUser = {
				$$type: 'WithdrawUser',
				amount: toNano(quantity),
				password: password,
			}
			contractWithdraw?.send(
				sender,
				{
					value: toNano('0.2'),
				},
				message,
			)
		},
		withdrawOwner: (quantity: string) => {
			const message: WithdrawOwner = {
				$$type: 'WithdrawOwner',
				amount: toNano(quantity),
			}
			contractWithdraw?.send(
				sender,
				{
					value: toNano('0.2'),
				},
				message,
			)
		},
	}
}
