import React, { useCallback } from 'react'

import {
  Box,
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
  Separator,
  Spacer,
} from 'react-neu'
import { toast } from 'react-toastify'

import styled from 'styled-components'

import bedBorderLogo from 'assets/bed-border.png'
import dataLogo from 'assets/data-logo.png'
import gmiLogo from 'assets/gmilogo.png'
import indexToken from 'assets/index-token.png'
import Modal from 'components/CustomModal'
import FancyValue from 'components/FancyValue'
import Split from 'components/Split'
import * as tokenAddresses from 'constants/ethContractAddresses'
import useBalances from 'hooks/useBalances'
import useWallet from 'hooks/useWallet'
import { displayFromWei, getBigNumber } from 'utils'
import {
  ARBITRUM_CHAIN_DATA,
  MAINNET_CHAIN_DATA,
  OPTIMISM_CHAIN_DATA,
  POLYGON_CHAIN_DATA,
} from 'utils/connectors'

const WalletModal: React.FC<ModalProps> = ({ isOpen, onDismiss }) => {
  const { reset, chainId } = useWallet()
  const {
    solunavaxBalanceOptimism,
    sol1xBalanceOptimism,
    luna1xBalanceOptimism,
    avax1xBalanceOptimism,
    dblBalanceArbitrum,
  } = useBalances()

  const handleSignOut = useCallback(() => {
    reset()
    toast.success("You've successfully signed out.")
    onDismiss && onDismiss()
  }, [reset, onDismiss])

  // const ethSolunavaxTokenIcon = (
  //   <StyledLpTokenWrapper>
  //     <StyledLpTokenImage
  //       alt='ETH Icon'
  //       src='https://s3.amazonaws.com/set-core/img/coin-icons/eth.svg'
  //     />
  //     <StyledLpTokenImage
  //       alt='SOLUNAVAX Icon'
  //       src={
  //         'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/solunavax.png'
  //       }
  //     />
  //   </StyledLpTokenWrapper>
  // )

  const getChainName = () => {
    if (chainId === MAINNET_CHAIN_DATA.chainId)
      return `My ${MAINNET_CHAIN_DATA.name} Wallet`
    if (chainId === POLYGON_CHAIN_DATA.chainId)
      return `My ${POLYGON_CHAIN_DATA.name} Wallet`
    if (chainId === OPTIMISM_CHAIN_DATA.chainId)
      return `My ${OPTIMISM_CHAIN_DATA.name} Wallet`
    if (chainId === ARBITRUM_CHAIN_DATA.chainId)
      return `My ${ARBITRUM_CHAIN_DATA.name} Wallet`
    return 'My Wallet'
  }

  const mainnetModalContent = () => {
    return <></>
  }

  const polygonModalContent = () => {
    return <></>
  }

  const optimismModalContent = () => {
    return (
      <>
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt: 'SOLUNAVAX Index Icon',
                src: 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/solunavax.png',
              }}
              label='SOLUNAVAX Index balance'
              link={`https://optimistic.etherscan.io/address/${tokenAddresses.solunavaxTokenOptimismAddress}`}
              value={displayFromWei(solunavaxBalanceOptimism)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'SOL 1x',
                src: 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/sol1x.png',
              }}
              label='SOL 1x balance'
              link={`https://optimistic.etherscan.io/address/${tokenAddresses.sol1xTokenOptimismAddress}`}
              value={displayFromWei(sol1xBalanceOptimism)}
            />
          </Box>
        </Split>
        <Spacer />
        <Separator />
        <Spacer />
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt: 'LUNA 1x Icon',
                src: 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/luna1x.png',
              }}
              label='LUNA 1x balance'
              link={`https://optimistic.etherscan.io/address/${tokenAddresses.luna1xTokenOptimismAddress}`}
              value={displayFromWei(luna1xBalanceOptimism)}
            />
          </Box>
          <Box row>
            <FancyValue
              icon={{
                alt: 'AVAX 1x Icon',
                src: 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/avax1x.png',
              }}
              label='AVAX 1X balance'
              link={`https://optimistic.etherscan.io/address/${tokenAddresses.avax1xTokenOptimismAddress}`}
              value={displayFromWei(avax1xBalanceOptimism)}
            />
          </Box>
        </Split>
        <Spacer />
        {/* <Split>
          <Box row>
            <FancyValue
              iconComponent={etSolunavaxTokenIcon}
              label='Uniswap ETH/SOLUNAVAX LP balance'
              link={`https://etherscan.io/address/${tokenAddresses.uniswapEthMviLpTokenAddress}`}
              value={displayFromWei(uniswapEthMviLpBalance)}
            />
          </Box>
          <Spacer />
        </Split> */}
      </>
    )
  }

  const arbitrumModalContent = () => {
    return (
      <>
        <Split>
          <Box row>
            <FancyValue
              icon={{
                alt: 'Doubloon Token',
                src: 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/assets/tokens/solunavax.png',
              }}
              label='DBL Index balance'
              link={`https://optimistic.etherscan.io/address/${tokenAddresses.doubloonTokenArbitrumAddress}`}
              value={displayFromWei(dblBalanceArbitrum)}
            />
          </Box>
        </Split>
        <Spacer />
      </>
    )
  }

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <StyledModalBody>
        <ModalTitle text={getChainName()} />
        <ModalContent>
          {chainId && chainId === MAINNET_CHAIN_DATA.chainId
            ? mainnetModalContent()
            : chainId && chainId === POLYGON_CHAIN_DATA.chainId
            ? polygonModalContent()
            : chainId && chainId === OPTIMISM_CHAIN_DATA.chainId
            ? optimismModalContent()
            : arbitrumModalContent()}
        </ModalContent>
        <Separator />
        <ModalActions>
          <Button onClick={onDismiss} text='Close' variant='secondary' />
          <Button onClick={handleSignOut} text='Sign Out' />
        </ModalActions>
      </StyledModalBody>
    </Modal>
  )
}

const StyledLpTokenImage = styled.img`
  height: 30px;
  margin-left: -10px;
`

const StyledLpTokenWrapper = styled.div``

const StyledModalBody = styled.div`
  @media (max-width: 600px) {
    height: 100vh;
    overflow-y: scroll;
  }
`

export default WalletModal
