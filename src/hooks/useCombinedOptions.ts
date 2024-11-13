import { useMemo } from "react";
import useContracts from "./useContracts";
import useOptionChain from "./useOptionChain";
import { OptionData } from "@/services/optionChain";
import { ContractsData } from "@/services/contracts";

export type mergedContracts = {
  [strike: number]: StrikeData;
};

type Options = {
  token: string;
  symbol: string;
  value?: number;
};

export type StrikeData = {
  exchange: string;
  expiry: string;
  strike: number;
  instrument_type: string;
  call?: Options;
  put?: Options;
};

const useCombinedOptions = (bank: string, deps: unknown[] = []) => {
  const { data: contractsData, isFetching: isContractsLoading } =
    useContracts();
  const { data: optionChainData, isFetching: isOptionLoading } =
    useOptionChain();

  const combinedOptions = useMemo(() => {
    const result: { [expiry: string]: StrikeData[] } = {};

    if (!contractsData || !optionChainData) return result;

    const expiries = Object.keys(contractsData[bank]?.OPT || {});

    expiries.forEach((expiry) => {
      const contracts = contractsData[bank].OPT[expiry] || [];
      const options: OptionData = optionChainData.options[expiry];

      const mergedContracts = contracts.reduce<mergedContracts>((acc, crr) => {
        const {
          strike,
          option_type,
          token,
          symbol,
        } = crr;

        const optionSide = option_type === "CE" ? "call" : "put";

        if (!acc[strike]) {
          acc[strike] = {
            strike: strike,
            exchange: crr.exchange,
            expiry: crr.expiry,
            instrument_type: crr.instrument_type,
          };
        }

        acc[strike][optionSide] = {
          token,
          symbol,
        };

        return acc;
      }, {});

      options?.strike?.forEach((strike, i) => {
        if(mergedContracts && mergedContracts[strike] && mergedContracts[strike].call && mergedContracts[strike].put){
          mergedContracts[strike].call.value = options?.call_close?.[i]
          mergedContracts[strike].put.value = options?.put_close[i]
        }
     });

      const expiryData = Object.values(mergedContracts).sort(
        (a, b) => a.strike - b.strike
      );

      if (expiryData.length > 0) {
        result[expiry] = expiryData;
      }
    });

    return result;
    /* eslint-enable react-hooks/exhaustive-deps */
  }, [contractsData, optionChainData, bank, ...deps]);

  return {
    data: combinedOptions,
    implied_futures: optionChainData?.implied_futures,
    isLoading: isContractsLoading || isOptionLoading,
  };
};

export default useCombinedOptions;
