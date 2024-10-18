import React, { useRef } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
interface ExpiryFilterProps {
  selectedExpiry: string;
  onClick?: Function;
  expiryDates: string[];
}

const ExpiryFilter: React.FC<ExpiryFilterProps> = ({
  selectedExpiry,
  onClick,
  expiryDates,
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
    <div className="relative bg-lightGray border-b border-gray w-full">
      <div className="flex items-center my-4 justify-between">
        <IoChevronBack
          className="flex-shrink-0 cursor-pointer"
          size={24}
          onClick={scrollLeft}
        />
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
