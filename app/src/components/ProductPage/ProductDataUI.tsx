import React, { useEffect } from 'react'

import { Container, InputProps } from 'react-neu'
import { useHistory } from 'react-router-dom'

import MarketData from 'components/MarketData'
import Page from 'components/Page'
import {
  IndexComponentsTable,
  PriceChanges,
  ProductPageContent,
  ProductPageHeader,
  TokenStats,
  WalletBalance,
} from 'components/ProductPage'
import { DoubloonToken, ProductToken } from 'constants/productTokens'
import { SetComponent } from 'contexts/SetComponents/SetComponent'
import useChainData from 'hooks/useChainData'
import useLocalStorage from 'hooks/useLocalStorage'
import BigNumber from 'utils/bignumber'
import {
  ARBITRUM_CHAIN_DATA,
  MAINNET_CHAIN_DATA,
  OPTIMISM_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'
import { BrowserView } from 'react-device-detect'

export interface TokenDataProps {
  prices: number[][] | undefined
  hourlyPrices: number[][] | undefined
  latestPrice: number | undefined
  latestMarketCap: number | undefined
  latestVolume: number | undefined
  token: ProductToken
  components: SetComponent[] | undefined
  balance: BigNumber | undefined
  supplyCap?: BigNumber | undefined
  currentSupply?: BigNumber | undefined
}

interface ProductDataUIProps extends InputProps {
  tokenDataProps: TokenDataProps
}

const ProductDataUI: React.FC<ProductDataUIProps> = ({
  tokenDataProps,
  children,
}) => {
  const tokenData = tokenDataProps
  const [, setReferral] = useLocalStorage('referral', '')
  const history = useHistory()
  const params = new URLSearchParams(history.location.search)
  const value = params.get('referral')
  const { chain } = useChainData()

  useEffect(() => {
    if (value) setReferral(value)
  }, [value, setReferral])

  /**
   * determines if the token is available on the current chain
   */
  const isAvailableOnCurrentChain = () => {
    return (
      (chain.chainId === POLYGON_CHAIN_DATA.chainId &&
        tokenData.token.polygonAddress &&
        tokenData.token.polygonAddress.length > 0) ||
      (chain.chainId === MAINNET_CHAIN_DATA.chainId &&
        tokenData.token.address &&
        tokenData.token.address.length > 0) ||
      (chain.chainId === OPTIMISM_CHAIN_DATA.chainId &&
        tokenData.token.optimismAddress &&
        tokenData.token.optimismAddress.length > 0) ||
      (chain.chainId === ARBITRUM_CHAIN_DATA.chainId &&
        tokenData.token.arbitrumAddress &&
        tokenData.token.arbitrumAddress.length > 0)
    )
  }

  // tokenData.latestVolume
  // tokenData.latestMarketCap
  // tokenData.supplyCap
  // tokenData.currentSupply
  // getNetAssetValue()
  // tokenData.balance
  // tokenData.prices
  // tokenData.hourlyPrices

  return (
    <BrowserView className='w-full'>
      <Container size='lg'>
        <></>
        <> {children}</>
      </Container>
    </BrowserView>
  )
}

export default ProductDataUI
