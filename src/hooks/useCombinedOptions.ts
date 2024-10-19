import { useMemo } from "react";
import useContracts from "./useContracts";
import useOptionChain from "./useOptionChain";
import { OptionData } from "@/services/optionChain";
import { ContractsData } from "@/services/contracts";

export type CombinedOptions = {
  strike: number;
  put: number | null;
  call: number | null;
  token: string;
};

const useCombinedOptions = (bank: string, deps: unknown[]=[]) => {
  const { data: contractsData, isFetching: isContractsLoading } = useContracts();
  const { data: optionChainData, isFetching: isOptionLoading } =
    useOptionChain();

  const combinedOptions = useMemo(() => {
    const result: { [expiry: string]: CombinedOptions[] } = {};

    if (!contractsData || !optionChainData) return result;

    const expiries = Object.keys(contractsData[bank]?.OPT || {});

    expiries.forEach((expiry) => {
      const contracts = contractsData[bank].OPT[expiry] || [];
      const options: OptionData = optionChainData.options[expiry];

      const expiryDataMap: { [strike: number]: CombinedOptions } = {};

      contracts.forEach((contract: ContractsData) => {
        const strike = contract.strike;
        const callIndex = options?.strike.indexOf(strike);
        const putIndex = options?.strike.indexOf(strike);

        const callClose =
          callIndex !== -1 ? options?.call_close[callIndex] : null;
        const putClose = putIndex !== -1 ? options?.put_close[putIndex] : null;

        if (expiryDataMap[strike]) {
          if (callClose !== null) {
            expiryDataMap[strike].call = callClose;
          }
          if (putClose !== null) {
            expiryDataMap[strike].put = putClose;
          }
        } else {
          expiryDataMap[strike] = {
            strike,
            call: callClose,
            put: putClose,
            token: contract.token,
          };
        }
      });

      const expiryData = Object.values(expiryDataMap).sort(
        (a, b) => a.strike - b.strike
      );

      if (expiryData.length > 0) {
        result[expiry] = expiryData;
      }
    });

    return result;
  }, [contractsData, optionChainData, bank, ...deps]);

  return {
    data: combinedOptions,
    implied_futures: optionChainData?.implied_futures,
    isLoading: isContractsLoading || isOptionLoading,
  };
};

export default useCombinedOptions;
