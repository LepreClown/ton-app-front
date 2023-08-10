import { useState } from 'react'

export const useModalWithdraw = () => {
	const [isShowWithdraw, setIsShowWithdraw] = useState<boolean>(false)

	function toggleWithdraw() {
		setIsShowWithdraw(!isShowWithdraw)
	}

	return {
		isShowWithdraw,
		toggleWithdraw,
	}
}
