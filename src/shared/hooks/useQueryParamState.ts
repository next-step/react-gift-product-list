import { useSearchParams } from "react-router-dom";

export const useQueryParamState = <T extends string = string>(
    key: string,
    defaultValue?: T,
): [T | null, (newValue: T) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const paramValue = searchParams.get(key);

    // 타입가드 함수: paramValue가 T 타입에 해당하는지 확인
    const isValidValue = (value: unknown): value is T => {
        if (typeof defaultValue === "string") return typeof value === "string";
        return true;
    };

    const currentValue = isValidValue(paramValue) ? (paramValue as T) : (defaultValue ?? null);

    const setValue = (newValue: T) => {
        const newParams = new URLSearchParams(searchParams);
        if (newValue === defaultValue) {
            newParams.delete(key);
        } else {
            newParams.set(key, newValue);
        }
        setSearchParams(newParams, { replace: true });
    };

    return [currentValue, setValue] as const;
};
