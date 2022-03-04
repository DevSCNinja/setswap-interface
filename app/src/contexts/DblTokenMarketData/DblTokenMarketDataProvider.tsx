import React, { useEffect, useState } from 'react'

import { DoubloonToken } from 'constants/productTokens'
import { fetchHistoricalTokenMarketData } from 'utils/coingeckoApi'

import MarketDataContext from './DblTokenMarketDataContext'

const DblMarketDataProvider: React.FC = ({ children }) => {
  const [dblMarketData, setDblMarketData] = useState<any>({})

  useEffect(() => {
    fetchHistoricalTokenMarketData(DoubloonToken.coingeckoId)
      .then((response: any) => {
        setDblMarketData(response)
      })
      .catch((error: any) => console.log(error))
  }, [])

  const selectLatestMarketData = (marketData?: number[][]) =>
    marketData?.[marketData.length - 1]?.[1] || 0

  return (
    <MarketDataContext.Provider
      value={{
        ...dblMarketData,
        latestMarketCap: selectLatestMarketData(dblMarketData?.marketcaps),
        latestPrice: selectLatestMarketData(dblMarketData?.hourlyPrices),
        latestVolume: selectLatestMarketData(dblMarketData?.volumes),
      }}
    >
      {children}
    </MarketDataContext.Provider>
  )
}

export default DblMarketDataProvider
