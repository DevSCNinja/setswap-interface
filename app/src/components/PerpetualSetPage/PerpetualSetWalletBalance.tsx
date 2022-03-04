import React from 'react'

import BigNumber from 'bignumber.js'
import numeral from 'numeral'
import styled from 'styled-components'

import SimpleButton from 'components/SimpleButton'
import { ProductToken } from 'constants/productTokens'
import { useAddToMetamask } from 'hooks/useAddToMetamask'
import useWallet from 'hooks/useWallet'
import { displayFromWei } from 'utils'

import { ProductPageSection } from './PerpetualSetPageLayouts'

interface ProductWalletBalanceProps {
  token: ProductToken
  latestPrice?: number
  currentBalance?: BigNumber
}

const ProductWalletBalance: React.FC<ProductWalletBalanceProps> = ({
  token,
  latestPrice = 0,
  currentBalance = new BigNumber(0),
}) => {
  const { isMetamaskConnected } = useWallet()
  const handleAddToMetamask = useAddToMetamask()

  return (
    <ProductPageSection title=''>
      <StyledTokenWrapper>
        <div>
          <div className='relative mt-3'>
            <div className='relative'>
              <div className='max-w-4xl mx-auto'>
                <div className='flex flex-col p-1 text-center'>
                  <dd className='order-1 text-3xl font-extrabold text-white'>
                    <span className='translate-y-1'>{token.name}</span>
                    <button
                      type='button'
                      style={{
                        transform: 'translateY(-4px)',
                      }}
                      disabled={!isMetamaskConnected}
                      onClick={() => handleAddToMetamask(token)}
                      className='inline-flex items-center px-6 ml-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-full text-white bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    >
                      Add to MetaMask
                    </button>
                    <br></br>
                    <div className='text-left'>
                      <span className='text-md font-semibold text-gray-300'>
                        Balance: {displayFromWei(currentBalance)}
                      </span>
                    </div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          {/* <StyledTokenValuation>
            ${displayFromWei(currentBalance.times(latestPrice))}
          </StyledTokenValuation> */}
        </div>
      </StyledTokenWrapper>
    </ProductPageSection>
  )
}

const StyledTokenWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const StyledTokenValuation = styled.h3`
  display: inline-block;
  margin: 0 ${({ theme }) => theme.spacing[4]}px 0 0;
  font-size: 24px;
`

const StyledTokenBalance = styled.div`
  display: inline-block;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.grey[500]};
`

export default ProductWalletBalance
