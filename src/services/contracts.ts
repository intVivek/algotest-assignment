export interface ContractsData {
  exchange: string;
  expiry: string;
  instrument_type: string;
  is_tradable: boolean;
  lot_size: number;
  max_qty_in_order: number;
  option_type: 'CE' | 'PE';
  strike: number;
  symbol: string;
  tick_size: number;
  token: string;
  underlying: string;
}

export interface ContractsResponse {
  [bank: string]: {
    OPT: {
      [expiryDate: string]: ContractsData[];
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
