import gql from 'graphql-tag'

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

import {} from 'constants/ethContractAddresses'

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  }),
  cache: new InMemoryCache(),
})

export const X_UNISWAP_QUERY = gql`
  {
    pairs(where: { id: "${''}" }) {
      id
      reserveUSD
      totalSupply
    }
  }
`

export const Y_UNISWAP_QUERY = gql`
  {
    pairs(where: { id: "${''}" }) {
      id
      reserveUSD
      totalSupply
    }
  }
`

export default client
