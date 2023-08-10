'use client'
import { useState } from 'react'
import { Address, OpenedContract, toNano } from 'ton-core'

import { CreateDeposit, Factory } from '@/build/Factory/tact_Factory'

import { useTonConnect } from '../useTonConnect'
import { useTonClient } from '../useTonClient'
import { useAsyncInitialize } from '../useAsyncInitialize'
import { Card } from '@/build/Factory/tact_Card'

export const useFactoryContract = () => {
	const { client } = useTonClient()
	const { wallet, sender } = useTonConnect()
	const [address, setAddress] = useState<Address>()

	const factoryContract = useAsyncInitialize(async () => {
		if (!client || !wallet) return

		const contract = Factory.fromAddress(
			Address.parse('EQAv9t5ebaaTrz1nbSGZmJZ8Uf11fE-q5AFLhGQWxuNApKHr'),
		)

		return client.open(contract) as OpenedContract<Factory>
	}, [client, wallet])

	const mainContract = useAsyncInitialize(async () => {
		if (!client || !wallet || !factoryContract) return

		const depositIndex = await factoryContract.getDepositIndex()
		const id = BigInt(depositIndex)

		const contractAddress = await factoryContract.getAddressByIndexAndOwner(
			id,
			Address.parse(wallet),
		)

		setAddress(contractAddress)

		return client.open(Card.fromAddress(contractAddress))
	}, [client, factoryContract, wallet])

	return {
		address: address ?? null,
		depositCreate: async (quantity: string, password: bigint) => {
			if (!wallet) return
			const message: CreateDeposit = {
				$$type: 'CreateDeposit',
				amount: toNano(quantity),
				password: password,
				owner: Address.parse(wallet),
			}
			await factoryContract?.send(
				sender,
				{
					value: toNano(quantity) + toNano('0.037'),
				},
				message,
			)
		},
	}
}
