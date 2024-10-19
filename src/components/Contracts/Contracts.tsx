import { useMemo, useState } from "react";
import ContractTable from "../ContractTable/ContractTable";
import ExpiryFilter from "../ExpiryFilter/ExpiryFilter";
import useCombinedOptions from "@/hooks/useCombinedOptions";

const bank = "BANKNIFTY";

export default function Contracts() {
  const { data, isLoading } = useCombinedOptions(bank);

  const [selectedExpiry, setSelectedExpiry] = useState("");

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
      <ContractTable loading={isLoading} data={data[selectedExpiry]} />
    </div>
  );
}
