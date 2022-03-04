import { Fragment, useEffect, useRef, useState } from 'react'

import { toast } from 'react-toastify'

import styled from 'styled-components'
import { useDebouncedCallback } from 'use-debounce'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { AbiItem } from 'web3-utils'

import { Dialog, Transition } from '@headlessui/react'
import { SwitchHorizontalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'

import { perpFlashIssuanceContractAddress } from 'constants/ethContractAddresses'
import { ProductToken } from 'constants/productTokens'
import { TransactionStatusType } from 'contexts/TransactionWatcher'
import perpFlashIssuanceAbi from 'galleon-sdk/abi/PerpFlashIssuanceV1.json'
import useApproval from 'hooks/useApproval'
import useBalances from 'hooks/useBalances'
import useChainData from 'hooks/useChainData'
import useTransactionWatcher from 'hooks/useTransactionWatcher'
import useWallet from 'hooks/useWallet'
import BigNumber from 'utils/bignumber'
import classNames from 'utils/className'
import { OPTIMISM_CHAIN_DATA } from 'utils/connectors'
import { fromWei, waitTransaction } from 'utils/index'
import { getTokenList } from 'utils/tokenlists'

export interface TokenData {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

const BuySellWidget = (props: {
  setAsset: ProductToken
  componentLogos: string[] | undefined
}) => {
  const { chain } = useChainData()

  const { ethereum, account } = useWallet()
  const { usdcBalanceOptimism } = useBalances()
  const [open, setOpen] = useState(false)
  const [mintSymbol, setMintSymbol] = useState<TokenData | undefined>()
  const [slippage, setSlippage] = useState(1.0)
  const [setsToBuy, setSetsToBuy] = useState<any>(null)
  const [usdEstimateForIssue, setUsdEstimateForIssue] =
    useState<BigNumber | null>(null)
  const [componentEstimateForIssue, setComponentEstimateForIssue] = useState<
    BigNumber[] | null
  >(null)
  const [usdEstimate, setUsdEstimate] = useState<any>(null)
  const [componentEstimate, setComponentEstimate] = useState<any>(null)
  const [estimateLoading, setEstimateLoading] = useState<any>(false)
  const cancelButtonRef = useRef(null)
  const sellModalRef = useRef(null)
  const [sellOpen, setSellOpen] = useState(false)
  const { onSetTransactionId, onSetTransactionStatus } = useTransactionWatcher()

  const onApproveSuccess = (txHash: any) => {
    console.log(txHash)
  }

  const { isApproved, isApproving, onApprove } = useApproval(
    props.setAsset.mintAsset,
    perpFlashIssuanceContractAddress,
    onApproveSuccess
  )

  useEffect(() => {
    setMintSymbol(getMintTokenFromTokenList())
  }, [props.setAsset.mintAsset])

  useEffect(() => {
    setUsdEstimate(null)
    setComponentEstimate(null)
    setUsdEstimateForIssue(null)
    setComponentEstimateForIssue(null)
    calculateUsdEstimate()
  }, [setsToBuy, slippage])

  const calculateUsdEstimate = useDebouncedCallback(async () => {
    if (
      setsToBuy !== null &&
      setsToBuy !== undefined &&
      setsToBuy !== '' &&
      setsToBuy !== 0
    ) {
      setEstimateLoading(true)
      const web3 = new Web3(ethereum as provider)
      try {
        const perpIssuanceContract = new web3.eth.Contract(
          perpFlashIssuanceAbi as unknown as AbiItem,
          perpFlashIssuanceContractAddress
        )

        const estimate = await perpIssuanceContract.methods
          .getUsdcAmountInForFixedSetOffChain(
            props.setAsset.optimismAddress,
            new BigNumber(setsToBuy * Math.pow(10, 18)).toString()
          )
          .call()

        setComponentEstimateForIssue(
          estimate.usdcAmountInForComponentSets.map((x: any) =>
            new BigNumber(x * (slippage / 100 + 1))
              .decimalPlaces(0, BigNumber.ROUND_UP)
              .toString()
          )
        )

        setUsdEstimateForIssue(
          new BigNumber(
            estimate.totalUsdcAmountIn * (slippage / 100 + 1)
          ).decimalPlaces(0, BigNumber.ROUND_UP)
        )

        setUsdEstimate(
          Math.round(
            (new BigNumber(estimate.totalUsdcAmountIn * (slippage / 100 + 1))
              .decimalPlaces(2, BigNumber.ROUND_UP)
              .toNumber() /
              Math.pow(10, 6) +
              Number.EPSILON) *
              100
          ) / 100
        )

        setComponentEstimate(
          estimate.usdcAmountInForComponentSets.map(
            (x: any) =>
              Math.round(
                (new BigNumber(x * (slippage / 100 + 1))
                  .decimalPlaces(2, BigNumber.ROUND_UP)
                  .toNumber() /
                  Math.pow(10, 6) +
                  Number.EPSILON) *
                  100
              ) / 100
          )
        )

        setEstimateLoading(false)
      } catch (error) {
        toast.error(
          `Error estimating the ${mintSymbol?.symbol} required for purchase`,
          {
            toastId: 'mint-asset-estimate-warning',
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        )
        setEstimateLoading(false)
      }
    }
  }, 1000)

  const getMintTokenFromTokenList = (): TokenData | undefined => {
    const tokenList = getTokenList(chain.chainId)
    return tokenList.find((asset) => asset.address === props.setAsset.mintAsset)
  }

  const setModalOpen = () => {
    if (!usdcBalanceOptimism || !usdEstimateForIssue) {
      toast.error('No estimate generated for transaction', {
        toastId: 'usdc-estimate-warning',
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }
    if (usdcBalanceOptimism.lt(usdEstimateForIssue)) {
      toast.error(`You do not have enough ${mintSymbol?.symbol}`, {
        toastId: 'usdc-balance-warning',
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    setOpen(true)
  }

  const issueHandler = async () => {
    if (!usdcBalanceOptimism || !usdEstimateForIssue) return
    if (usdcBalanceOptimism.lt(usdEstimateForIssue)) return

    const web3 = new Web3(ethereum)
    try {
      if (!isApproved) {
        const tx = onApprove()
        await tx
      } else {
        const perpIssuanceContract = new web3.eth.Contract(
          perpFlashIssuanceAbi as unknown as AbiItem,
          perpFlashIssuanceContractAddress
        )
        const issueArgs = [
          props.setAsset.optimismAddress,
          new BigNumber(setsToBuy * Math.pow(10, 18)).toString(),
          componentEstimateForIssue,
          usdEstimateForIssue.toString(),
        ]

        let gasLimit = await perpIssuanceContract.methods
          .issueFixedSetFromUsdc(...issueArgs)
          .estimateGas({
            from: account,
            gasPrice: 15000000,
          })

        let tx = await new Promise<string | null>((resolve, _) => {
          perpIssuanceContract.methods
            .issueFixedSetFromUsdc(...issueArgs)
            .send({ from: account, gas: gasLimit, gasPrice: 15000000 })
            .on('transactionHash', (txId: string) => {
              if (!txId) resolve(null)
              onSetTransactionId(txId)
              onSetTransactionStatus(TransactionStatusType.IS_PENDING)
              setOpen(false)
              return resolve(txId)
            })
            .on('error', (error: any) => {
              onSetTransactionStatus(TransactionStatusType.IS_FAILED)
              setOpen(false)
              return resolve(null)
            })
        })
        if (tx) {
          const status = await waitTransaction(ethereum, tx as string)
          if (!status) {
            console.log('failed status', tx)
            onSetTransactionStatus(TransactionStatusType.IS_FAILED)
          } else {
            onSetTransactionStatus(TransactionStatusType.IS_COMPLETED)
          }
        } else {
          console.log('failed', tx)
          onSetTransactionStatus(TransactionStatusType.IS_FAILED)
        }
      }
    } catch (e) {
      console.log(e)
      // There is a problem here where any error that gets triggered will make it seem like
      // the transaction failed. For example, the wallet continually polls the chain but fails
      // to make the network request. The transaction may not have failed, but it would have
      // triggered this error state.
      onSetTransactionStatus(TransactionStatusType.IS_FAILED)
      toast.error('Flash issuance transaction failed', {
        toastId: 'flash-issuance-warning',
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      setOpen(false)
    }
  }

  return (
    <div
      className='border-t border-b border-gray-500 py-4'
      data-cy='mint-redeem-selector'
    >
      <StyledBuySellCardContent>
        <div className='mt-1 sm:mt-0 sm:col-span-2'>
          <p className='text-gray-200 text-xs flex font-medium uppercase tracking-wide'>
            {slippage.toFixed(2)}% Slippage
            <button
              type='button'
              onClick={() => {
                if (slippage > 0) {
                  setSlippage(slippage - 0.25)
                }
              }}
              className='relative inline-flex items-center px-1.5 ml-3 -translate-y-1 py-1 justify-left rounded-l-full border border-gray-300 bg-gray-700 text-xs font-medium text-white hover:bg-gray-400 focus:z-10 focus:outline-none focus:ring-gray-500 focus:border-indigo-500'
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-3 w-3' aria-hidden='true' />
            </button>
            <button
              type='button'
              onClick={() => setSlippage(slippage + 0.25)}
              className='-ml-px relative inline-flex items-center justify-left mr-4 -translate-y-1 px-1.5 py-1 rounded-r-full border border-gray-300 bg-gray-700 text-xs font-medium text-white hover:bg-gray-400 focus:z-10 focus:outline-none focus:ring-gray-500 focus:border-indigo-500'
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-3 w-3' aria-hidden='true' />
            </button>
            <span className='ml-auto  flex '></span>
            <span className='text-gray-200 ml-3 ml-auto justify-right text-xs font-medium uppercase tracking-wide'>
              Balance:{' '}
              {chain.chainId === OPTIMISM_CHAIN_DATA.chainId
                ? `${
                    usdcBalanceOptimism &&
                    Math.round(
                      (usdcBalanceOptimism
                        .decimalPlaces(2, BigNumber.ROUND_DOWN)
                        .toNumber() /
                        Math.pow(10, 6) +
                        Number.EPSILON) *
                        100
                    ) / 100
                  } ${getMintTokenFromTokenList()?.symbol}`
                : ''}
            </span>
          </p>

          <div className='flex items-center'>
            <div className='mx-auto text-center'>
              <div>
                <div className='mt-1 flex shadow-sm'>
                  <div className='relative flex items-stretch flex-grow focus-within:z-10'>
                    <input
                      type='number'
                      name='quantity'
                      id='quantity'
                      onChange={(e) => setSetsToBuy(e.target.value)}
                      placeholder={`${props.setAsset.symbol} Amount`}
                      className=' pl-3 py-3 text-md flex-1 block w-full text-white border-2 bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500min-w-0 rounded-l-full border-indigo-400'
                    />
                  </div>
                  <button
                    type='button'
                    onClick={setModalOpen}
                    disabled={
                      estimateLoading ||
                      setsToBuy === null ||
                      setsToBuy === undefined ||
                      setsToBuy === '' ||
                      setsToBuy === 0 ||
                      fromWei(new BigNumber(usdEstimate), 6).eq(
                        new BigNumber(0)
                      ) ||
                      usdEstimate === 0 ||
                      usdEstimate === null
                    }
                    className={
                      classNames(
                        estimateLoading
                          ? 'animate-pulse bg-gray-600 border-gray-600 '
                          : 'bg-indigo-400 border-indigo-400 '
                      ) +
                      '-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border  text-md font-medium rounded-r-full text-white  hover:bg-indigo-600 focus:outline-none focus:ring-1 focus:ring-indigo-600 focus:border-indigo-600'
                    }
                  >
                    <span>Buy</span>
                  </button>
                </div>
              </div>
            </div>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 ml-3'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z'
                clipRule='evenodd'
              />
            </svg>

            <div className='flex -space-x-2 ml-3 overflow-hidden'>
              {props.componentLogos?.map((logo, index) => (
                <img
                  key={index}
                  className={
                    classNames(estimateLoading ? 'animate-pulse ' : ' ') +
                    'inline-block  h-10 w-10 border-2 border-white  rounded-full'
                  }
                  src={logo}
                  alt=''
                />
              ))}
            </div>
            <div>
              <div className='mt-1 flex rounded-md shadow-sm'>
                <span className='ml-4 pl-3 pr-3 py-3 w-full text-md flex-1 block  text-white border focus:ring-gray-500 focus:border-gray-500 min-w-0 rounded-full border-gray-500'>
                  {usdEstimate ? (
                    <span className='px-10'>{usdEstimate}</span>
                  ) : (
                    <span className='px-10 text-gray-300'>...</span>
                  )}
                </span>
              </div>
            </div>

            <span className='h-12 w-12 ml-4 rounded-full overflow-hidde'>
              <img
                className='inline-block h-12 w-12 border-2 border-white rounded-full'
                src={getMintTokenFromTokenList()?.logoURI}
                alt=''
              />
            </span>

            <button
              type='button'
              onClick={() => setSellOpen(true)}
              className='inline-flex items-center p-1 ml-4 border border-transparent rounded-full shadow-sm text-gray-600 bg-gray-100 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:text-white focus:ring-gray-500'
            >
              <SwitchHorizontalIcon className='h-4 w-4' aria-hidden='true' />
            </button>
          </div>
        </div>
      </StyledBuySellCardContent>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block align-bottom bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
                <div>
                  <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100'>
                    <img
                      className='inline-block h-12 w-12 border-2 border-white rounded-full'
                      src={props.setAsset.image}
                      alt=''
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-md leading-6 font-medium text-white'
                    >
                      Review Transaction
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-200'>
                        You are about to exchange{' '}
                        <span className='font-semibold text-blue-300'>
                          {Math.round((usdEstimate + Number.EPSILON) * 100) /
                            100}{' '}
                          {mintSymbol?.symbol}{' '}
                        </span>{' '}
                        for{' '}
                        <span className='font-semibold text-indigo-300'>
                          {setsToBuy} {props.setAsset.symbol}
                        </span>{' '}
                        with a{' '}
                        <span className='font-semibold text-orange-300'>
                          {slippage.toFixed(2)}%
                        </span>{' '}
                        slippage tolerance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    disabled={isApproving}
                    className={
                      classNames(
                        isApproving
                          ? 'animate-pulse bg-gray-400 ring-gray-500 '
                          : 'hover:bg-indigo-400 focus:ring-indigo-500 '
                      ) +
                      'w-full inline-flex justify-center rounded-full border-2 border-indigo-400 shadow-sm px-4 py-2 bg-transparent text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm'
                    }
                    onClick={issueHandler}
                  >
                    {isApproved
                      ? 'Confirm Transaction'
                      : isApproving
                      ? 'Approving ' + mintSymbol?.symbol
                      : 'Approve ' + mintSymbol?.symbol}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      <Transition.Root show={sellOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed z-10 inset-0 overflow-y-auto'
          initialFocus={sellModalRef}
          onClose={setSellOpen}
        >
          {' '}
          <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block align-bottom bg-gray-700 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6'>
                <div>
                  <div className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100'>
                    <img
                      className='inline-block h-12 w-12 border-2 border-white rounded-full'
                      src={props.setAsset.image}
                      alt=''
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-md leading-6 font-medium text-white'
                    >
                      Sell / Redeem {props.setAsset.symbol}
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-200'>
                        Decentralised exchanges can be used to sell{' '}
                        {props.setAsset.symbol} when there is sufficient
                        liquidity. Otherwise, you can always redeem your Set on
                        TokenSets for the underlying components at NAV.
                      </p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  {props.setAsset.exchangeLink && (
                    <a
                      target='_blank'
                      rel='noreferrer'
                      className={
                        classNames(
                          isApproving
                            ? 'animate-pulse bg-gray-400 ring-gray-500 '
                            : 'hover:bg-indigo-400 focus:ring-indigo-500 '
                        ) +
                        'w-full inline-flex justify-center rounded-full border-2 mb-2 border-indigo-400 shadow-sm px-4 py-2 bg-transparent text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm'
                      }
                      href={props.setAsset.exchangeLink}
                    >
                      DEX Swap
                    </a>
                  )}
                  {props.setAsset.tokensetsLink && (
                    <a
                      target='_blank'
                      rel='noreferrer'
                      className={
                        classNames(
                          isApproving
                            ? 'animate-pulse bg-gray-400 ring-gray-500 '
                            : 'hover:bg-indigo-400 focus:ring-indigo-500 '
                        ) +
                        'w-full inline-flex justify-center rounded-full border-2 border-indigo-400 shadow-sm px-4 py-2 bg-transparent text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm'
                      }
                      href={props.setAsset.tokensetsLink}
                    >
                      TokenSets
                    </a>
                  )}
                  <button
                    type='button'
                    className={
                      'w-full inline-flex justify-center mt-3 rounded-full shadow-sm px-4 py-2 bg-transparent text-base font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:col-start-2 sm:text-sm hover:bg-indigo-400 focus:ring-indigo-500 '
                    }
                    onClick={() => setSellOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

const StyledBuySellCard = styled.div``

const StyledBuySellCardContent = styled.div`
  display: flex;
  align-items: center;
`

export default BuySellWidget
