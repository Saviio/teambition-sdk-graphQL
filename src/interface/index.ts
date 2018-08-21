export type Variables = { [key: string]: any }

export interface GraphQLRequestContext {
  query: string
  variables?: Variables
}

export interface GraphQLResponse<T = any> {
  data?: T
  errors?: Error[]
  extensions?: any
  status: number
  [key: string]: any
}

export interface GraphQLRequest {
  header?: Headers
  credentials?: RequestCredentials
}
