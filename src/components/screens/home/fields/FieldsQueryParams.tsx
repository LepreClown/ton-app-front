import { FC } from 'react'
import cn from 'classnames'

import Field from '@/ui/field/Field'
import Button from '@/ui/button/Button'

import { IFieldsQueryParams } from '../home.interface'
import styles from './Fields.module.scss'

const FieldsQueryParams: FC<IFieldsQueryParams> = ({
	onSubmitParams,
	errorsParams,
	registerParams,
	handleSubmitParams,
}) => {
	return (
		<form onSubmit={handleSubmitParams(onSubmitParams)} className={styles.form}>
			<div>
				<Field
					{...registerParams('id', {
						required: "Can't be blank!",
					})}
					type="text"
					placeholder="Enter your deposit address"
					error={errorsParams.id}
				/>
			</div>
			<Button aria-label="withdraw" type="submit" className={cn(styles.btn)}>
				Withdraw
			</Button>
		</form>
	)
}

export default FieldsQueryParams
