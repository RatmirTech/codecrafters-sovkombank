'use client'

import { User } from '@/types/index.types'
import { Dispatch, SetStateAction, createContext, useState } from 'react'

interface UserContextInterface {
	user: User | null
	setUser: Dispatch<SetStateAction<User | null>>
}

const defaultState = {
	user: null,
	setUser: (user: User | null) => {},
} as UserContextInterface

export const UserContext = createContext<UserContextInterface>(defaultState)

export const Context = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	)
}
