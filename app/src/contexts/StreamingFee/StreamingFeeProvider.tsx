import React, { useEffect, useState } from 'react'

import { solunavaxTokenOptimismAddress } from 'constants/ethContractAddresses'
import useWallet from 'hooks/useWallet'
import {
  MAINNET_CHAIN_DATA,
  OPTIMISM_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'
import { convertToPercentage } from 'utils/ethersBigNumber'
import { getStreamingFees } from 'utils/setjsApi'

import StreamingFeeContext from './StreamingFeeContext'

const StreamingFeeProvider: React.FC = ({ children }) => {
  const [solunavaxStreamingFee, setSolunavaxStreamingFee] = useState<string>()
  const { ethereum: provider, chainId } = useWallet()

  useEffect(() => {
    if (chainId && chainId === MAINNET_CHAIN_DATA.chainId && provider) {
      // getStreamingFees(provider, [], chainId)
      //   .then((result) => {
      //     const [] = result
      //   })
      //   .catch((error: any) => console.error(error))
    } else if (chainId && chainId === POLYGON_CHAIN_DATA.chainId) {
      // getStreamingFees(provider, [], chainId)
      //   .then((result) => {})
      //   .catch((error: any) => console.error(error))
    } else if (
      chainId &&
      chainId === OPTIMISM_CHAIN_DATA.chainId &&
      provider &&
      solunavaxTokenOptimismAddress
    ) {
      getStreamingFees(provider, [solunavaxTokenOptimismAddress], chainId)
        .then((result) => {
          const [solunavaxResult] = result
          setSolunavaxStreamingFee(
            convertToPercentage(solunavaxResult.streamingFeePercentage)
          )
        })
        .catch((error: any) => console.error(error))
    }
  }, [chainId, provider])

  return (
    <StreamingFeeContext.Provider
      value={{
        solunavaxStreamingFee: solunavaxStreamingFee,
      }}
    >
      {children}
    </StreamingFeeContext.Provider>
  )
}

export default StreamingFeeProvider
