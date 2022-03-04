import React, { useEffect, useState } from 'react'

import { SolunavaxIndex } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

import MarketDataContext from './SolunavaxTokenMarketDataContext'

const SolunavaxMarketDataProvider: React.FC = ({ children }) => {
  const [solunavaxMarketData, setSolunavaxMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(SolunavaxIndex.coingeckoId)
      .then((response: any) => {
        setSolunavaxMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...solunavaxMarketData,
        latestMarketCap: selectLatestMarketData(
          solunavaxMarketData?.marketcaps
        ),
        latestPrice: selectLatestMarketData(solunavaxMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(solunavaxMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default SolunavaxMarketDataProvider
