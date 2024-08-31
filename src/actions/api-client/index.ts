import { ServerEnv } from './server-env'
import { ServerApiClient } from './server-client'
import { ClientApiClient } from './client-client'
import { apiClient } from './api-client'

export const serverApiClient = new ServerApiClient(ServerEnv.apiUrl())

export { ClientApiClient, apiClient }
