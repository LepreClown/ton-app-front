import {
	FieldErrors,
	SubmitHandler,
	UseFormHandleSubmit,
	UseFormRegister,
	UseFormSetValue,
} from 'react-hook-form'

export interface IWithdrawMessage {
	id: string
	quantity: string
	password: string
}
export interface IFieldsWithdraw {
	handleSubmitWithdraw: UseFormHandleSubmit<IWithdrawMessage>
	registerWithdraw: UseFormRegister<IWithdrawMessage>
	errorsWithdraw: FieldErrors<IWithdrawMessage>
	onSubmitWithdraw: SubmitHandler<IWithdrawMessage>
	isOwner: boolean
	balance: string
	setValue: UseFormSetValue<IWithdrawMessage>
}
