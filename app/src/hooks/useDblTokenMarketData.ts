import { useContext } from 'react'

import { DblTokenMarketDataContext } from 'contexts/DblTokenMarketData'

const useDblTokenMarketData = () => {
  return { ...useContext(DblTokenMarketDataContext) }
}

export default useDblTokenMarketData
