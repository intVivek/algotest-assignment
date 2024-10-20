import { useMemo, useState } from "react";
import ContractTable from "../ContractTable/ContractTable";
import ExpiryFilter from "../ExpiryFilter/ExpiryFilter";
import useCombinedOptions from "@/hooks/useCombinedOptions";
import useSocketLTP from "@/hooks/useSocketLTP";

const bank = "BANKNIFTY";

export default function Contracts() {
  const [selectedExpiry, setSelectedExpiry] = useState("");

  const { data, implied_futures, isLoading } = useCombinedOptions(bank);

  const { liveData, isLoading: isLiveDataLoading } = useSocketLTP(
    data,
    selectedExpiry,
    bank
  );

  const expiryDates = useMemo(() => {
    if (!data) return [];
    const expries = Object.keys(data).sort((a, b) => {
      return new Date(a).getTime() - new Date(b).getTime();
    });
    setSelectedExpiry(expries[0]);
    return expries;
  }, [data]);

  return (
    <div className="w-[95vw] max-w-[700px] rounded-md bg-lightGray border border-gray">
      <ExpiryFilter
        expiryDates={expiryDates}
        onClick={(expiry: string) => setSelectedExpiry(expiry)}
        selectedExpiry={selectedExpiry}
        loading={isLoading}
      />
      <div className="flex">
        <ContractTable
          selectedExpiry={selectedExpiry}
          loading={isLoading || isLiveDataLoading}
          data={liveData}
          synthetic_fut={implied_futures?.[selectedExpiry]}
        />
      </div>
    </div>
  );
}
