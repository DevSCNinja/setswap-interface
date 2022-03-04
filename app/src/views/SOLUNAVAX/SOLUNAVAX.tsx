import React, { useEffect } from 'react'

import { useHistory } from 'react-router-dom'

import styled from 'styled-components'

import {
  CalendarIcon,
  CashIcon,
  ChartPieIcon,
  CodeIcon,
  TrendingUpIcon,
} from '@heroicons/react/outline'

import PerpetualSet, {
  TokenDataProps,
} from 'components/PerpetualSetPage/PerpetualSetDataUI'
import { ProductToken, SolunavaxIndex } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useLocalStorage from 'hooks/useLocalStorage'
import useSetComponents from 'hooks/useSetComponents'
import useSolunavaxTokenMarketData from 'hooks/useSolunavaxTokenMarketData'
import useStreamingFee from 'hooks/useStreamingFee'
import useTokenSupply from 'hooks/useTokenSupply'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'
import { OPTIMISM_CHAIN_DATA } from 'utils/connectors'

const SolunavaxProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const {
    prices,
    hourlyPrices,
    latestPrice,
    latestMarketCap,
    latestVolume,
  } = useSolunavaxTokenMarketData()
  const { chainId } = useWallet()
  const { solunavaxBalanceOptimism } = useBalances()
  const { solunavaxStreamingFee } = useStreamingFee()
  const { solunavaxTotalSupply } = useTokenSupply()
  const { solunavaxComponents: components } = useSetComponents()

  const token: ProductToken = {
    ...SolunavaxIndex,
    fees: solunavaxStreamingFee
      ? { streamingFee: solunavaxStreamingFee }
      : undefined,
  }

  const getTokenBalance = () => {
    if (chainId) {
      if (chainId === OPTIMISM_CHAIN_DATA.chainId)
        return solunavaxBalanceOptimism
    }
    return new BigNumber(0)
  }

  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: token,
    components: components,
    balance: getTokenBalance(),
    currentSupply: solunavaxTotalSupply,
  }

  const [, setReferral] = useLocalStorage('referral', '')

  const history = useHistory()
  const params = new URLSearchParams(history.location.search)
  const value = params.get('referral')
  useEffect(() => {
    if (value) setReferral(value)
  }, [value, setReferral])

  return (
    <StyledBackgroundDiv>
      <PerpetualSet tokenDataProps={tokenDataProps}>
        <div className='relative py-16 container m-auto overflow-hidden'>
          <div className='relative px-4 sm:px-6 lg:px-8'>
            <div className='text-lg max-w-5xl mx-auto border p-10 rounded-3xl border-gray-600 bg-gray-600 bg-opacity-25'>
              <h1>
                <span className='block text-base text-center text-indigo-400 font-semibold tracking-wide uppercase'>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800'>
                    NARRATIVE
                  </span>
                  <span className='inline-flex items-center px-2.5 py-0.5 ml-2 rounded-full text-xs font-medium bg-red-100 text-red-800'>
                    Optimism
                  </span>
                </span>
                <span className='mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-white sm:text-4xl'>
                  Product Overview
                </span>
              </h1>
              <p className='mt-8 text-md text-gray-100 leading-8'>
                The <span className='text-indigo-300'>SOLUNAVAX Index</span>, by
                Galleon DAO &{' '}
                <span className='text-green-300'>Beverage Finance</span>, is a
                structured product built natively on the Optimism network to
                enable traders to gain spot exposure to the enormously popular,
                alternate Layer 1 assets,{' '}
                <span className='text-blue-300'>Solana (SOL)</span>,{' '}
                <span className='text-yellow-300'>Terra (LUNA)</span> and{' '}
                <span className='text-red-300'>Avalanche (AVAX)</span> using
                perpetual products. This is a first in the Set Protocol
                ecosystem for creating a cross-chain strategy and utilising the
                innovative Perpetual Protocol V2 integration.
              </p>

              <p className='mt-8 text-md text-gray-100 leading-8'>
                This product follows a strict methodology prescribed by Galleon
                DAO & <span className='text-green-300'>Beverage Finance</span>.
                It is comprised of three single perpetual 1x positions wrapped
                in Sets (<span className='text-blue-300'>SOL 1x</span>,{' '}
                <span className='text-yellow-300'>LUNA 1x</span> &{' '}
                <span className='text-red-300'>AVAX 1x</span>) to give maximum
                flexibility between gaining exposure to the entire product theme
                or its individual components. Our 1x perpetual tokens cannot get
                liquidated and are a novel ETH-native synth token that can be
                put in Curve pools, traded on exchanges and bridged.
              </p>
              <br></br>
              <div>
                <h3 className='text-md leading-6 font-medium text-indigo-300'>
                  Methodology
                </h3>
                <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
                  <div className='px-4 py-5 border border-gray-600 shadow rounded-3xl overflow-hidden sm:p-6'>
                    <dt className='text-sm font-medium text-indigo-300 truncate'>
                      Underlying Asset{' '}
                      <span className={'text-indigo-300 ml-2 inline-flex'}>
                        <ChartPieIcon className='h-4 w-4' aria-hidden='true' />
                      </span>
                    </dt>
                    <dd className='mt-1 text-sm  text-gray-100'>
                      SOL 1x, LUNA 1x, AVAX 1x<br></br>Perpetual Contracts
                    </dd>
                  </div>
                  <div className='px-4 py-5 border border-gray-600 shadow rounded-3xl overflow-hidden sm:p-6'>
                    <dt className='text-sm font-medium text-indigo-300 truncate'>
                      Rebalance Interval{' '}
                      <span className={'text-indigo-300 ml-2 inline-flex'}>
                        <CalendarIcon className='h-4 w-4' aria-hidden='true' />
                      </span>
                    </dt>
                    <dd className='mt-1 text-sm  text-gray-100'>
                      Quarterly Cycles<br></br>33% / 33% / 33%
                    </dd>
                  </div>
                  <div className='px-4 py-5 border border-gray-600 shadow rounded-3xl overflow-hidden sm:p-6'>
                    <dt className='text-sm font-medium text-indigo-300 truncate'>
                      Product Strategy{' '}
                      <span className={'text-indigo-300 ml-2 inline-flex'}>
                        <CodeIcon className='h-4 w-4' aria-hidden='true' />
                      </span>
                    </dt>
                    <dd className='mt-1 text-sm text-gray-100'>
                      Long Exposure<br></br>Passive Index
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </PerpetualSet>
    </StyledBackgroundDiv>
  )
}

export default SolunavaxProductPage

const StyledBackgroundDiv = styled.div`
  background: url(https://github.com/GalleonDAO/setswap-tokenlist/blob/main/logos/waves-opacity.png?raw=true);
  background-attachment: fixed;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
  animation: moveIt 120s linear infinite;
  overflow: hidden;
  border-top: #1f2937 solid thin;
  @keyframes moveIt {
    from {
      background-position: bottom left;
    }
    to {
      background-position: top right;
    }
  }
`
