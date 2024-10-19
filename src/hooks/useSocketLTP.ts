import { useEffect, useRef, useState } from "react";
import { CombinedOptions } from "./useCombinedOptions";

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

type Data = { [expiry: string]: CombinedOptions[] };

const useSocketLTP = (data: Data, expiry: string, bank: string, deps: unknown[] = []) => {
    const socketRef = useRef<WebSocket | null>(null);
    const [liveData, setLiveData] = useState<CombinedOptions[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const handleIncomingData = (ltpData: LTPData[]) => {
        if (!data[expiry] || !ltpData) return;
        const updatedData = data[expiry].map(option => {
            const matchingLtp = ltpData.find(ltp => ltp.token === option.token);
            if (matchingLtp) {
                return {
                    ...option,
                    call: option.call !== null ? matchingLtp.ltp : option.call,
                    put: option.put !== null ? matchingLtp.ltp : option.put,
                };
            }
            return option;
        });
        setLiveData(updatedData);
        setIsLoading(false); // Stop loading as soon as data is set
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
    }, [data, expiry, bank, ...deps]);

    return { liveData, isLoading };
};

export default useSocketLTP;
