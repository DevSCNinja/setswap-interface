import { createContext } from 'react'

interface PricesContextValues {
  ethereumPrice?: string
  solunavaxPrice: number
  dblPrice?: string
}

const PricesContext = createContext<PricesContextValues>({
  solunavaxPrice: 0,
})

export default PricesContext
