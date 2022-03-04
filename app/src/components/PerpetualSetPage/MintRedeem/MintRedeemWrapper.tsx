import React, { useEffect } from 'react'

import { MintRedeemWidget } from 'components/PerpetualSetPage/MintRedeem'
import TransactionWatcher from 'components/TransactionWatcher'
import { ProductToken } from 'constants/productTokens'
import useMintRedeem from 'hooks/useMintRedeem'
import useTransactionWatcher from 'hooks/useTransactionWatcher'

const BuySellWrapper = (props: {
  tokenId: string
  setAsset: ProductToken
  componentLogos: string[] | undefined
}) => {
  const { transactionStatus } = useTransactionWatcher()
  const { onSetMintRedeemToken } = useMintRedeem()

  useEffect(() => {
    onSetMintRedeemToken(props.tokenId)
  }, [onSetMintRedeemToken, props.tokenId])

  return (
    <TransactionWatcher
      transactionStatus={transactionStatus}
      startTransactionComponent={
        <MintRedeemWidget
          setAsset={props.setAsset}
          componentLogos={props.componentLogos}
        />
      }
    />
  )
}

export default BuySellWrapper
