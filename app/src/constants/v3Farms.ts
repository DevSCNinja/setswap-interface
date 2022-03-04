export interface V3Farm {
  tokenPair: string
  pool: string
  poolLabel: string
  img: {
    alt: string
    src: string
  }
  farms: FarmData[]
}

export interface FarmData {
  rewardToken: string
  pool: string
  startTime: number
  endTime: number
  refundee: string
  dateText: string
  img: {
    alt: string
    src: string
  }
}

const farms: V3Farm[] = []

export default farms
