import { InjectedConnector } from '@web3-react/injected-connector'
import { NetworkConnector } from '@web3-react/network-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'

import { LedgerConnector } from './ledgerConnector'

const WS_URL = process.env.REACT_APP_ETHEREUM_WS_URL

export type ChainData = {
  name: string
  chainId: number
  rpcUrl: string
  icon: string
  coingeckoId: string
}

export const MAINNET_CHAIN_DATA: ChainData = {
  name: 'Ethereum',
  chainId: 1,
  rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  icon: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/mainnet.jpg',
  coingeckoId: 'ethereum',
}
export const POLYGON_CHAIN_DATA: ChainData = {
  name: 'Polygon',
  chainId: 137,
  rpcUrl: 'https://rpc-mainnet.maticvigil.com/',
  icon: 'https://raw.githubusercontent.com/sushiswap/icons/master/network/polygon.jpg',
  coingeckoId: 'polygon-pos',
}

export const OPTIMISM_CHAIN_DATA: ChainData = {
  name: 'Optimism',
  chainId: 10,
  rpcUrl: 'https://mainnet.optimism.io',
  icon: 'https://optimistic.etherscan.io',
  coingeckoId: 'optimistic-ethereum',
}

export const ARBITRUM_CHAIN_DATA: ChainData = {
  name: 'Arbitrum',
  chainId: 42161,
  rpcUrl: 'https://arb1.arbitrum.io/rpc',
  icon: 'https://arbiscan.io',
  coingeckoId: 'arbitrum-one',
}

if (!WS_URL) {
  throw new Error(
    `REACT_APP_ETHEREUM_WS_URL must be a defined environment variable`
  )
}

export const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 10, 42, 137, 42161],
})

export const walletconnect = new WalletConnectConnector({
  rpc: {
    [MAINNET_CHAIN_DATA.chainId]: MAINNET_CHAIN_DATA.rpcUrl,
    [POLYGON_CHAIN_DATA.chainId]: POLYGON_CHAIN_DATA.rpcUrl,
    [OPTIMISM_CHAIN_DATA.chainId]: OPTIMISM_CHAIN_DATA.rpcUrl,
    [ARBITRUM_CHAIN_DATA.chainId]: ARBITRUM_CHAIN_DATA.rpcUrl,
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  supportedChainIds: [1, 10, 137, 42161],
})

export const walletlink = new WalletLinkConnector({
  url: MAINNET_CHAIN_DATA.rpcUrl,
  appName: 'SetSwap',
  appLogoUrl:
    'https://github.com/GalleonDAO/setswap-tokenlist/blob/main/logos/setswap.png?raw=true',
  supportedChainIds: [1, 10, 137, 42161],
})

export const ledgerwallet = new LedgerConnector(
  MAINNET_CHAIN_DATA.chainId,
  MAINNET_CHAIN_DATA.rpcUrl,
  WS_URL
)

export const networkConnector = new NetworkConnector({
  urls: {
    1: process.env.REACT_APP_ALCHEMY_API || MAINNET_CHAIN_DATA.rpcUrl,
    10: process.env.REACT_APP_OPTIMISM_ALCHEMY_API || MAINNET_CHAIN_DATA.rpcUrl,
  },
  defaultChainId: 1,
})
//
