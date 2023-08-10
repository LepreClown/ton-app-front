import { FieldErrors, SubmitHandler, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'

export interface IDepositMessage {
	quantityDeposit: string
	passwordDeposit: string
}

export interface IQueryParams {
	id: string
}

export interface IFieldsDeposit {
	handleSubmitDeposit: UseFormHandleSubmit<IDepositMessage>
	registerDeposit: UseFormRegister<IDepositMessage>
	errorsDeposit: FieldErrors<IDepositMessage>
	onSubmitDeposit: SubmitHandler<IDepositMessage>
}
export interface IFieldsQueryParams {
	handleSubmitParams: UseFormHandleSubmit<IQueryParams>
	registerParams: UseFormRegister<IQueryParams>
	errorsParams: FieldErrors<IQueryParams>
	onSubmitParams: SubmitHandler<IQueryParams>
}
