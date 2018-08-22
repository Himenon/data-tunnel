import { h, app, View } from 'hyperapp'
import { straw, Updater, Payload } from './straw'

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
    // refresh: () => void
    // onDownload: (key: string) => void
    updater: Updater<any>
}

const state: State = {
    items: {},
}

/**
 * TODO Performance
 */
const actions: Actions = {
    updater: (payload: Payload<any>) => (state: State) => {
        const data = straw.getDownloadData(payload.key)
        const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
        state.items[payload.key] = {
            title: payload.key,
            count: payload.data.length,
            describe: payload.option && payload.option.describe,
            url: URL.createObjectURL(file),
            download: `${payload.key}.json`
        }
        return {
            items: state.items,
        }
    },
}

const view: View<State, Actions> = (propState) => {
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
