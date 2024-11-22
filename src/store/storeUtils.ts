import { z } from "zod"

export enum LocalStorageKeys {
    POLYGON = "POLYGON",
    RESPONSE = "RESPONSE",
    REQUEST_ROUTE = "REQUEST_ROUTE",
    TARGETS = "TARGETS",
    ARCS = "ARCS",
    LEGS = "LEGS",
    TANGENTLINE = "TANGENTLINE",
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
    if (key === LocalStorageKeys.REQUEST_ROUTE) {
        return {} as T;
    }
    if (key === LocalStorageKeys.RESPONSE) {
        return null as T;
    }
    return [] as T;
}
