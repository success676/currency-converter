import { useEffect, useState } from "react";
import {
    DEFAULT_BASE_CODE,
    DEFAULT_TARGET_CODE,
    DEFAULT_BASE_VALUE,
    DEFAULT_TARGET_VALUE,
    DEFAULT_TO_FIXED,
} from "./constants";
import { useConversionRate } from "./hooks/useConversionRate";
import Spinner from "./components/spinner/Spinner";
import Error from "./components/error/Error";
import CurrencyRow from "./components/currency-row/CurrencyRow";

function App() {
    const [baseCode, setBaseCode] = useState(DEFAULT_BASE_CODE);
    const [targetCode, setTargetCode] = useState(DEFAULT_TARGET_CODE);
    const [baseValue, setBaseValue] = useState(DEFAULT_BASE_VALUE);
    const [targetValue, setTargetValue] = useState(DEFAULT_TARGET_VALUE);

    const { conversionRate, isLoading, error, clearError } = useConversionRate({
        baseCode,
        targetCode,
    });

    const onBaseValueChange = (e) => {
        const value = Number(e.target.value);
        setBaseValue(value);
        const targetValue =
            value && conversionRate
                ? (value * conversionRate).toFixed(DEFAULT_TO_FIXED)
                : null;
        setTargetValue(targetValue);
    };

    const onTargetValueChange = (e) => {
        const value = Number(e.target.value);
        setTargetValue(value);
        const baseValue =
            value && conversionRate
                ? (value / conversionRate).toFixed(DEFAULT_TO_FIXED)
                : null;
        setBaseValue(baseValue);
    };

    const setDefaultValues = () => {
        setBaseValue(DEFAULT_BASE_VALUE);
        setTargetValue(DEFAULT_TARGET_VALUE);
    };

    const onBaseCodeChange = (value) => {
        setDefaultValues();
        setBaseCode(value);
    };

    const onTargetCodeChange = (value) => {
        setDefaultValues();
        setTargetCode(value);
    };

    useEffect(() => {
        if (conversionRate) {
            setTargetValue(
                (baseValue * conversionRate).toFixed(DEFAULT_TO_FIXED)
            );
        }
    }, [conversionRate]);

    return (
        <>
            {isLoading && <Spinner />}
            {error && <Error descriprion={error} onClose={clearError} />}

            <div className="container">
                <h1>Конвертер валют</h1>
                <CurrencyRow
                    hasMargin
                    inputValue={baseValue}
                    inputDisabled={isLoading}
                    selectValue={baseCode}
                    onInputChange={onBaseValueChange}
                    onSelectChange={onBaseCodeChange}
                />
                <CurrencyRow
                    inputValue={targetValue}
                    inputDisabled={isLoading}
                    selectValue={targetCode}
                    onInputChange={onTargetValueChange}
                    onSelectChange={onTargetCodeChange}
                />
            </div>
        </>
    );
}

export default App;
