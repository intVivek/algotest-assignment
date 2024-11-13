import { StrikeData } from "@/hooks/useCombinedOptions";
import roundToTwoDecimals from "@/utils/roundToTwoDecimals";
import React, { ComponentProps, useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { PositionsType } from "../Contracts/Contracts";

interface ContractTableProps {
  loading: boolean;
  data: StrikeData[];
  synthetic_fut?: number;
  selectedExpiry: string;
  setPositions: Function;
  positions: { [token: string]: PositionsType };
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

const ContractTable: React.FC<ContractTableProps> = ({
  loading,
  data,
  synthetic_fut = NaN,
  setPositions,
  positions,
}) => {
  const syntheticFutRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!synthetic_fut || loading) return;

    const timeoutId = setTimeout(() => {
      if (syntheticFutRef.current) {
        syntheticFutRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [synthetic_fut, loading]);

  const handleOrderExcecution = (
    orderType: string,
    instrumentType: string,
    token: string,
    row: Partial<StrikeData>
  ) => {
    setPositions((p: { [token: string]: PositionsType }) => {
      const newPositions = { ...p };
    
      if (!newPositions[token]) {
        newPositions[token] = { orderType, instrumentType, token, ...row};
      } else if (newPositions[token].orderType === orderType) {
        delete newPositions[token];
      } else {
        newPositions[token] = { orderType, instrumentType, token, ...row};
      }
      return newPositions;
    });
    
  };

  return (
    <div className="overflow-overlay bg-white overflow-x-hidden h-[70vh] w-full">
      <div className="bg-lightGray sticky top-0 z-10 flex h-[34px] border-b border-gray">
        <Cell>Call Price</Cell>
        <Cell>Lots</Cell>
        <Cell>Strike Price</Cell>
        <Cell>Lots</Cell>
        <Cell>Put Price</Cell>
      </div>
      {loading ? (
        <TableSkeletonLoading />
      ) : (
        <div className="bg-white">
          {data?.map((row, index) => {
            const isCallHighlighted = row.strike < synthetic_fut;
            const isPutHighlighted = row.strike > synthetic_fut;

            const showSyntheticFut =
              isCallHighlighted &&
              (!data[index + 1] || data[index + 1].strike >= synthetic_fut);

              const callToken = row?.call?.token||'';
              const putToken = row?.put?.token||'';

              const isCallBuy = positions?.[callToken]?.token ===callToken && positions?.[callToken].orderType === "buy";
              const isCallSell =positions?.[callToken]?.token ===callToken && positions?.[callToken].orderType === "sell";
              const isPutBuy = positions?.[putToken]?.token ===putToken && positions?.[putToken].orderType === "buy";
              const isPutSell =positions?.[putToken]?.token ===putToken && positions?.[putToken].orderType === "sell";

            return (
              <React.Fragment key={index}>
                <div
                  className={twMerge(
                    "flex h-[40px] border-b border-gray",
                    showSyntheticFut && "bg-lightBlue"
                  )}
                >
                  <Cell
                    className={
                      isCallHighlighted && !showSyntheticFut ? "bg-yellow" : ""
                    }
                  >
                    {roundToTwoDecimals(row.call?.value || 0)}
                  </Cell>
                  <Cell className="flex gap-2 items-center justify-center">
                    <button
                      className={twMerge(
                        "size-6 rounded-md border border-gray",
                        isCallBuy&&
                          "bg-green-700"
                      )}
                      onClick={() =>
                        handleOrderExcecution(
                          "buy",
                          "call",
                          row.call?.token || "",
                          {exchange: row.exchange},
                        )
                      }
                    >
                      B
                    </button>
                    <button
                      className={twMerge(
                        "size-6 rounded-md border border-gray",
                        isCallSell &&
                        "bg-red-700"
                      )}
                      onClick={() =>
                        handleOrderExcecution(
                          "sell",
                          "call",
                          row.call?.token || "",
                          {exchange: row.exchange},
                        )
                      }
                    >
                      S
                    </button>
                  </Cell>
                  <Cell>{row.strike}</Cell>
                  <Cell className="flex gap-2 items-center justify-center">
                    <button
                      className={twMerge(
                        "size-6 rounded-md border border-gray",
                        isPutBuy &&"bg-green-800"
                      )}
                      onClick={() =>
                        handleOrderExcecution(
                          "buy",
                          "put",
                          row.put?.token || "",
                          {exchange: row.exchange},
                        )
                      }
                    >
                      B
                    </button>
                    <button
                      className={twMerge(
                        "size-6 rounded-md border border-gray",
                        isPutSell && "bg-red-800"
                      )}
                      onClick={() =>
                        handleOrderExcecution(
                          "sell",
                          "put",
                          row.put?.token || "",
                          {exchange: row.exchange},
                        )
                      }
                    >
                      S
                    </button>
                  </Cell>
                  <Cell className={isPutHighlighted ? "bg-yellow" : ""}>
                    {roundToTwoDecimals(row.put?.value || 0)}
                  </Cell>
                </div>

                {showSyntheticFut && (
                  <div
                    ref={syntheticFutRef}
                    className="flex relative bg-blueInk h-[1px] -translate-y-[1px] justify-center"
                  >
                    <div className="text-blueInk border border-blueInk bg-white rounded-full px-3 py-1 text-xs font-bold absolute -translate-y-1/2">
                      Synthetic FUT {synthetic_fut.toFixed(2)}
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
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
        <div
          key={index}
          className="flex mx-1 w-full justify-around mt-4 animate-pulse"
        >
          <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
          <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
          <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
        </div>
      ))}
    </div>
  );
};
