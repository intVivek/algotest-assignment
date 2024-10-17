import ContractTable, {
  OptionData,
} from "@/components/ContractTable/ContractTable";

export default function Home() {
  return (
    <div className="app grid place-items-center">
      <ContractTable data={sampleData} />
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
