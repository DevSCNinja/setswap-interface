import { useContext } from 'react'

import { MintRedeemContext } from 'contexts/MintRedeem'

const useMintRedeem = () => {
  return { ...useContext(MintRedeemContext) }
}

export default useMintRedeem
