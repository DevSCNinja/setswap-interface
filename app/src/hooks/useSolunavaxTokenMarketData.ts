import { useContext } from 'react'

import { SolunavaxTokenMarketDataContext } from 'contexts/SolunavaxTokenMarketData'

const useSolunavaxTokenMarketData = () => {
  return { ...useContext(SolunavaxTokenMarketDataContext) }
}

export default useSolunavaxTokenMarketData
