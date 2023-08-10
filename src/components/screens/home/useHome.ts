import { SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { sha256_sync } from 'ton-crypto'

import { useModal } from '@/hooks/useModal'
import { useModalWithdraw } from '@/hooks/useModalWithdraw'
import { useFactoryContract } from '@/hooks/contracts/useFactoryContract'

import { IDepositMessage, IQueryParams } from './home.interface'

export const useHome = () => {
	const { push } = useRouter()

	const { toggle, isShow } = useModal()
	const { toggleWithdraw: toggleParams, isShowWithdraw: isShowParams } = useModalWithdraw()
	const { depositCreate, address } = useFactoryContract()

	const onSubmitDeposit: SubmitHandler<IDepositMessage> = async (data) => {
		const hashPas = '0x' + sha256_sync(data.passwordDeposit).toString('hex')
		await depositCreate(data.quantityDeposit, BigInt(hashPas))

		toggle()
	}

	const onSubmitParams: SubmitHandler<IQueryParams> = (data) => {
		push(`/withdraw?address=${data.id}`)
	}

	return {
		toggle,
		address,
		onSubmitParams,
		isShow,
		toggleParams,
		isShowParams,
		onSubmitDeposit,
	}
}
