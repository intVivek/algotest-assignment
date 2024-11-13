import { useMemo, useState } from "react";
import ContractTable from "../ContractTable/ContractTable";
import ExpiryFilter from "../ExpiryFilter/ExpiryFilter";
import useCombinedOptions, { StrikeData } from "@/hooks/useCombinedOptions";
import useSocketLTP from "@/hooks/useSocketLTP";

const bank = "BANKNIFTY";

export type PositionsType = {
  orderType: string;
  instrumentType: string;
  token?: string;
  row?: StrikeData;
};

export default function Contracts() {
  const [selectedExpiry, setSelectedExpiry] = useState("");
  const [positions, setPositions] = useState<{[token: string]: PositionsType}>({});

  const { data, implied_futures, isLoading } = useCombinedOptions(
    bank,
  );

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
    <div className="flex">
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
          data={liveData || []}
          synthetic_fut={implied_futures?.[selectedExpiry]}
          setPositions={setPositions}
          positions={positions}
        />
      </div>
    </div>
<div className="flex flex-col ml-4">    {Object.values(positions).map((position, i)=>{
      return <div key={i}>{JSON.stringify(position)}</div>}
      )}</div>
    </div>
  );
}
