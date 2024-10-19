import axios from "axios";

export type ImpliedFutures = {[expiry: string]: number}

export type OptionChainResponse = {
  candle: string;
  underlying: string;
  options: Options;
  implied_futures: ImpliedFutures;
}

export interface Options {
  [expiry: string]: OptionData;
}

export interface OptionData {
  strike: number[];
  call_close: (null | number)[];
  put_close: (null | number)[];
}

const fetchOptionChain = async (): Promise<OptionChainResponse> => {
  const response = await axios.get<OptionChainResponse>(
    "https://prices.algotest.xyz/option-chain-with-ltp?underlying=BANKNIFTY"
  );
  return response.data;
};

export default fetchOptionChain;