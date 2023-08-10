'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { IFieldsWithdraw, IWithdrawMessage } from '@/screens/withdraw/withdraw.interface'
import FieldsWithdraw from '@/screens/withdraw/fields/FieldsWithdraw'
import { useWithdraw } from '@/screens/withdraw/useWithdraw'
import SubHeading from '@/ui/heading/SubHeading'
import Button from '@/ui/button/Button'
import Modal from '@/ui/modal/Modal'

import styles from './Withdraw.module.scss'
import MaterialIcon from '@/ui/icons/MaterialIcon'
import Link from 'next/link'

const Withdraw: FC<{ params: any }> = ({ params }) => {
	const {
		handleSubmit: handleSubmitWithdraw,
		register: registerWithdraw,
		formState: { errors: errorsWithdraw },
		setValue,
	} = useForm<IWithdrawMessage>({
		mode: 'onChange',
	})
	const { onSubmitWithdraw, index, balance, isOwner, toggleWithdraw, isShowWithdraw } =
		useWithdraw()

	const dataWithdraw: IFieldsWithdraw = {
		handleSubmitWithdraw,
		registerWithdraw,
		errorsWithdraw,
		onSubmitWithdraw,
		isOwner,
		setValue,
		balance,
	}

	return (
		<div className={styles.wrapper}>
			<div>
				<Link href={'/'}>
					<MaterialIcon name="MdOutlineKeyboardBackspace" />
				</Link>
			</div>
			<div className={styles.content}>
				<SubHeading
					title={`Balance smart-contract: ${balance ? Number(balance).toFixed(2) : '0'}`}
				/>
				<SubHeading title={`QueryID: ${index ? index : 'Loading...'}`} />
				<Button onClick={toggleWithdraw} className="py-6 px-16">
					Withdraw TON
				</Button>
			</div>
			{isShowWithdraw && (
				<Modal toggle={toggleWithdraw} title="withdraw">
					<FieldsWithdraw {...dataWithdraw} />
				</Modal>
			)}
		</div>
	)
}

export default Withdraw
