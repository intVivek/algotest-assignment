import ContractTable, {
  OptionData,
} from "@/components/ContractTable/ContractTable";
import ExpiryFilter from "@/components/ExpiryFilter/ExpiryFilter";
import useContracts from "@/hooks/useContracts";
import { useEffect, useMemo, useState } from "react";

const bank = "BANKNIFTY";

export default function Contracts() {
  const { data, error, isLoading } = useContracts();

  const [selectedExpiry, setSelectedExpiry] = useState("");

  const expiryDates = useMemo(() => {
    if (!data || !bank) return [];
    return Object.keys(data[bank].OPT);
  }, [data]);

  useEffect(() => {
    if (expiryDates) setSelectedExpiry(expiryDates[0]);
  }, [expiryDates]);

  const contractsData = useMemo(() => {
    if (!data || !selectedExpiry || !bank) return [];
    return data?.[bank]?.OPT?.[selectedExpiry];
  }, [data, selectedExpiry, bank]);

  console.log(contractsData);

  const onClickExpiry = (expiry: string) => {
    setSelectedExpiry(expiry);
  };

  return (
    <div className="w-[95vw] max-w-[700px] rounded-md  border border-gray">
      <ExpiryFilter
        expiryDates={expiryDates}
        onClick={onClickExpiry}
        selectedExpiry={selectedExpiry}
      />
      <ContractTable data={contractsData} />
    </div>
  );
}

const sampleData: OptionData[] = [
  { callPrice: 100, strike: 35000, putPrice: 80 },
  { callPrice: 110, strike: 35200, putPrice: 85 },
  { callPrice: 120, strike: 35400, putPrice: 90 },
  { callPrice: 130, strike: 35600, putPrice: 95 },
  { callPrice: 140, strike: 35800, putPrice: 100 },
  { callPrice: 150, strike: 36000, putPrice: 105 },
  { callPrice: 160, strike: 36200, putPrice: 110 },
  { callPrice: 170, strike: 36400, putPrice: 115 },
  { callPrice: 180, strike: 36600, putPrice: 120 },
  { callPrice: 190, strike: 36800, putPrice: 125 },
  { callPrice: 200, strike: 37000, putPrice: 130 },
  { callPrice: 210, strike: 37200, putPrice: 135 },
  { callPrice: 220, strike: 37400, putPrice: 140 },
  { callPrice: 230, strike: 37600, putPrice: 145 },
  { callPrice: 240, strike: 37800, putPrice: 150 },
  { callPrice: 250, strike: 38000, putPrice: 155 },
  { callPrice: 260, strike: 38200, putPrice: 160 },
  { callPrice: 270, strike: 38400, putPrice: 165 },
  { callPrice: 280, strike: 38600, putPrice: 170 },
  { callPrice: 290, strike: 38800, putPrice: 175 },
  { callPrice: 300, strike: 39000, putPrice: 180 },
  { callPrice: 170, strike: 36400, putPrice: 115 },
  { callPrice: 180, strike: 36600, putPrice: 120 },
  { callPrice: 190, strike: 36800, putPrice: 125 },
  { callPrice: 200, strike: 37000, putPrice: 130 },
  { callPrice: 210, strike: 37200, putPrice: 135 },
  { callPrice: 220, strike: 37400, putPrice: 140 },
  { callPrice: 230, strike: 37600, putPrice: 145 },
  { callPrice: 240, strike: 37800, putPrice: 150 },
  { callPrice: 250, strike: 38000, putPrice: 155 },
  { callPrice: 260, strike: 38200, putPrice: 160 },
  { callPrice: 270, strike: 38400, putPrice: 165 },
  { callPrice: 280, strike: 38600, putPrice: 170 },
  { callPrice: 290, strike: 38800, putPrice: 175 },
  { callPrice: 300, strike: 39000, putPrice: 180 },
];

const expiryDates = [
  "2024-10-20",
  "2024-11-15",
  "2024-12-30",
  "2025-01-25",
  "2025-02-28",
  "2025-03-15",
  "2025-04-10",
  "2025-05-05",
  "2025-06-01",
  "2025-07-20",
  "2025-08-15",
  "2025-09-10",
  "2025-10-01",
  "2025-11-30",
  "2025-12-25",
];

{
  exchange: "NSE";
  expiry: "2025-06-25";
  instrument_type: "OPT";
  is_tradable: true;
  lot_size: 15;
  max_qty_in_order: 900;
  option_type: "CE";
  strike: 57000;
  symbol: "BANKNIFTY25JUN57000CE";
  tick_size: 5;
  token: "NSE_54793";
  underlying: "BANKNIFTY";
}

{
  ba_price: 1575.6;
  ba_qty: 10;
  bb_price: 1544.4;
  bb_qty: 10;
  ltp: 1560;
  timestamp: "2024-10-18T20:13:52.000184";
  token: "NSE_54793";
  vol_in_day: 100;
}