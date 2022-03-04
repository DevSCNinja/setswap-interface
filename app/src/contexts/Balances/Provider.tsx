import React, { useCallback, useEffect, useState } from 'react'

import { provider } from 'web3-core'

import {
  avax1xTokenOptimismAddress,
  doubloonTokenArbitrumAddress,
  luna1xTokenOptimismAddress,
  sol1xTokenOptimismAddress,
  solunavaxTokenOptimismAddress,
  usdcTokenOptimismAddress,
} from 'constants/ethContractAddresses'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'
import {
  ARBITRUM_CHAIN_DATA,
  MAINNET_CHAIN_DATA,
  OPTIMISM_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'
import { getBalance } from 'utils/index'

import Context from './Context'

const Provider: React.FC = ({ children }) => {
  const [usdcBalanceOptimism, setUsdcBalanceOptimism] = useState<BigNumber>()
  const [solunavaxBalanceOptimism, setSolunavaxBalanceOptimism] =
    useState<BigNumber>()
  const [sol1xBalanceOptimism, setSol1xBalanceOptimism] = useState<BigNumber>()
  const [luna1xBalanceOptimism, setLuna1xBalanceOptimism] =
    useState<BigNumber>()
  const [avax1xBalanceOptimism, setAvax1xBalanceOptimism] =
    useState<BigNumber>()

  // arbitrum balances
  const [dblBalanceArbitrum, setDblBalanceArbitrum] = useState<BigNumber>()
  const { account, ethereum, status, chainId } = useWallet()

  const fetchBalances = useCallback(
    async (userAddress: string, provider: provider) => {
      if (
        !solunavaxTokenOptimismAddress ||
        !sol1xTokenOptimismAddress ||
        !luna1xTokenOptimismAddress ||
        !avax1xTokenOptimismAddress ||
        !usdcTokenOptimismAddress ||
        !doubloonTokenArbitrumAddress
      ) {
        throw new Error(
          'A token address is not defined. Please check your .env to confirm all token addresses are defined.'
        )
      }
      if (chainId && chainId === MAINNET_CHAIN_DATA.chainId) {
        const balances = await Promise.all([])
      } else if (chainId && chainId === POLYGON_CHAIN_DATA.chainId) {
        const balances = await Promise.all([])
      } else if (chainId && chainId === OPTIMISM_CHAIN_DATA.chainId) {
        const balances = await Promise.all([
          //optimism
          getBalance(provider, solunavaxTokenOptimismAddress, userAddress),
          getBalance(provider, sol1xTokenOptimismAddress, userAddress),
          getBalance(provider, luna1xTokenOptimismAddress, userAddress),
          getBalance(provider, avax1xTokenOptimismAddress, userAddress),
          getBalance(provider, usdcTokenOptimismAddress, userAddress),
        ])

        // optimism
        setSolunavaxBalanceOptimism(new BigNumber(balances[0]))
        setSol1xBalanceOptimism(new BigNumber(balances[1]))
        setLuna1xBalanceOptimism(new BigNumber(balances[2]))
        setAvax1xBalanceOptimism(new BigNumber(balances[3]))
        setUsdcBalanceOptimism(new BigNumber(balances[4]))
      } else if (chainId && chainId === ARBITRUM_CHAIN_DATA.chainId) {
        const balances = await Promise.all([
          // arbitrum
          getBalance(provider, doubloonTokenArbitrumAddress, userAddress),
        ])

        // arbitrum
        setDblBalanceArbitrum(new BigNumber(balances[0]))
      }
    },
    [
      chainId,
      setSolunavaxBalanceOptimism,
      setSol1xBalanceOptimism,
      setUsdcBalanceOptimism,
      setLuna1xBalanceOptimism,
      setAvax1xBalanceOptimism,
      setDblBalanceArbitrum,
    ]
  )

  useEffect(() => {
    if (status !== 'connected') {
      setDblBalanceArbitrum(new BigNumber(0))
      setSolunavaxBalanceOptimism(new BigNumber(0))
      setSol1xBalanceOptimism(new BigNumber(0))
      setLuna1xBalanceOptimism(new BigNumber(0))
      setAvax1xBalanceOptimism(new BigNumber(0))
    }
  }, [status])

  useEffect(() => {
    if (account && ethereum) {
      fetchBalances(account, ethereum)
      let refreshInterval = setInterval(
        () => fetchBalances(account, ethereum),
        10000
      )
      return () => clearInterval(refreshInterval)
    }
  }, [account, ethereum, fetchBalances])

  return (
    <Context.Provider
      value={{
        usdcBalanceOptimism,
        solunavaxBalanceOptimism,
        sol1xBalanceOptimism,
        luna1xBalanceOptimism,
        avax1xBalanceOptimism,
        dblBalanceArbitrum,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export default Provider
