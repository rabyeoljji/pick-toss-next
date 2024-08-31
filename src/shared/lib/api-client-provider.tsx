import { ClientApiClient } from '@/actions/api-client'
import { ServerEnv } from '@/actions/api-client/server-env'
import { useSession } from 'next-auth/react'
import { createContext, useContext, useMemo } from 'react'

const ApiClientContext = createContext<ClientApiClient | null>(null)

export const ApiClientProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession()

  const apiClient = useMemo(() => {
    return new ClientApiClient(ServerEnv.apiUrl(), session?.user?.accessToken ?? null)
  }, [session])

  return <ApiClientContext.Provider value={apiClient}>{children}</ApiClientContext.Provider>
}

export const useApiClient = () => {
  const context = useContext(ApiClientContext)
  if (!context) {
    throw new Error('useApiClient must be used within an ApiClientProvider')
  }
  return context
}
