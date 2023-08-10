'use client'

import { FC } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import backImage from '@/assets/images/back.png'

const LinkButton: FC = () => {
	return (
		<div className="relative w-full top-0 left-0 font-bold underline-offset-2 underline ">
			<Link
				href={'/'}
				className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-all">
				<Image src={backImage} alt="back" />
			</Link>
		</div>
	)
}

export default LinkButton
