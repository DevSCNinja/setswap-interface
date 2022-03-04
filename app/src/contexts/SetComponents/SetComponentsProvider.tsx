import React, { useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import {
  CoinGeckoCoinPrices,
  Position,
  SetDetails,
} from 'set.js/dist/types/src/types'

import { solunavaxTokenOptimismAddress } from 'constants/ethContractAddresses'
import usePrices from 'hooks/usePrices'
import useWallet from 'hooks/useWallet'
import {
  MAINNET_CHAIN_DATA,
  OPTIMISM_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'
import { getSetDetails } from 'utils/setjsApi'
import { getTokenList, TokenData as Token } from 'utils/tokenlists'

import { SetComponent } from './SetComponent'
import SetComponentsContext from './SetComponentsContext'

const ASSET_PLATFORM = 'ethereum'
const VS_CURRENCY = 'usd'

const SetComponentsProvider: React.FC = ({ children }) => {
  const { solunavaxPrice } = usePrices()
  const [solunavaxComponents, setSolunavaxComponents] = useState<
    SetComponent[]
  >([])
  const { ethereum: provider, chainId } = useWallet()
  const tokenList = getTokenList(chainId)

  useEffect(() => {
    if (
      chainId &&
      chainId === POLYGON_CHAIN_DATA.chainId &&
      provider &&
      tokenList
    ) {
      //
    }
  }, [chainId, provider, tokenList])

  useEffect(() => {
    if (
      chainId &&
      chainId === OPTIMISM_CHAIN_DATA.chainId &&
      provider &&
      solunavaxTokenOptimismAddress &&
      tokenList
    ) {
      getSetDetails(provider, [solunavaxTokenOptimismAddress], chainId)
        .then(async (result) => {
          const solunavax = result[0]
          const solunavaxComponentPrices = await getPositionPrices(
            solunavax,
            'optimistic-ethereum'
          )
          const solunavaxPositions = solunavax.positions.map(
            async (position) => {
              return await convertPositionToSetComponent(
                position,
                tokenList,
                solunavaxComponentPrices[position.component.toLowerCase()]?.[
                  VS_CURRENCY
                ],
                solunavaxComponentPrices[position.component.toLowerCase()]?.[
                  `${VS_CURRENCY}_24h_change`
                ],
                solunavaxPrice
              )
            }
          )
          Promise.all(solunavaxPositions)
            .then(sortPositionsByPercentOfSet)
            .then(setSolunavaxComponents)
        })
        .catch((err) => console.log('err', err))
    }
  }, [chainId, provider, tokenList, solunavaxPrice])

  return (
    <SetComponentsContext.Provider
      value={{
        solunavaxComponents: solunavaxComponents,
      }}
    >
      {children}
    </SetComponentsContext.Provider>
  )
}

async function convertPositionToSetComponent(
  position: Position,
  tokenList: Token[],
  componentPriceUsd: number,
  componentPriceChangeUsd: number,
  setPriceUsd: number
): Promise<SetComponent> {
  const token = getTokenForPosition(tokenList, position)
  if (token === undefined) {
    return {
      address: position.component,
      id: position.component,
      quantity: '',
      symbol: 'SYM',
      name: position.component,
      image: '',
      totalPriceUsd: '0',
      dailyPercentChange: '0',
      percentOfSet: '0',
      percentOfSetNumber: new BigNumber('0'),
    }
  }

  const quantity = new BigNumber(position.unit.toString()).div(
    new BigNumber(10).pow(token.decimals)
  )
  const totalPriceUsd = quantity.multipliedBy(componentPriceUsd)
  const percentOfSet = totalPriceUsd.dividedBy(setPriceUsd).multipliedBy(100)

  return {
    address: position.component,
    id: token.name.toLowerCase(),
    quantity: quantity.toString(),
    symbol: token.symbol,
    name: token.name,
    image: token.logoURI,
    totalPriceUsd: totalPriceUsd?.toString(),
    dailyPercentChange: componentPriceChangeUsd?.toString(),
    percentOfSet: percentOfSet.toPrecision(3)?.toString(),
    percentOfSetNumber: percentOfSet,
  }
}

function getTokenForPosition(tokenList: Token[], position: Position): Token {
  const matchingTokens = tokenList.filter(
    (t) => t.address.toLowerCase() === position.component.toLowerCase()
  )
  if (matchingTokens.length === 0) {
    console.warn(
      `No token for position ${position.component} exists in token lists`
    )
  } else if (matchingTokens.length > 1) {
    console.warn(
      `Multiple tokens for position ${position.component} exist in token lists`
    )
  }
  return matchingTokens[0]
}

function sortPositionsByPercentOfSet(
  components: SetComponent[]
): SetComponent[] {
  return components.sort((a, b) =>
    b.percentOfSetNumber.comparedTo(a.percentOfSetNumber)
  )
}

async function getPositionPrices(
  setDetails: SetDetails,
  assetPlatform: string = ASSET_PLATFORM
): Promise<CoinGeckoCoinPrices> {
  const componentAddresses = setDetails.positions.map((p) => p.component)
  return fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/${assetPlatform}?vs_currencies=${VS_CURRENCY}&contract_addresses=${componentAddresses}&include_24hr_change=true`
  )
    .then((response) => response.json())
    .catch((e) => console.error(e))
}

export default SetComponentsProvider
