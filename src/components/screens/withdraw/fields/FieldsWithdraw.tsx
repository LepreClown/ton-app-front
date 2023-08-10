import React, { FC, useState } from 'react'
import cn from 'classnames'

import Field from '@/ui/field/Field'
import Button from '@/ui/button/Button'

import { IFieldsWithdraw } from '../withdraw.interface'
import styles from './Fields.module.scss'
import MaterialIcon from '@/ui/icons/MaterialIcon'

const FieldsWithdraw: FC<IFieldsWithdraw> = ({
	onSubmitWithdraw,
	handleSubmitWithdraw,
	registerWithdraw,
	errorsWithdraw,
	isOwner,
	balance,
	setValue,
}) => {
	const [type, setType] = useState<boolean>(true)

	const toggleVisible = () => {
		setType(!type)
	}

	const maxBal = () => {
		if (!balance) return
		setValue('quantity', balance)
	}

	return (
		<form onSubmit={handleSubmitWithdraw(onSubmitWithdraw)} className={styles.form}>
			<div>
				<div className={styles.quantity}>
					<Field
						{...registerWithdraw('quantity', {
							required: "Can't be blank!",
						})}
						type="number"
						min="0"
						max={balance}
						step="0.000000001"
						placeholder={`Balance: ${balance}`}
						error={errorsWithdraw.quantity}
					/>
					<span onClick={maxBal} className={styles.max}>
						max
					</span>
				</div>

				{!isOwner && (
					<div className={styles.password}>
						<Field
							{...registerWithdraw('password', {
								required: "Can't be blank!",
							})}
							type={type ? 'password' : 'text'}
							placeholder="Password"
							error={errorsWithdraw.password}
						/>
						<span className={styles.eye} onClick={toggleVisible}>
							<MaterialIcon name="MdRemoveRedEye" />
						</span>
					</div>
				)}
			</div>
			<Button aria-label="withdraw" type="submit" className={cn(styles.btn)}>
				Withdraw
			</Button>
		</form>
	)
}

export default FieldsWithdraw
