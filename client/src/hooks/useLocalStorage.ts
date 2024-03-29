import React, { useEffect, useState } from "react";

export default function useLocalStorage<Type>(
    key: string,
    initialValue: Type | undefined = undefined
): [Type, React.Dispatch<Type>, () => void] {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    function setValue<Type>(value: Type) {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    }

    function clearValue() {
        try {
            if (typeof window !== "undefined") {
                window.localStorage.removeItem(key);
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    }

    return [storedValue, setValue, clearValue];
}
