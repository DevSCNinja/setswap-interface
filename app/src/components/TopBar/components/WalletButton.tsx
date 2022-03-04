import React, { useCallback } from 'react'

import styled from 'styled-components'

import Davatar from '@davatar/react'
import { shortenAddress, useLookupAddress } from '@usedapp/core'

import UnlockWalletModal from 'components/UnlockWalletModal'
import WalletModal from 'components/WalletModal'
import useWallet from 'hooks/useWallet'

const WalletButton: React.FC = () => {
  const {
    account,
    ethereum,
    isShowingWalletModal,
    onCloseWalletModal,
    onOpenWalletModal,
    status,
    connect,
  } = useWallet()
  const ens = useLookupAddress()

  const onClick = useCallback(() => {
    // If the user comes from the onto app it should directly connect without opening the web3 modal
    if (status !== 'connected' && (window as any).ethereum?.isONTO) {
      connect('injected')
    } else {
      onOpenWalletModal()
    }
  }, [status, connect, onOpenWalletModal])

  const openWalletText = getOpenWalletText(account, ens)
  const variant = !!account ? 'tertiary' : 'default'

  return (
    <>
      <button
        onClick={onClick}
        type='button'
        className='inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        {account && (
          <StyledDavatar>
            <Davatar
              size={24}
              address={account}
              provider={ethereum}
              generatedAvatarType='jazzicon' // optional, 'jazzicon' or 'blockies'
            />
          </StyledDavatar>
        )}
        {!account ? 'Connect Wallet' : openWalletText}
      </button>

      <WalletModal
        isOpen={!!account && isShowingWalletModal}
        onDismiss={onCloseWalletModal}
      />
      <UnlockWalletModal
        isOpen={!account && isShowingWalletModal}
        onDismiss={onCloseWalletModal}
      />
    </>
  )
}

function getOpenWalletText(
  account: string | null | undefined,
  ens: string | null | undefined
) {
  if (account && ens) {
    return ens
  } else if (account) {
    return shortenAddress(account)
  } else {
    return 'Connect Wallet'
  }
}

const StyledDavatar = styled.div`
  margin-right: 6px;
`

export default WalletButton
