import React from 'react'

import { Spacer } from 'react-neu'

import styled from 'styled-components'

import ExternalLink from 'components/ExternalLink'
import { RoundedButton } from 'components/RoundedButton'
import { TransactionStatusType } from 'contexts/TransactionWatcher/TransactionWatcherContext'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useWallet from 'hooks/useWallet'
import { makeEtherscanLink } from 'utils/index'

const CompletedTransaction: React.FC = () => {
  const { transactionId, onSetTransactionId, onSetTransactionStatus } =
    useTransactionWatcher()
  const { chainId } = useWallet()

  const etherscanLink =
    transactionId && makeEtherscanLink(transactionId, chainId)

  const onFinishTransaction = () => {
    onSetTransactionId()
    onSetTransactionStatus(TransactionStatusType.IS_UNSTARTED)
  }

  return (
    <StyledCard>
      <StyledCardBody>
        <p className='text-xl font-medium text-white'>
          Your transaction succeeded!
        </p>
        <ExternalLink href={etherscanLink} target='_blank'>
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
      </StyledCardBody>

      <Spacer />
      <button
        type='button'
        onClick={onFinishTransaction}
        className='inline-flex items-center px-12 py-1.5 border border-transparent text-base font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
      >
        Finish
      </button>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  background-color: #1f2937;
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledIcon = styled.img`
  width: 55px;
  height: 55px;
`
const StyledTransactionArrow = styled.img`
  width: 9px;
  height: 9px;
  margin-left: 2px;
`

const StyledCardBody = styled.p`
  text-align: center;
`

export default CompletedTransaction
