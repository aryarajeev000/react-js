
import { useEffect, useState } from "react";

function useCurrencyInfo(currency) {
    const [data, setData] = useState(null); // Initialize to null or any appropriate default

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/${currency}.json`);
                const json = await res.json();
                setData(json[currency]);
            } catch (error) {
                console.error("Error fetching currency data:", error);
            }
        };

        fetchData();
    }, [currency]);

    return data;
}

export default useCurrencyInfo;
