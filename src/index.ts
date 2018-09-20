import { SDK } from 'teambition-sdk'

import { Variables, GraphQLResponse, GraphQLRequest } from './interface'

function request<T extends object>(this: SDK, query: string, variables?: Variables, withHeaders: boolean = false) {
  const requestBody = JSON.stringify({
    query,
    variables: variables ? variables : undefined,
  })

  return this.fetch
    .post<GraphQLResponse<T>>(
      this.graphQLClientOption.host,
      requestBody,
      { ...this.graphQLClientOption, includeHeaders: true }
    )
    .map(({ headers, body }) => {
      if (withHeaders) {
        const data: object = body.data
        return  ({ ...data, headers: headers })
      }
      return body.data
    })
}

function setEndpoint(this: SDK, endpoint: string, requestOptions: GraphQLRequest = {}) {
  this.graphQLClientOption = {
    host: endpoint,
    headers: {
      ...requestOptions,
      ['Content-Type']: 'application/json'
    }
  }
}

SDK.prototype.graph = request
SDK.prototype.setGraphQLEndpoint = setEndpoint

export interface GraphQLClientOption {
  host: string
  headers: object
}

declare module 'teambition-sdk/SDK' {
  interface SDK {
    graphQLClientOption: GraphQLClientOption
    setGraphQLEndpoint: typeof setEndpoint
    graph: typeof request
  }
}
