import { ReactNode, useCallback, useEffect, useState } from 'react'
import { createContext } from 'use-context-selector'
import { IUser } from '../domain/contracts/IUser'
import { IUserContextType } from '../domain/contracts/IUserContextType'

export const UsersContext = createContext({} as IUserContextType)

interface UsersProviderProps {
  children: ReactNode
}

export function UsersProvider({ children }: UsersProviderProps) {
  const [user, setUser] = useState<IUser>({} as IUser)

  const fetchUser = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch('/api/users/fetch-user')
      const data = await response.json()
      if (data) setUser(data)
    } catch (error) {
      console.error('Failed to fetch users', error)
    }
  }, [])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <UsersContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UsersContext.Provider>
  )
}
