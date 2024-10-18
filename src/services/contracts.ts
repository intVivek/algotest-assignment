export interface OptionData {
  exchange: string;
  expiry: string;
  instrument_type: string;
  is_tradable: boolean;
  lot_size: number;
  max_qty_in_order: number;
  option_type: string; // CE or PE
  strike: number;
  symbol: string;
  tick_size: number;
  token: string;
  underlying: string;
}

export interface ContractsResponse {
  [bank: string]: {
    OPT: {
      [expiryDate: string]: OptionData[];
    };
  };
}

import axios from "axios";

const fetchContracts = async (): Promise<ContractsResponse> => {
  const response = await axios.get<ContractsResponse>(
    "https://prices.algotest.xyz/contracts"
  );
  return response.data;
};

export default fetchContracts;
