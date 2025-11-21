export interface CoinProps {
  changePercent24Hr: string;
  explorer: string;
  id: string;
  marketCapUsd: string;
  maxSupply: string;
  name: string;
  priceUsd: string;
  rank: string;
  supply: string;
  symbol: string;
  tokens: string;
  volumeUsd24Hr: string;
  vwap24Hr: string;
  formatedPrice?: string;
  formatedMarked?: string;
  formatedUsd24h?: string;
}

export interface DataProps {
  data: CoinProps[];
}