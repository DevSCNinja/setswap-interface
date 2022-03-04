import {
  daiTokenAddress,
  daiTokenPolygonAddress,
  doubloonTokenArbitrumAddress,
  solunavaxTokenOptimismAddress,
  usdcTokenAddress,
  usdcTokenOptimismAddress,
  usdcTokenPolygonAddress,
  wethTokenPolygonAddress,
} from './ethContractAddresses'

export const tokenInfo: any = {
  DAI: {
    address: daiTokenAddress,
    decimals: 18,
  },
  USDC: {
    address: usdcTokenAddress,
    decimals: 6,
  },
  ETH: {
    address: 'ETH',
    decimals: 18,
  },
}
export const polygonTokenInfo: any = {
  DAI: {
    address: daiTokenPolygonAddress,
    decimals: 18,
  },
  USDC: {
    address: usdcTokenPolygonAddress,
    decimals: 6,
  },
  ETH: {
    address: wethTokenPolygonAddress,
    decimals: 18,
  },
}

export const optimismTokenInfo: any = {
  USDC: {
    address: usdcTokenOptimismAddress,
    decimals: 6,
  },
  SOLUNAVAX: {
    address: solunavaxTokenOptimismAddress,
    decimals: 18,
  },
}

export const arbitrumTokenInfo: any = {
  DBL: {
    address: doubloonTokenArbitrumAddress,
    decimals: 18,
  },
}
