import React, { useCallback, useEffect, useState } from 'react'

import Web3 from 'web3'
import { provider } from 'web3-core'

import { currencyTokens } from 'constants/currencyTokens'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import useBalances from 'hooks/useBalances'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'
import {
  MAINNET_CHAIN_DATA,
  OPTIMISM_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'
import { fromWei, waitTransaction } from 'utils/index'
import trackReferral from 'utils/referralApi'

import MintRedeemContext from './MintRedeemContext'
import { ZeroExData } from './types'

const MintRedeemProvider: React.FC = ({ children }) => {
  const [mintRedeemToken, setMintRedeemToken] = useState<string>('solunavax')
  const [isFetchingOrderData, setIsFetchingOrderData] = useState<boolean>(false)
  const [isUserBuying, setIsUserBuying] = useState<boolean>(true)
  const [activeField, setActiveField] = useState<'currency' | 'set'>('currency')
  const [mintRedeemQuantity, setMintRedeemQuantity] = useState<string>('')
  const [selectedCurrency, setSelectedCurrency] = useState<any>()
  const [currencyOptions, setCurrencyOptions] = useState<any[]>([])

  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  const {
    usdcBalance,
    usdcBalancePolygon,
    solunavaxBalanceOptimism,
    usdcBalanceOptimism,
  } = useBalances()

  const { account, ethereum, chainId } = useWallet()

  useEffect(() => {
    setCurrencyOptions(currencyTokens)
    setSelectedCurrency(currencyTokens[0])
  }, [])

  const getNetworkedBalance = (
    mainnetBalance: any,
    polygonBalance: any,
    optimismBalance: any,
    decimals: number = 18
  ) => {
    return chainId && chainId === MAINNET_CHAIN_DATA.chainId
      ? fromWei(mainnetBalance, decimals)
      : chainId && chainId === POLYGON_CHAIN_DATA.chainId
      ? fromWei(polygonBalance, decimals)
      : fromWei(optimismBalance, decimals)
  }

  // eslint-disable-next-line
  let spendingTokenBalance = new BigNumber(0)
  if (!isUserBuying && mintRedeemToken === 'solunavax') {
    spendingTokenBalance = fromWei(solunavaxBalanceOptimism)
  } else if (selectedCurrency?.label === 'USDC') {
    spendingTokenBalance = getNetworkedBalance(
      usdcBalance,
      usdcBalancePolygon,
      usdcBalanceOptimism,
      6
    )
  }

  useEffect(() => {
    if (!mintRedeemQuantity) return

    setIsFetchingOrderData(true)

    // poll update on quantity change
  }, [
    isUserBuying,
    selectedCurrency,
    activeField,
    mintRedeemToken,
    mintRedeemQuantity,
    chainId,
  ])

  const onExecuteMintRedeem = useCallback(async () => {
    if (!account || !mintRedeemQuantity || !selectedCurrency) return
  }, [
    account,
    isUserBuying,
    selectedCurrency,
    mintRedeemToken,
    ethereum,
    onSetTransactionId,
    onSetTransactionStatus,
    spendingTokenBalance,
  ])

  return (
    <MintRedeemContext.Provider
      value={{
        mintRedeemToken,
        isFetchingOrderData,
        isUserBuying,
        activeField,
        selectedCurrency,
        spendingTokenBalance,
        currencyOptions,
        mintRedeemQuantity,
        onSetMintRedeemToken: setMintRedeemToken,
        onExecuteMintRedeem,
      }}
    >
      {children}
    </MintRedeemContext.Provider>
  )
}

export default MintRedeemProvider
