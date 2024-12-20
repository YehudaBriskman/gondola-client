import { z } from "zod"

export enum LocalStorageKeys {
    POLYGON = "POLYGON",
    RESPONSE = "RESPONSE",
    ENTRY_PATH = "ENTRY_PATH",
    EXIT_PATH = "EXIT_PATH",
    TARGETS = "TARGETS",
    ARCS = "ARCS",
    LEGS = "LEGS",
    TANGENT_LINE = "TANGENT_LINE",
    AMTS = "AMTS",
    GENERAL = "GENERAL"
}


export function getInitialStoreState<T>(key: LocalStorageKeys, parser: z.ZodSchema<T>): T {
    const item = localStorage.getItem(key)
    
    if (item !== null) {
        const parsed = parser.safeParse(JSON.parse(item))

        if (!parsed.success) {
            localStorage.removeItem(key)
        }
        else {
            return parsed.data;
        }
    }
    if (key === LocalStorageKeys.ENTRY_PATH || key === LocalStorageKeys.EXIT_PATH) {
        return {} as T;
    }
    if (key === LocalStorageKeys.RESPONSE) {
        return null as T;
    }
    return [] as T;
}
