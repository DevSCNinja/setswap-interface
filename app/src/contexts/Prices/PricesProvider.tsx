import React, { useEffect, useState } from 'react'

import {
  doubloonTokenArbitrumAddress,
  solunavaxTokenOptimismAddress,
} from 'constants/ethContractAddresses'
import useWallet from 'hooks/useWallet'

import PricesContext from './PricesContext'

const PricesProvider: React.FC = ({ children }) => {
  const [ethereumPrice, setEthereumPrice] = useState<string>('0')
  const [solunavaxPrice, setSolunavaxPrice] = useState<number>(0)
  const [dblPrice, setDblPrice] = useState<string>('0')
  const { ethereum } = useWallet()

  useEffect(() => {
    const coingeckoEthereumPriceUrl = `https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd`

    fetch(coingeckoEthereumPriceUrl)
      .then((response) => response.json())
      .then((response) => {
        const price = response?.ethereum?.usd
        setEthereumPrice(price || '0')
      })
      .catch((error) => console.log(error))
  }, [])

  useEffect(() => {
    const productAddresses = [
      solunavaxTokenOptimismAddress,
      doubloonTokenArbitrumAddress,
    ]
    const coinGeckoPriceUrl = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${productAddresses}&vs_currencies=usd`

    fetch(coinGeckoPriceUrl)
      .then((response) => response.json())
      .then((response) => {
        setSolunavaxPrice(
          response[solunavaxTokenOptimismAddress?.toLowerCase() as string]?.usd
        )
        setDblPrice(
          response[doubloonTokenArbitrumAddress?.toLowerCase() as string]?.usd
        )
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <PricesContext.Provider
      value={{
        ethereumPrice,
        solunavaxPrice,
        dblPrice,
      }}
    >
      {children}
    </PricesContext.Provider>
  )
}

export default PricesProvider
