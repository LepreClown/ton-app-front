'use client'
import { SubmitHandler } from 'react-hook-form'

import { IWithdrawMessage } from '@/screens/withdraw/withdraw.interface'

import { useModalWithdraw } from '@/hooks/useModalWithdraw'
import { useWithdrawContract } from '@/hooks/contracts/useWithdrawContract'
import { useTonConnect } from '@/hooks/useTonConnect'

export const useWithdraw = () => {
	const { wallet } = useTonConnect()
	const { toggleWithdraw, isShowWithdraw } = useModalWithdraw()
	const { withdrawUser, balance, owner, index, address, withdrawOwner } = useWithdrawContract()

	const isOwner = owner?.toRawString() === wallet

	const onSubmitWithdraw: SubmitHandler<IWithdrawMessage> = (data) => {
		isOwner
			? withdrawOwner(data.quantity === balance ? '0' : data.quantity)
			: withdrawUser(data.quantity === balance ? '0' : data.quantity, data.password)
		toggleWithdraw()
	}

	return {
		index,
		balance,
		address,
		onSubmitWithdraw,
		isOwner,
		toggleWithdraw,
		isShowWithdraw,
	}
}
