import React from 'react'

import { useTheme } from 'react-neu'
import MoonLoader from 'react-spinners/MoonLoader'

import styled from 'styled-components'

import ExternalLink from 'components/ExternalLink'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useWallet from 'hooks/useWallet'
import { makeEtherscanLink } from 'utils/index'

const PendingTransaction: React.FC = () => {
  const theme = useTheme()
  const { transactionId } = useTransactionWatcher()
  const { chainId } = useWallet()

  const etherscanLink =
    transactionId && makeEtherscanLink(transactionId, chainId)

  return (
    <StyledCard>
      <MoonLoader color={theme.textColor} size={20} />
      <StyledCardBody>
        <p className='text-xl font-medium mt-2 mb-1 text-white'>
          Your transaction pending
        </p>
        <ExternalLink href={etherscanLink} target='_blank'>
          <span className='animate-pulse mt-2  inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800'>
            <svg
              className='-ml-1 mr-1.5 h-2 w-2 text-yellow-400'
              fill='currentColor'
              viewBox='0 0 8 8'
            >
              <circle cx={4} cy={4} r={3} />
            </svg>
            View the transaction
          </span>
        </ExternalLink>
      </StyledCardBody>
    </StyledCard>
  )
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1f2937;
  border-radius: ${(props) => props.theme.borderRadius}px;
`

const StyledTransactionArrow = styled.img`
  width: 9px;
  height: 9px;
  margin-left: 2px;
`

const StyledCardBody = styled.p`
  text-align: center;
`

export default PendingTransaction
