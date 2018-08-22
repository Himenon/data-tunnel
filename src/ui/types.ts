import * as StrawTypes from "../types";

export type Payload = StrawTypes.Payload<any>;

export interface DataStraw {
    count: number
    title: string
    describe?: string
    url?: string
    download?: string
}

export interface State {
    items: { [key: string]: DataStraw }
}

export interface Actions {
    updater: StrawTypes.Updater<any>
}
