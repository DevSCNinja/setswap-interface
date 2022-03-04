import { createContext } from 'react'

import { SolunavaxIndex } from 'constants/productTokens'

interface StreamingFeeProps {
  solunavaxStreamingFee?: string
}

const StreamingFee = createContext<StreamingFeeProps>({
  solunavaxStreamingFee: SolunavaxIndex.fees?.streamingFee,
})

export default StreamingFee
