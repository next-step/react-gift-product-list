import { useSearchParams } from "react-router-dom";

export const useQueryParamState = <T extends string = string>(
    key: string,
    defaultValue?: T,
): [T | null, (newValue: T) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentValue = (searchParams.get(key) as T) ?? defaultValue ?? null;

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
