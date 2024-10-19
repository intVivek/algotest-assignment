import React, { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
interface ExpiryFilterProps {
  selectedExpiry: string;
  onClick?: (date: string)=>void;
  expiryDates: string[];
  loading: boolean;
}

const ExpiryFilter: React.FC<ExpiryFilterProps> = ({
  selectedExpiry,
  onClick,
  expiryDates,
  loading,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <div className="relative h-max  border-b border-gray w-full">
      <div className="flex items-center my-4 justify-between">
        <IoChevronBack
          className="flex-shrink-0 cursor-pointer"
          size={24}
          onClick={scrollLeft}
        />
        {loading ? (
          <ExpiryFilterSkeleton />
        ) : (
          <div
            ref={scrollRef}
            className="overflow-hidden whitespace-nowrap flex mx-1 space-x-4 w-full"
            style={{ maxWidth: "100%" }}
          >
            {expiryDates.map((date, index) => (
              <div
                key={index}
                className={twMerge(
                  "text-grayInk cursor-pointer select-none py-1 px-[6px] rounded-md",
                  selectedExpiry === date && "bg-lightBlue  text-blue"
                )}
                onClick={() => onClick && onClick(date)}
              >
                <h2 className="text-sm font-bold =">{date}</h2>
              </div>
            ))}
          </div>
        )}
        <IoChevronForward
          className="flex-shrink-0 cursor-pointer"
          size={24}
          onClick={scrollRight}
        />
      </div>
    </div>
  );
};

export default ExpiryFilter;

const ExpiryFilterSkeleton = () => {
  return (
    <div className="flex mx-1 space-x-4 w-full animate-pulse overflow-hidden">
      <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
      <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
      <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
      <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
      <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
      <div className="w-[90px] flex-shrink-0 h-[26px] bg-graySkeleton rounded"></div>
    </div>
  );
};
