import { createContext } from 'react'

interface DblTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const DblMarketData = createContext<DblTokenMarketDataValues>({})

export default DblMarketData
