import { createContext } from 'react'

import BigNumber from 'utils/bignumber'

import { ZeroExData } from './types'

interface MintRedeemContextValues {
  mintRedeemToken: string
  isFetchingOrderData: boolean
  isUserBuying: boolean
  activeField: 'currency' | 'set'
  selectedCurrency: any
  spendingTokenBalance: BigNumber
  currencyOptions: any[]
  mintRedeemQuantity: string
  onSetMintRedeemToken: (tokenId: string) => void
  onExecuteMintRedeem: () => void
}

const MintRedeemContext = createContext<MintRedeemContextValues>({
  mintRedeemToken: 'solunavax',
  isFetchingOrderData: false,
  isUserBuying: true,
  activeField: 'currency',
  selectedCurrency: undefined,
  spendingTokenBalance: new BigNumber(0),
  currencyOptions: [],
  mintRedeemQuantity: '0',
  onSetMintRedeemToken: () => {},
  onExecuteMintRedeem: () => {},
})

export default MintRedeemContext
