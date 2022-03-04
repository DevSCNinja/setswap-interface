import BigNumber from 'utils/bignumber'

export interface ContextValues {
  ethBalance?: BigNumber
  daiBalance?: BigNumber
  usdcBalance?: BigNumber

  // polygon
  wethBalancePolygon?: BigNumber
  daiBalancePolygon?: BigNumber
  usdcBalancePolygon?: BigNumber

  // Optimism
  ethBalanceOptimism?: BigNumber
  usdcBalanceOptimism?: BigNumber
  solunavaxBalanceOptimism?: BigNumber
  sol1xBalanceOptimism?: BigNumber
  luna1xBalanceOptimism?: BigNumber
  avax1xBalanceOptimism?: BigNumber

  // Arbitrum
  dblBalanceArbitrum?: BigNumber

  // LP Tokens

  // For Legacy LM Program

  // For Current LM Program
}
