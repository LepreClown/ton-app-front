'use client'
import { FC } from 'react'
import { useForm } from 'react-hook-form'

import FieldsWithdraw from '@/screens/home/fields/FieldsQueryParams'

import Heading from '@/ui/heading/Heading'
import Button from '@/ui/button/Button'
import Modal from '@/ui/modal/Modal'
import FieldsDeposit from './fields/FieldsDeposit'

import { useHome } from './useHome'

import { IDepositMessage, IFieldsDeposit, IFieldsQueryParams, IQueryParams } from './home.interface'

import styles from './Home.module.scss'
import SubHeading from '@/ui/heading/SubHeading'

const Home: FC = () => {
	const {
		handleSubmit: handleSubmitDeposit,
		register: registerDeposit,
		formState: { errors: errorsDeposit, isSubmitSuccessful },
	} = useForm<IDepositMessage>({
		mode: 'onChange',
	})
	const {
		handleSubmit: handleSubmitParams,
		register: registerParams,
		formState: { errors: errorsParams },
	} = useForm<IQueryParams>({
		mode: 'onChange',
	})

	const { onSubmitParams, toggleParams, toggle, isShowParams, address, isShow, onSubmitDeposit } =
		useHome()

	const dataDeposit: IFieldsDeposit = {
		handleSubmitDeposit,
		registerDeposit,
		errorsDeposit,
		onSubmitDeposit,
	}

	const dataParams: IFieldsQueryParams = {
		handleSubmitParams,
		registerParams,
		errorsParams,
		onSubmitParams,
	}

	return (
		<div className={styles.wrapper}>
			<Heading title="Try deposit and withdraw TON coins" />
			{isSubmitSuccessful ? <SubHeading title={`Your deposit address: ${address}`} /> : ''}
			<div className={styles.buttons}>
				<Button onClick={toggle}>Deposit TON</Button>
				<Button onClick={toggleParams}>Withdraw TON</Button>
			</div>
			{isShow && (
				<Modal toggle={toggle} title="deposit">
					<FieldsDeposit {...dataDeposit} />
				</Modal>
			)}
			{isShowParams && (
				<Modal toggle={toggleParams} title="withdraw">
					<FieldsWithdraw {...dataParams} />
				</Modal>
			)}
		</div>
	)
}

export default Home

//TODO:
//    SMART-CONTRACT
// 		- расчитать стоимость fee,
// 		- bounced если amount and value меньше Balance,
//		REACT
//    - обрабатывать ошибки TON_CONNECT
//		- оптимизация useEffect
//    - смените пароль от гугла
