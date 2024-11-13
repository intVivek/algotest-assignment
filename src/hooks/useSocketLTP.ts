import { useEffect, useRef, useState } from "react";
import {  StrikeData } from "./useCombinedOptions";

type LTPData = {
  ba_price: number;
  ba_qty: number;
  bb_price: number;
  bb_qty: number;
  ltp: number;
  timestamp: string;
  token: string;
  vol_in_day: number;
};

type ResponseType = {
  ltp: LTPData[];
};

type Data = { [expiry: string]: StrikeData[] };

const useSocketLTP = (
  data: Data,
  expiry: string,
  bank: string,
  deps: unknown[] = []
) => {
  const socketRef = useRef<WebSocket | null>(null);
  const [liveData, setLiveData] = useState<StrikeData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleIncomingData = (ltpData: LTPData[]) => {
    if (!data[expiry] || !ltpData) return;
    // const updatedData = data[expiry].map((option) => {
    //   const matchingLtp = ltpData.find((ltp) =>
    //     option.option_type === "CE"
    //       ? ltp.token === option.call_token
    //       : ltp.token === option.put_token
    //   );
    //   if (matchingLtp) {
    //     return {
    //       ...option,
    //       call: option.call !== null ? matchingLtp.ltp : option.call,
    //       put: option.put !== null ? matchingLtp.ltp : option.put,
    //     };
    //   }
    //   return option;
    // });

    ltpData.forEach((ltp, i) => {
      const dataToUpdate = data[expiry].find(item => item.call?.token === ltp.token || item.put?.token === ltp.token);
      if (dataToUpdate) {
        if (dataToUpdate.call?.token === ltp.token) {
          dataToUpdate.call.value = ltp.ltp; 
        } else if (dataToUpdate.put?.token === ltp.token) {
          dataToUpdate.put.value = ltp.ltp; 
        }
      }
    
      return dataToUpdate; 
    });
    setLiveData([...data[expiry]]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (!data || !expiry || !bank) return;

    const initWebSocket = () => {
      const ws = new WebSocket("wss://prices.algotest.xyz/mock/updates");
      socketRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connection opened");
        setIsLoading(true);
        const subscriptionMessage = {
          msg: {
            type: "subscribe",
            datatypes: ["ltp"],
            underlyings: [
              {
                underlying: bank,
                cash: true,
                options: [expiry],
              },
            ],
          },
        };
        ws.send(JSON.stringify(subscriptionMessage));
      };

      ws.onmessage = (event) => {
        const responseData: ResponseType = JSON.parse(event.data);
        handleIncomingData(responseData.ltp);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsLoading(false);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        setIsLoading(false);
      };
    };

    if (socketRef.current) {
      socketRef.current.close();
    }

    initWebSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
    /* eslint-enable react-hooks/exhaustive-deps */
  }, [data, expiry, bank, ...deps]);

  return { liveData, isLoading };
};

export default useSocketLTP;
