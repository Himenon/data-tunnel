export interface Cache<T> {
    [key: string]: T[]
}

export interface Option {
    describe?: string
}

export type Payload<T> = { key: string; data: T[], option?: Option }
export type Updater<T> = (payload: Payload<T>) => void
