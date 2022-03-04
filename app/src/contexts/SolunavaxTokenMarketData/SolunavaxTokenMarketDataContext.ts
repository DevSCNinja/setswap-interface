import { createContext } from 'react'

interface SolunavaxTokenMarketDataValues {
  prices?: number[][]
  hourlyPrices?: number[][]
  marketcaps?: number[][]
  volumes?: number[][]
  latestPrice?: number
  latestMarketCap?: number
  latestVolume?: number
}

const SolunavaxMarketData = createContext<SolunavaxTokenMarketDataValues>({})

export default SolunavaxMarketData
