import React, { useEffect } from 'react'
import styled from 'styled-components'
import ProductDataUI, {
  TokenDataProps,
} from 'components/ProductPage/ProductDataUI'
import { DoubloonToken } from 'constants/productTokens'
import useBalances from 'hooks/useBalances'
import useDblTokenMarketData from 'hooks/useDblTokenMarketData'

const DblProductPage = (props: { title: string }) => {
  useEffect(() => {
    document.title = props.title
  }, [props.title])

  const {
    prices,
    hourlyPrices,
    latestPrice,
    latestMarketCap,
    latestVolume,
  } = useDblTokenMarketData()
  const { dblBalanceArbitrum } = useBalances()
  const tokenDataProps: TokenDataProps = {
    prices: prices,
    hourlyPrices: hourlyPrices,
    latestPrice: latestPrice,
    latestMarketCap: latestMarketCap,
    latestVolume: latestVolume,
    token: DoubloonToken,
    components: undefined,
    balance: dblBalanceArbitrum,
  }

  return (
    <StyledBackgroundDiv>
      <ProductDataUI tokenDataProps={tokenDataProps}>
        <></>
      </ProductDataUI>
    </StyledBackgroundDiv>
  )
}

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

export default DblProductPage
