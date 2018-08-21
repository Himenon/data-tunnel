import { h, app, View } from 'hyperapp'
import { straw, Updater, Payload } from './straw'

export interface DataStraw {
    count: number
    title: string
    url?: string
    download?: string
}

export interface State {
    items: { [key: string]: DataStraw }
}

export interface Actions {
    refresh: () => void
    onDownload: (key: string) => void
    updater: Updater<any>
}

const state: State = {
    items: {},
}

const actions: Actions = {
    refresh: () => (state: State, actions: Actions) => {
        console.log(state)
        Object.keys(state.items).map(key => actions.onDownload(key))
    },
    onDownload: (key: string) => (state: State) => {
        const data = straw.getDownloadData(key)
        const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
        state.items[key].url = URL.createObjectURL(file)
        state.items[key].download = `${key}.json`
    },
    updater: (payload: Payload<any>) => (state: State) => {
        state.items[payload.key] = {
            title: payload.key,
            count: payload.data.length,
        }
        return {
            items: state.items,
        }
    },
}

const view: View<State, Actions> = (propState, propActions) => {
    const items = propState.items
    return (
        <div>
            <h1>Probe List</h1>
            <button onclick={propActions.refresh}>Refresh</button>
            <ul>
                {Object.keys(items).map(key => {
                    return (
                        <li>
                            <a href={items[key].url} download={items[key].download}>
                                ({items[key].count}) {items[key].title}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export const setupUI = () => {
    const main = app(state, actions, view, document.body)
    straw.addUpdateNotifyListener(main.updater)
}
