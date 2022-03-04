import { useEffect, useMemo } from 'react'

import { useTheme } from 'react-neu'
import Select from 'react-select'

import useChainData from 'hooks/useChainData'
import useWallet from 'hooks/useWallet'
import {
  ARBITRUM_CHAIN_DATA,
  OPTIMISM_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'

export const ChainSelector = () => {
  const { chain, setMainnet, setPolygon, setOptimism, setArbitrum } =
    useChainData()
  const theme = useTheme()
  const { chainId } = useWallet()

  useEffect(() => {
    if (chainId) {
      if (chainId === POLYGON_CHAIN_DATA.chainId) setPolygon()
      if (chainId === OPTIMISM_CHAIN_DATA.chainId) setOptimism()
      if (chainId === ARBITRUM_CHAIN_DATA.chainId) setArbitrum()
    } else setMainnet()
  }, [chainId])

  const styles = useMemo(
    () => ({
      control: (styles: any) => ({
        ...styles,
        width: '100%',
        background: `rgb(17, 24, 39, 0.9)`,
        padding: 6,
        border: 'none',
        borderRadius: 9999,
        cursor: 'pointer',
      }),
      singleValue: (styles: any) => ({
        ...styles,
        color: theme.textColor,
        fontWeight: 600,
        fontSize: 16,
        width: '100%',
        textAlign: 'left',
        cursor: 'pointer',
      }),
      menu: (styles: any) => ({
        ...styles,
        color: 'black',
        cursor: 'pointer',
      }),
      dropdownIndicator: (styles: any) => ({
        ...styles,
        'color': theme.textColor,
        'cursor': 'pointer',
        '&:hover': {
          color: theme.textColor,
        },
      }),
      indicatorSeparator: () => ({}),
      indicatorContainer: (styles: any) => ({
        ...styles,
        marginLeft: 0,
        padding: 0,
      }),
    }),
    [theme]
  )

  return (
    <Select
      isSearchable={false}
      value={{ label: chain.name } as any}
      onChange={(chain) => {
        if (chain.value === 'polygon') setPolygon()
        if (chain.value === 'optimism') setOptimism()
        if (chain.value === 'arbitrum') setArbitrum()
        else setMainnet()
      }}
      options={[
        {
          value: 'ethereum',
          label: 'Ethereum',
        },
        {
          value: 'polygon',
          label: 'Polygon',
        },
        {
          value: 'optimism',
          label: 'Optimism',
        },
        {
          value: 'arbitrum',
          label: 'Arbitrum',
        },
      ]}
      styles={styles}
    />
  )
}

export default ChainSelector
