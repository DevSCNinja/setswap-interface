import { createContext } from 'react'

import BigNumber from 'bignumber.js'

interface TokenSupplyProps {
  solunavaxTotalSupply?: BigNumber
}

const TokenSupply = createContext<TokenSupplyProps>({
  solunavaxTotalSupply: undefined,
})

export default TokenSupply
