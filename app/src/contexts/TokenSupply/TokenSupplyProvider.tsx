import React, { useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'

import { solunavaxTokenOptimismAddress } from 'constants/ethContractAddresses'
import useWallet from 'hooks/useWallet'
import {
  MAINNET_CHAIN_DATA,
  OPTIMISM_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'
import { getTokenSupply } from 'utils/setjsApi'

import TokenSupplyContext from './TokenSupplyContext'

const TokenSupplyProvider: React.FC = ({ children }) => {
  const [solunavaxTotalSupply, setSolunavaxTotalSupply] = useState<BigNumber>()
  const { ethereum: provider, chainId } = useWallet()

  useEffect(() => {
    //mainnet
    if (chainId && chainId === MAINNET_CHAIN_DATA.chainId && provider) {
      // getTokenSupply(provider, [], chainId)
      //   .then((result) => {
      //     const [] = result
      //   })
      //   .catch((error: any) => console.error(error))
    } else if (chainId && chainId === POLYGON_CHAIN_DATA.chainId && provider) {
      // getTokenSupply(provider, [], chainId)
      //   .then((result) => {})
      //   .catch((error: any) => console.error(error))
    } else if (
      chainId &&
      chainId === OPTIMISM_CHAIN_DATA.chainId &&
      provider &&
      solunavaxTokenOptimismAddress
    ) {
      getTokenSupply(provider, [solunavaxTokenOptimismAddress], chainId)
        .then((result) => {
          const [solunavaxResult] = result
          setSolunavaxTotalSupply(
            new BigNumber(solunavaxResult.totalSupply.toString()).dividedBy(
              new BigNumber(10).pow(18)
            )
          )
        })
        .catch((error: any) => console.error(error))
    }
  }, [chainId, provider])

  return (
    <TokenSupplyContext.Provider
      value={{
        solunavaxTotalSupply: solunavaxTotalSupply,
      }}
    >
      {children}
    </TokenSupplyContext.Provider>
  )
}

export default TokenSupplyProvider
