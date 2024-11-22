import { useEffect, useState } from 'react'

// type SetLocalStorage<T> = React.SetStateAction<T>
export type SetStorage<T> = React.Dispatch<React.SetStateAction<T>>

function useStorage<T>(key: string, value:( T |(() => T) | undefined), storage: Storage) {

    const [data, setData] = useState(()=>{
        const prevData = storage.getItem(key);
        if (prevData !== null) {
            return JSON.parse(prevData) satisfies T;
        }
        if (value === undefined) return;
        const data = (value instanceof Function) ? value() : value;
        storage.setItem(key, JSON.stringify(data))
        return data;
    });

    const clear = () => {
        storage.removeItem(key);
    }
    useEffect(()=> {
        storage.setItem(key, JSON.stringify(data))
    }, [storage, key, data])
    return [data, setData, clear] satisfies [T, SetStorage<T>, () => void]
}

export function useLocalStorage<T = undefined>(key: string):  [T | undefined, SetStorage<T | undefined>, () => void];
export function useLocalStorage<T>(key: string, value: T):  [T, SetStorage<T>, () => void];
export function useLocalStorage<T>(key: string, value?: T) {
    return useStorage(key, value, localStorage)
}

export function useSessionStorage<T>(key: string):  [T | undefined, SetStorage<T | undefined>, () => void];
export function useSessionStorage<T>(key: string, value: T):  [T, SetStorage<T>, () => void];
export function useSessionStorage<T>(key: string, value?: T) {
    return useStorage(key, value, sessionStorage)
}
