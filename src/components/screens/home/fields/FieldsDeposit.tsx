import React, { FC, useState } from 'react'
import cn from 'classnames'

import Field from '@/ui/field/Field'
import Button from '@/ui/button/Button'

import { IFieldsDeposit } from '../home.interface'
import styles from './Fields.module.scss'
import MaterialIcon from '@/ui/icons/MaterialIcon'

const FieldsDeposit: FC<IFieldsDeposit> = ({
	handleSubmitDeposit,
	registerDeposit,
	errorsDeposit,
	onSubmitDeposit,
}) => {
	const [type, setType] = useState<boolean>(true)

	const toggleVisible = () => {
		setType(!type)
	}

	return (
		<form onSubmit={handleSubmitDeposit(onSubmitDeposit)} className={styles.form}>
			<div>
				<Field
					{...registerDeposit('quantityDeposit', {
						required: "Can't be blank!",
					})}
					type="number"
					min="0"
					step="0.01"
					placeholder="Quaintity"
					error={errorsDeposit.quantityDeposit}
				/>
				<div className={styles.password}>
					<Field
						{...registerDeposit('passwordDeposit', {
							required: "Can't be blank!",
						})}
						type={type ? 'password' : 'text'}
						placeholder="Password"
						error={errorsDeposit.passwordDeposit}
					/>
					<span className={styles.eye} onClick={toggleVisible}>
						<MaterialIcon name="MdRemoveRedEye" />
					</span>
				</div>
			</div>
			<Button aria-label="deposit" type="submit" className={cn(styles.btn)}>
				Deposit
			</Button>
		</form>
	)
}

export default FieldsDeposit
