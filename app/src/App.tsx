import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { ThemeProvider } from 'react-neu'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Slide, toast, ToastContainer } from 'react-toastify'

import styled from 'styled-components'

import { ApolloProvider } from '@apollo/client'
import { ChainId, Config, DAppProvider } from '@usedapp/core'

import MobileMenu from 'components/MobileMenu'
import TopBar from 'components/TopBar'
import { discordLink } from 'constants/externalLinks'
import { BalancesProvider } from 'contexts/Balances'
import ChainIdProvider from 'contexts/ChainData/ChainDataProvider'
import { FarmingProvider } from 'contexts/Farming'
import { FarmingTwoProvider } from 'contexts/FarmingTwo'
import { MediaQueryProvider } from 'contexts/MediaQuery'
import { MintRedeemProvider } from 'contexts/MintRedeem'
import { PricesProvider } from 'contexts/Prices'
import { SetComponentsProvider } from 'contexts/SetComponents'
import { SolunavaxTokenMarketDataProvider } from 'contexts/SolunavaxTokenMarketData'
import { StreamingFeeProvider } from 'contexts/StreamingFee'
import { TokenSupplyProvider } from 'contexts/TokenSupply'
import { TransactionWatcherProvider } from 'contexts/TransactionWatcher'
import { V3FarmingProvider } from 'contexts/V3Farming'
import { WalletProvider } from 'contexts/Wallet'
import useLocalStorage from 'hooks/useLocalStorage'
import useWallet from 'hooks/useWallet'
import createTheme from 'utils/createCustomTheme'
import graphqlClient from 'utils/graphql'
import DOUBLOON from 'views/DBL'
import SOLUNAVAX from 'views/SOLUNAVAX'

import 'react-toastify/dist/ReactToastify.css'
import DblMarketDataProvider from 'contexts/DblTokenMarketData/DblTokenMarketDataProvider'

const App: React.FC = () => {
  const [mobileMenu, setMobileMenu] = useState(false)

  const handleDismissMobileMenu = useCallback(() => {
    setMobileMenu(false)
  }, [setMobileMenu])

  const handlePresentMobileMenu = useCallback(() => {
    setMobileMenu(true)
  }, [setMobileMenu])

  const { account } = useWallet()

  // useEffect(() => {
  //   if (!account)
  //     toast.warn('Connect a wallet for the best experience', {
  //       toastId: 'connect-wallet',
  //       autoClose: 6000,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //     })
  // }, [])

  return (
    <Router>
      <Providers>
        <StyledBackgroundDiv>
          <TopBar onPresentMobileMenu={handlePresentMobileMenu} />
          <MobileMenu
            onDismiss={handleDismissMobileMenu}
            visible={mobileMenu}
          />
          <Switch>
            <Route exact path='/'>
              <SOLUNAVAX title={'SetSwap - SOLUNAVAX'} />
            </Route>
            <Route exact path='/doubloon'>
              <DOUBLOON title={'SetSwap - DBL'} />
            </Route>
            {/* <Route exact path='/liquidity-mining'>
              <Farm title={'DBL - Liquidity Mining'} />
            </Route> */}
            <Route
              exact
              path='/join'
              render={() => (window.location.href = discordLink)}
            />
            <Route
              exact
              path='/discord'
              render={() => (window.location.href = discordLink)}
            />
          </Switch>
        </StyledBackgroundDiv>
      </Providers>
    </Router>
  )
}

const config: Config = {
  readOnlyChainId: ChainId.Mainnet,
}

const Providers: React.FC = ({ children }) => {
  const [darkModeSetting] = useLocalStorage('darkMode', true)
  const { dark: darkTheme, light: lightTheme } = useMemo(() => {
    return createTheme()
  }, [])

  return (
    <ThemeProvider
      darkModeEnabled={darkModeSetting}
      darkTheme={darkTheme}
      lightTheme={lightTheme}
    >
      <TransactionWatcherProvider>
        <WalletProvider>
          <DAppProvider config={config}>
            <ChainIdProvider>
              <ApolloProvider client={graphqlClient}>
                <MediaQueryProvider>
                  <BalancesProvider>
                    <PricesProvider>
                      <MintRedeemProvider>
                        <SolunavaxTokenMarketDataProvider>
                          <DblMarketDataProvider>
                            <V3FarmingProvider>
                              <StreamingFeeProvider>
                                <TokenSupplyProvider>
                                  <SetComponentsProvider>
                                    {children}
                                  </SetComponentsProvider>
                                </TokenSupplyProvider>
                              </StreamingFeeProvider>
                            </V3FarmingProvider>
                          </DblMarketDataProvider>
                        </SolunavaxTokenMarketDataProvider>
                      </MintRedeemProvider>
                    </PricesProvider>
                  </BalancesProvider>
                </MediaQueryProvider>
              </ApolloProvider>
            </ChainIdProvider>
          </DAppProvider>
        </WalletProvider>
      </TransactionWatcherProvider>
      <ToastContainer transition={Slide} position='bottom-left' />
    </ThemeProvider>
  )
}

const StyledBackgroundDiv = styled.div``

export default App
