import { useCallback, useEffect, useState } from 'react'

import { provider } from 'web3-core'

import { minimumRequiredApprovalQuantity } from 'constants/approvals'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import useWallet from 'hooks/useWallet'
import { approve } from 'utils'

import useAllowance from './useAllowance'
import useTransactionWatcher from './useTransactionWatcher'

const useApproval = (
  tokenAddress?: string,
  spenderAddress?: string,
  onTxHash?: (txHash: string) => void
) => {
  const allowance = useAllowance(tokenAddress, spenderAddress)
  const [isApproving, setIsApproving] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  const {
    account,
    ethereum,
  }: { account: string | null | undefined; ethereum?: provider } = useWallet()

  const handleApprove = useCallback(async () => {
    if (!ethereum || !account || !spenderAddress || !tokenAddress) {
      return
    }
    try {
      setIsApproving(true)
      onSetTransactionStatus(TransactionStatusType.IS_APPROVING)
      const result = await approve(
        account,
        spenderAddress,
        tokenAddress,
        ethereum,
        onTxHash
      )
      onSetTransactionStatus(TransactionStatusType.IS_PENDING)
      setIsApproved(result)
      setIsApproving(false)
      onSetTransactionStatus(TransactionStatusType.IS_COMPLETED)
    } catch (e) {
      setIsApproving(false)
      onSetTransactionStatus(TransactionStatusType.IS_FAILED)
      return false
    }
  }, [
    account,
    ethereum,
    onTxHash,
    setIsApproved,
    setIsApproving,
    spenderAddress,
    tokenAddress,
  ])

  useEffect(() => {
    if (allowance?.isGreaterThan(minimumRequiredApprovalQuantity)) {
      setIsApproved(true)
      return
    }

    setIsApproved(false)
  }, [allowance, setIsApproved])

  return {
    isApproved,
    isApproving,
    onApprove: handleApprove,
  }
}

export default useApproval