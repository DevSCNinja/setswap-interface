import React from 'react'

import numeral from 'numeral'
import styled from 'styled-components'

import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid'

import BigNumber from 'utils/bignumber'
import classNames from 'utils/className'

import { ProductPageSection } from './PerpetualSetPageLayouts'

interface ProductTokenStatsProps {
  latestMarketCap?: number
  latestVolume?: number
  fees?: {
    streamingFee: string
  }
  netAssetValue: number
  /**
   * The total supply cap of this product. If no supply cap is provided, supply
   * cap is not displayed.
   */
  supplyCap: BigNumber | undefined
  currentSupply: BigNumber | undefined
}

const ProductTokenStats: React.FC<ProductTokenStatsProps> = ({
  latestMarketCap,
  latestVolume,
  fees,
  supplyCap,
  currentSupply,
  netAssetValue,
}) => {
  const formatMetric = (metricValue: number) =>
    numeral(metricValue).format('0.00a').toString().toUpperCase()

  const formattedSupplyCap = () =>
    supplyCap ? numeral(supplyCap?.toString() || '0').format('0,0') : '--'

  const formattedMarketCap = () => {
    if (latestMarketCap) {
      return '$' + formatMetric(latestMarketCap)
    } else if (currentSupply) {
      const approxMarketCap = Number(currentSupply) * netAssetValue
      return '$' + formatMetric(approxMarketCap)
    } else {
      return '--'
    }
  }

  const formattedCurrentSupply = currentSupply
    ? numeral(currentSupply?.toString() || '0').format('0,0')
    : '--'

  return (
    <ProductPageSection title=''>
      <div className=''>
        <dl className='grid grid-cols-5 rounded-lg bg-transparent overflow-hidden shadow divide-y divide-gray-700 md:grid-cols-5 md:divide-y-0 md:divide-x'>
          <div className='px-4 py-3 sm:p-3'>
            <dt className='text-base font-normal text-white'>
              Net Asset Value
            </dt>
            <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
              {netAssetValue > 0 ? (
                <div className='flex items-baseline text-sm font-semibold text-indigo-200'>
                  {formatMetric(netAssetValue)}
                </div>
              ) : (
                <span className='text-yellow-200 animate-pulse text-sm'>
                  Pending Data
                </span>
              )}
            </dd>
          </div>

          <div className='px-4 py-3 sm:p-3'>
            <dt className='text-base font-normal text-white'>Latest Volume</dt>
            <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
              {latestVolume && latestVolume > 0 ? (
                <div className='flex items-baseline text-sm font-semibold text-gray-100'>
                  {latestVolume}
                </div>
              ) : (
                <span className='text-yellow-200  animate-pulse text-sm'>
                  Pending Data
                </span>
              )}
            </dd>
          </div>

          <div className='px-4 py-3 sm:p-3'>
            <dt className='text-base font-normal text-white'>Market Cap</dt>
            <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
              {latestMarketCap && latestMarketCap > 0 ? (
                <div className='flex items-baseline text-sm text-gray-100'>
                  {formattedMarketCap}
                </div>
              ) : (
                <span className='text-yellow-200 animate-pulse text-sm'>
                  Pending Data
                </span>
              )}
            </dd>
          </div>

          <div className='px-4 py-3 sm:p-3'>
            <dt className='text-base font-normal text-white'>Current Supply</dt>
            <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
              {Number(formattedCurrentSupply) > 0 ? (
                <div className='flex items-baseline text-sm text-gray-100'>
                  {formattedCurrentSupply}
                </div>
              ) : (
                <span className='text-yellow-200 animate-pulse text-sm'>
                  Pending Data
                </span>
              )}
            </dd>
          </div>

          <div className='px-4 py-3 sm:p-3'>
            <dt className='text-base font-normal text-white'>Streaming Fee</dt>
            <dd className='mt-1 flex justify-between items-baseline md:block lg:flex'>
              {fees ? (
                <div className='flex items-baseline text-sm font-semibold text-gray-100'>
                  {fees?.streamingFee}
                </div>
              ) : (
                <span className='text-yellow-200 ffont-semibold text-sm animate-pulse'>
                  Pending Data
                </span>
              )}
            </dd>
          </div>
        </dl>
      </div>
    </ProductPageSection>
  )
}

const PriceStatsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`
const StyledStat = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 481px) {
    flex: 1;
  }
  @media (max-width: 480px) {
    align-items: center;
  }
`
const StyledStatTitle = styled.div`
  font-size: 16px;
  @media (max-width: 480px) {
    font-size: 14px;
  }
`
const StyledStatMetric = styled.div`
  font-size: 24px;
  @media (max-width: 480px) {
    font-size: 16px;
  }
`

export default ProductTokenStats
