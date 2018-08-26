import { h, app, View } from 'hyperapp'
import { straw } from '../straw'
import * as Types from "./types";
// import * as service from "../service";


// service.ping();

const state: Types.State = {
    items: {},
}

/**
 * TODO Performance
 */
const actions: Types.Actions = {
    updater: (payload: Types.Payload) => (state: Types.State) => {
        const data = straw.getDownloadData(payload.key)
        const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
        const strawData: Types.DataStraw = {
            title: payload.key,
            count: payload.data.length,
            describe: payload.option && payload.option.describe,
            url: URL.createObjectURL(file),
            download: `${payload.key}.json`
        }
        state.items[payload.key] = strawData;
        return {
            items: state.items,
        }
    },
}

const view: View<Types.State, Types.Actions> = (propState) => {
    const items = propState.items
    return (
        <div class="container">
            <h1><small>Probe List</small></h1>
            <div class="list-group">
                {Object.keys(items).map(key => {
                    return (
                        <a href={items[key].url} download={items[key].download} class="list-group-item list-group-item-action flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{items[key].title}</h5>
                                <small><span class="badge badge-pill badge-success">{items[key].count}</span></small>
                            </div>
                            <p class="mb-1">{items[key].describe}</p>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export const setupUI = () => {
    const main = app(state, actions, view, document.body)
    straw.addUpdateNotifyListener(main.updater)
}
