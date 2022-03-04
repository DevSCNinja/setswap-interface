import React, { useEffect, useState } from 'react'

import Anime, { anime } from 'react-anime'
import { BrowserView, MobileView } from 'react-device-detect'
import { Container, InputProps } from 'react-neu'
import { useHistory } from 'react-router-dom'

import Page from 'components/Page'
import {
  IndexComponentsTable,
  ProductPageContent,
  ProductPageHeader,
  TokenStats,
  WalletBalance,
} from 'components/PerpetualSetPage'
import { MintRedeemWrapper } from 'components/PerpetualSetPage/MintRedeem'
import { DoubloonToken, ProductToken } from 'constants/productTokens'
import { SetComponent } from 'contexts/SetComponents/SetComponent'
import useChainData from 'hooks/useChainData'
import useLocalStorage from 'hooks/useLocalStorage'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'
import classNames from 'utils/className'
import {
  ARBITRUM_CHAIN_DATA,
  MAINNET_CHAIN_DATA,
  OPTIMISM_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'

export interface TokenDataProps {
  prices: number[][] | undefined
  hourlyPrices: number[][] | undefined
  latestPrice: number | undefined
  latestMarketCap: number | undefined
  latestVolume: number | undefined
  token: ProductToken
  components: SetComponent[] | undefined
  balance: BigNumber | undefined
  supplyCap?: BigNumber | undefined
  currentSupply?: BigNumber | undefined
}

interface ProductDataUIProps extends InputProps {
  tokenDataProps: TokenDataProps
}

const ProductDataUI: React.FC<ProductDataUIProps> = ({
  tokenDataProps,
  children,
}) => {
  const tokenData = tokenDataProps
  const [, setReferral] = useLocalStorage('referral', '')
  const history = useHistory()
  const params = new URLSearchParams(history.location.search)
  const value = params.get('referral')
  const { chain } = useChainData()
  const { account } = useWallet()

  useEffect(() => {
    if (value) setReferral(value)
  }, [value, setReferral])

  const netAssetValueReducer = (
    netAssetValue: number,
    component: SetComponent
  ): number => {
    return netAssetValue + (parseFloat(component.totalPriceUsd) || 0)
  }

  const getNetAssetValue = () => {
    return tokenData.components
      ? tokenData.components.reduce(netAssetValueReducer, 0)
      : 0
  }

  /**
   * determines if the token is available on the current chain
   */
  const isAvailableOnCurrentChain = () => {
    const available =
      (chain.chainId === POLYGON_CHAIN_DATA.chainId &&
        tokenData.token.polygonAddress &&
        tokenData.token.polygonAddress.length > 0) ||
      (chain.chainId === MAINNET_CHAIN_DATA.chainId &&
        tokenData.token.address &&
        tokenData.token.address.length > 0) ||
      (chain.chainId === OPTIMISM_CHAIN_DATA.chainId &&
        tokenData.token.optimismAddress &&
        tokenData.token.optimismAddress.length > 0) ||
      (chain.chainId === ARBITRUM_CHAIN_DATA.chainId &&
        tokenData.token.arbitrumAddress &&
        tokenData.token.arbitrumAddress.length > 0)
    return available
  }

  const listNetworks = () => {
    let supportedNetworks = []

    if (
      tokenData.token.arbitrumAddress &&
      tokenData.token.arbitrumAddress.length > 0
    ) {
      supportedNetworks.push({ name: 'Arbitrum', logo: '' })
    }

    if (
      tokenData.token.polygonAddress &&
      tokenData.token.polygonAddress.length > 0
    ) {
      supportedNetworks.push({ name: 'Polygon', logo: '' })
    }

    if (
      tokenData.token.optimismAddress &&
      tokenData.token.optimismAddress.length > 0
    ) {
      supportedNetworks.push({
        name: 'Optimism',
        logo: 'https://optimistic.etherscan.io/images/svg/brands/optimism.svg?v=1.3',
      })
    }

    if (tokenData.token.address && tokenData.token.address.length > 0) {
      supportedNetworks.push({ name: 'Ethereum', logo: '' })
    }

    return supportedNetworks
  }

  /**
   * determines whether or not to show BuySellWrapper for current token/chain combo
   * @returns
   */
  const getMintRedeemWrapper = () => {
    if (isAvailableOnCurrentChain())
      return (
        <div>
          <MintRedeemWrapper
            tokenId={tokenData.token.tokensetsId}
            setAsset={tokenData.token}
            componentLogos={tokenData.components?.map((x) => x.image)}
          />
        </div>
      )
  }

  return (
    <Page>
      {isAvailableOnCurrentChain() && account ? (
        <>
          <BrowserView className='w-full'>
            <Container size='lg'>
              <ProductPageHeader>
                <div className=''>
                  <div className='relative py-16 bg-gray-800 rounded-full'>
                    <div
                      className='hidden absolute top-0 inset-x-0 h-1/2 bg-gray-900 rounded-t-full lg:block'
                      aria-hidden='true'
                    />
                    <div className='max-w-7xl mx-auto bg-gray-700 bg-transparent lg:px-8'>
                      <div className='lg:grid lg:grid-cols-12'>
                        <div className='relative z-10 lg:col-start-1 lg:row-start-1 lg:col-span-4 lg:py-16 bg-transparent'>
                          <div
                            className='absolute inset-x-0 h-1/2 bg-gray-700 bg-transparent'
                            aria-hidden='true'
                          />
                          <div className='max-w-md mx-auto px-4 sm:max-w-1xl sm:px-6 lg:max-w-none lg:p-0'>
                            <Anime
                              delay={1000}
                              loop={true}
                              scale={[0.98, 1]}
                              easing='easeInElastic'
                              translateY='0.25rem'
                              direction='alternate'
                              elasticity={1000}
                            >
                              <div className='aspect-w-10 aspect-h-10 sm:aspect-w-1 sm:aspect-h-1 lg:aspect-w-1'>
                                <a
                                  href={`https://www.coingecko.com/en/coins/${tokenDataProps.token.coingeckoId}`}
                                  target='_blank'
                                  rel='noreferrer'
                                >
                                  <img
                                    className='object-cover border-2 border-white object-center rounded-full shadow-2xl'
                                    src={tokenDataProps.token.image}
                                    alt=''
                                  />
                                </a>
                              </div>
                            </Anime>
                          </div>
                        </div>

                        <div className='relative bg-transparent lg:bg-gray-800 lg:col-start-3 lg:row-start-1 lg:col-span-10 lg:rounded-full lg:grid lg:grid-cols-10 lg:items-center'>
                          <div
                            className='hidden absolute inset-0 overflow-hidden rounded-full lg:block'
                            aria-hidden='true'
                          ></div>
                          {tokenData.components &&
                          tokenData.components?.length > 0 &&
                          tokenData.currentSupply ? (
                            <div className='relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 md:col-start-6 lg:col-start-3 lg:col-span-10'>
                              <div className='' id='join-heading'>
                                <WalletBalance
                                  token={tokenData.token}
                                  latestPrice={tokenData.latestPrice}
                                  currentBalance={tokenData.balance}
                                />
                                {tokenData.token.symbol !==
                                  DoubloonToken.symbol && (
                                  <TokenStats
                                    latestVolume={tokenData.latestVolume}
                                    latestMarketCap={tokenData.latestMarketCap}
                                    fees={tokenData.token.fees}
                                    supplyCap={tokenData.supplyCap}
                                    netAssetValue={getNetAssetValue()}
                                    currentSupply={tokenData.currentSupply}
                                  />
                                )}
                              </div>
                              <div>{getMintRedeemWrapper()}</div>
                              <div>
                                <h2 className='text-gray-200 text-xs mb-3 font-medium uppercase tracking-wide'>
                                  Allocations
                                </h2>
                                {tokenData.components && (
                                  <IndexComponentsTable
                                    components={tokenData.components}
                                  />
                                )}
                              </div>
                              {/* <a
                        className='block w-full py-3 px-5 text-center bg-white border border-transparent rounded-md shadow-md text-base font-medium text-gray-800 hover:bg-gray-50 sm:inline-block sm:w-auto'
                        href='#'
                      >
                        Explore open positions
                      </a> */}
                            </div>
                          ) : (
                            <>
                              <div className='relative max-w-md mx-auto py-12 px-4 space-y-6 sm:max-w-3xl sm:py-16 sm:px-6 lg:max-w-none lg:p-0 md:col-start-6 lg:col-start-3 lg:col-span-10 animate-ping '>
                                <svg
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-16 w-16 animate-ping'
                                  fill='none'
                                  viewBox='0 0 24 24'
                                  stroke='currentColor'
                                >
                                  <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M13 10V3L4 14h7v7l9-11h-7z'
                                  />
                                </svg>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ProductPageHeader>
              <ProductPageContent>{children}</ProductPageContent>
            </Container>
          </BrowserView>
          <MobileView>
            <>
              <div className='bg-gray-800 min-h-full px-4 py-12 rounded-3xl sm:px-6 sm:py-12 md:grid md:place-items-center lg:px-10'>
                <div className='max-w-max mx-auto'>
                  <main className='sm:flex'>
                    <div className='sm:ml-6'>
                      <div className='text-center sm:border-gray-200'>
                        <h1 className='text-lg font-bold text-white tracking-tight'>
                          <span>Unsupported Browser</span>
                          <br></br>
                        </h1>
                        <p className='mt-1 text-base  text-center  text-gray-200'>
                          SetSwap temporarily only supports Desktop browsers
                        </p>
                      </div>
                    </div>
                  </main>
                </div>
              </div>
              <div className='mx-auto'>
                <div className='text-center '>
                  <Anime
                    delay={(el: any, index: any) => index * 1000}
                    loop={true}
                    scale={[0.94, 1]}
                    easing='easeInElastic'
                    direction='alternate'
                    elasticity={1000}
                  >
                    <img
                      id='main-logo'
                      className='h-24 w-24 rounded-full justify-center m-auto -translate-y-10'
                      src={
                        'https://github.com/GalleonDAO/setswap-tokenlist/blob/main/logos/setswap.png?raw=true'
                      }
                      alt=''
                    />
                  </Anime>
                </div>
              </div>
            </>
          </MobileView>
        </>
      ) : (
        <>
          <div className='bg-gray-800 bg-opacity-70  min-h-full px-4 py-12 rounded-3xl sm:px-6 sm:py-12 md:grid md:place-items-center lg:px-10'>
            <div className='max-w-max mx-auto'>
              <main className='sm:flex'>
                <div className='sm:ml-6'>
                  <div className='text-center sm:border-gray-200'>
                    <h1 className='text-lg font-bold text-white tracking-tight'>
                      {!account ? (
                        <span>Connect your wallet</span>
                      ) : (
                        <span>Switch to a supported network</span>
                      )}{' '}
                      <br></br>
                    </h1>
                    <p className='mt-1 text-base  text-center  text-gray-200'>
                      {tokenData.token.name} supports
                    </p>
                    <div className='mt-2 flex text-lg space-x-3 sm:border-l sm:border-transparent sm:pl-6'>
                      <ul>
                        {listNetworks().map((network: any) => (
                          <li
                            className='font-semibold  text-center '
                            key={network.name}
                          >
                            <img
                              className={classNames(
                                'inline-block mr-1  h-10 w-10  text-center  border-2 border-white  rounded-full'
                              )}
                              src={network.logo}
                              alt=''
                            />{' '}
                            {network.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className='mx-auto'>
            <div className='text-center '>
              <Anime
                delay={(el: any, index: any) => index * 1000}
                loop={true}
                scale={[0.94, 1]}
                easing='easeInElastic'
                direction='alternate'
                elasticity={1000}
              >
                <img
                  id='main-logo'
                  className='h-24 w-24 rounded-full justify-center m-auto -translate-y-10'
                  src={
                    'https://github.com/GalleonDAO/setswap-tokenlist/blob/main/logos/setswap.png?raw=true'
                  }
                  alt=''
                />
              </Anime>
            </div>
          </div>
        </>
      )}
    </Page>
  )
}

export default ProductDataUI
