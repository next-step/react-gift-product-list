import { useState } from "react";

import { JSONSerializer } from "@/shared/utils/json";

export type SerializablePrimitive = string | number | boolean | null | undefined;
export type SerializableArray = SerializableValue[];
export type SerializableValue = SerializablePrimitive | SerializableArray | SerializableRecord;
export interface SerializableRecord {
    [key: string]: SerializablePrimitive | SerializableArray | SerializableRecord;
}

/**
 * 로컬 스토리지에 상태를 저장하고 관리하는 훅
 * @param key 로컬 스토리지 키
 * @param initialValue 초기값
 */
export const useLocalStorageState = <T extends SerializableValue>(key: string, initialValue: T) => {
    const [state, _setState] = useState<T>(() => {
        try {
            const stored = localStorage.getItem(key);
            return stored ? JSONSerializer.parse<T>(stored) : initialValue;
        } catch {
            return initialValue;
        }
    });

    const setState = (newValue: T) => {
        try {
            _setState(newValue);
            localStorage.setItem(key, JSONSerializer.stringify(newValue));
        } catch (error) {
            console.warn(`[useLocalStorageState] 로컬 스토리지 저장 실패 : ${key}`, error);
        }
    };

    return [state, setState] as const;
};
