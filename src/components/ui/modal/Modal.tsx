import React, { FC, useEffect, useRef } from 'react'

import { IModalProps } from './modal.interface'

import styles from './Modal.module.scss'
import MaterialIcon from '@/ui/icons/MaterialIcon'

const Modal: FC<IModalProps> = ({ children, toggle, title }) => {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handlerClickOutSide = (event: MouseEvent) => {
			if (modalRef.current && !event.composedPath().includes(modalRef.current)) {
				toggle()
			}
		}

		document.body.addEventListener('click', handlerClickOutSide, true)
		return () => {
			document.body.removeEventListener('click', handlerClickOutSide, true)
		}
	}, [])

	useEffect(() => {
		document.body.classList.add('isHidden')
		return () => {
			document.body.classList.remove('isHidden')
		}
	}, [])

	return (
		<div className={styles.overlay}>
			<div className={styles.wrapper}>
				<div className={styles.modal} ref={modalRef}>
					<div>
						<div className={styles.title}>{title}</div>
						<div onClick={toggle}>
							<MaterialIcon name="MdClose" />
						</div>
					</div>
					<div>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default Modal
