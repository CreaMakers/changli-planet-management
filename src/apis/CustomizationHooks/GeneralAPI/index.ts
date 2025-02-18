import {useState} from 'react'

export function useGeneralAPI(){

    const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);

    // 防抖函数
    const debounce = (func: Function, delay: number) => {
        return (...args: any[]) => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        const timeout = setTimeout(() => {
            func(...args);
        }, delay);
        setDebounceTimeout(timeout);
        };
    };
    return {
        debounce
    }
}