'use client'

import { useEffect, useState } from 'react'

export const useBodyScrollLock = (): [boolean, () => void] => {
	const [isLocked, setIsLocked] = useState<boolean>(false)

	useEffect(() => {
		const body = document.body.style
		body.overflowY = isLocked ? 'hidden' : 'auto'
	}, [isLocked])

	const toggle = () => setIsLocked(!isLocked)

	return [isLocked, toggle]
}
