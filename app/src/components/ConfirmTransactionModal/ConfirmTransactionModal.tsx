import React, { useMemo } from 'react'

import {
  Button,
  ModalActions,
  ModalContent,
  ModalProps,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'

import metamaskLogo from 'assets/metamask-fox.svg'
import walletConnectLogo from 'assets/wallet-connect.svg'
import Modal from 'components/CustomModal'
import ExternalLink from 'components/ExternalLink'
import { TransactionStatusType } from 'components/TransactionWatcher'
import useWallet from 'hooks/useWallet'
import { makeEtherscanLink } from 'utils/index'

interface ConfirmationModalProps extends ModalProps {
  transactionId?: string
  transactionMiningStatus?: TransactionStatusType
}

const ConfirmTransactionModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  transactionId,
  transactionMiningStatus,
  onDismiss,
}) => {
  const { connector, chainId } = useWallet()

  const WalletLogo = useMemo(() => {
    if (connector === 'injected') {
      return <img alt='metamaskLogo' src={metamaskLogo} height={96} />
    } else if (connector === 'walletconnect') {
      return <img alt='walletConnectLogo' src={walletConnectLogo} height={72} />
    }
  }, [connector])

  const etherscanLink = useMemo(() => {
    if (!transactionId) return

    const etherscanUrl = makeEtherscanLink(transactionId, chainId)

    return (
      <>
        <ExternalLink href={etherscanUrl} target='_blank'>
          <span className='animate-pulse mt-2  inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800'>
            <svg
              className='-ml-1 mr-1.5 h-2 w-2 text-indigo-400'
              fill='currentColor'
              viewBox='0 0 8 8'
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            View the transaction
          </span>
        </ExternalLink>
      </>
    )
  }, [chainId, transactionId])

  switch (transactionMiningStatus) {
    case TransactionStatusType.IS_UNSTARTED:
    case TransactionStatusType.IS_APPROVING:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Confirm transaction in your wallet.</StyledText>
            <Spacer />
          </ModalContent>
        </Modal>
      )
    case TransactionStatusType.IS_PENDING:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Your transaction is processing.</StyledText>
            {etherscanLink}
          </ModalContent>
        </Modal>
      )
    case TransactionStatusType.IS_COMPLETED:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Your transaction succeeded.</StyledText>
            {etherscanLink}
          </ModalContent>
          <ModalActions>
            <Button text='Close' variant='secondary' onClick={onDismiss} />
          </ModalActions>
        </Modal>
      )
    case TransactionStatusType.IS_FAILED:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Your transaction could not be processed.</StyledText>
            {etherscanLink}
          </ModalContent>
          <ModalActions>
            <Button text='Close' variant='secondary' onClick={onDismiss} />
          </ModalActions>
        </Modal>
      )
    default:
      return (
        <Modal isOpen={isOpen}>
          <ModalContent>
            {WalletLogo}
            <Spacer />
            <StyledText>Confirm transaction in wallet.</StyledText>
            <Spacer />
          </ModalContent>
        </Modal>
      )
  }
}

const StyledText = styled.div`
  font-size: 24px;
  text-align: center;
`

export default ConfirmTransactionModal
