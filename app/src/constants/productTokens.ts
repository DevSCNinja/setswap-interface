import * as tokenAddresses from 'constants/ethContractAddresses'
import { usdcTokenOptimismAddress } from 'constants/ethContractAddresses'

export interface ProductToken {
  name: string
  symbol: string
  address: string | undefined
  polygonAddress: string | undefined
  optimismAddress: string | undefined
  arbitrumAddress: string | undefined
  image: string
  coingeckoId: string
  tokensetsId: string
  fees: { streamingFee: string; mintRedeemFee?: string } | undefined
  mintAsset: string
  exchangeLink: string | undefined
  tokensetsLink: string | undefined
}

export const DoubloonToken: ProductToken = {
  name: 'Doubloon Token',
  symbol: 'DBL',
  address: undefined,
  polygonAddress: undefined,
  optimismAddress: undefined,
  arbitrumAddress: tokenAddresses.doubloonTokenArbitrumAddress,
  image:
    'https://github.com/GalleonDAO/setswap-tokenlist/blob/main/logos/dbl.png?raw=true',
  coingeckoId: 'doubloon',
  tokensetsId: 'doubloon',
  fees: undefined,
  mintAsset: '',
  exchangeLink: '',
  tokensetsLink: '',
}

export const SolunavaxIndex: ProductToken = {
  name: 'SOLUNAVAX Index',
  symbol: 'SOLUNAVAX',
  address: undefined,
  polygonAddress: undefined,
  optimismAddress: tokenAddresses.solunavaxTokenOptimismAddress,
  arbitrumAddress: undefined,
  image:
    'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/solunavax.png',
  coingeckoId: 'solunavax-index',
  tokensetsId: 'solunavax-index',
  fees: {
    streamingFee: '0.5%',
  },
  mintAsset: usdcTokenOptimismAddress || '',
  exchangeLink:
    'https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xba6a2fa321bb06d668c5192be77428106c5c01e5&chain=optimism',
  tokensetsLink:
    'https://www.tokensets.com/v2/set/optimism/0xbA6a2Fa321BB06D668c5192Be77428106c5C01E5',
}

export const sol1x: ProductToken = {
  name: 'SOL 1x',
  symbol: 'SOL1X',
  address: undefined,
  polygonAddress: undefined,
  optimismAddress: tokenAddresses.sol1xTokenOptimismAddress,
  arbitrumAddress: undefined,
  image:
    'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/sol1x.png',
  coingeckoId: 'sol1x',
  tokensetsId: 'sol1x',
  fees: {
    streamingFee: '1.95%',
  },
  mintAsset: usdcTokenOptimismAddress || '',
  exchangeLink: undefined,
  tokensetsLink: undefined,
}

export const luna1x: ProductToken = {
  name: 'LUNA 1x',
  symbol: 'LUNA1X',
  address: undefined,
  polygonAddress: undefined,
  optimismAddress: tokenAddresses.luna1xTokenOptimismAddress,
  arbitrumAddress: undefined,
  image:
    'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/luna1x.png',
  coingeckoId: 'luna1x',
  tokensetsId: 'luna1x',
  fees: {
    streamingFee: '1.95%',
  },
  mintAsset: usdcTokenOptimismAddress || '',
  exchangeLink: undefined,
  tokensetsLink: undefined,
}

export const avax1x: ProductToken = {
  name: 'AVAX 1x',
  symbol: 'AVAX1X',
  address: undefined,
  polygonAddress: undefined,
  optimismAddress: tokenAddresses.avax1xTokenOptimismAddress,
  arbitrumAddress: undefined,
  image:
    'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/avax1x.png',
  coingeckoId: 'avax1x',
  tokensetsId: 'avax1x',
  fees: {
    streamingFee: '1.95%',
  },
  mintAsset: usdcTokenOptimismAddress || '',
  exchangeLink: undefined,
  tokensetsLink: undefined,
}

export const productTokensBySymbol = {
  DBL: DoubloonToken,
  SOLUNAVAX: SolunavaxIndex,
  SOL1X: sol1x,
  LUNA1X: luna1x,
  AVAX1X: avax1x,
}

const indexNames = [SolunavaxIndex, DoubloonToken, sol1x, avax1x, luna1x]

export default indexNames
