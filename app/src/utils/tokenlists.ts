import {
  SetSwapArbitrumTokens,
  SetSwapMainnetTokens,
  SetSwapMaticTokens,
  SetSwapOptimismTokens,
} from '@galleondao/setswap-tokenlist'

export type { TokenData } from '@galleondao/setswap-tokenlist'

export function getTokenList(chainId: number = 1) {
  switch (chainId) {
    case 137:
      return SetSwapMaticTokens
    case 10:
      return SetSwapOptimismTokens
    case 42161:
      return SetSwapArbitrumTokens
    default:
      return SetSwapMainnetTokens
  }
}
