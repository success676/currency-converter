import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";

export function useConversionRate({ baseCode, targetCode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [conversionRate, setConversionRate] = useState(null);

    const getConversionRate = useCallback(async () => {
        try {
            setIsLoading(true);
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/${
                    import.meta.env.VITE_API_KEY
                }/pair/${baseCode}/${targetCode}`
            );
            const data = await res.json();
            setConversionRate(data.conversion_rate);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [baseCode, targetCode, setError, setIsLoading]);

    const clearError = () => setError(null);

    useEffect(() => {
        getConversionRate();
    }, [getConversionRate]);

    return {
        conversionRate,
        isLoading,
        error,
        clearError,
    };
}
