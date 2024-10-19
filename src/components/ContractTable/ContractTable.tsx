import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export interface OptionData {
  call: number | null;
  strike: number;
  put: number | null;
}

interface ContractTableProps {
  data: OptionData[];
}

const Cell: React.FC<ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    className={twMerge(
      "flex-1 border-b text-grayInk grid text-sm place-items-center border-gray border-r",
      className && className
    )}
    {...props}
  />
);

const ContractTable: React.FC<ContractTableProps> = ({ data }) => {
  console.log(data)
  return (
    <div className="overflow-overlay overflow-x-hidden h-[70vh] w-full">
      <div className="bg-lightGray sticky top-0 z-10 flex h-[34px] border-b border-gray">
        <Cell>Call Price</Cell>
        <Cell>Strike Price</Cell>
        <Cell>Put Price</Cell>
      </div>
      <div>
        {data?.map((row, index) => (
          <div key={index} className="flex h-[40px] border-b border-gray">
            <Cell className="bg-yellow">{row.call}</Cell>
            <Cell>{row.strike}</Cell>
            <Cell>{row.put}</Cell>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContractTable;
