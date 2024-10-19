import { CombinedOptions } from "@/hooks/useCombinedOptions";
import roundToTwoDecimals from "@/utils/roundToTwoDecimals";
import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface ContractTableProps {
  loading: boolean;
  data: CombinedOptions[];
}

const Cell: React.FC<ComponentProps<"div">> = ({ className, ...props }) => (
  <div
    className={twMerge(
      "flex-1 border-b text-grayInk grid text-sm place-items-center bg-white border-gray border-r",
      className && className
    )}
    {...props}
  />
);

const ContractTable: React.FC<ContractTableProps> = ({ loading, data }) => {
  return (
    <div className="overflow-overlay bg-white overflow-x-hidden h-[70vh] w-full">
      <div className="bg-lightGray sticky top-0 z-10 flex h-[34px] border-b border-gray">
        <Cell>Call Price</Cell>
        <Cell>Strike Price</Cell>
        <Cell>Put Price</Cell>
      </div>
      {loading ? (
        <TableSkeletonLoading />
      ) : (
        <div className="bg-white">
          {data?.map((row, index) => (
            <div key={index} className="flex h-[40px] border-b border-gray">
              <Cell className="bg-yellow">{roundToTwoDecimals(row.call)}</Cell>
              <Cell>{row.strike}</Cell>
              <Cell>{roundToTwoDecimals(row.put)}</Cell>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContractTable;

const TableSkeletonLoading = ({ rows = 5 }) => {
  return (
    <div className="w-full h-max bg-white overflow-hidden">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex mx-1 w-full justify-around mt-4 animate-pulse">
          <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
          <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
          <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
        </div>
      ))}
    </div>
  );
};