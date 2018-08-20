import { h, app, View } from 'hyperapp'
import { straw } from './straw'

export interface DataStraw {
    count: number
    title: string
    url: string
    download: string
}

export interface State {
    items: { [key: string]: DataStraw }
}

export interface Actions {
    refresh: () => void
    onDownload: (key: string) => void
}

const state: State = {
    items: {},
}

const actions: Actions = {
    refresh: () => (state: State, actions: Actions) => {
        Object.keys(state.items).map(key => actions.onDownload(key))
    },
    onDownload: (key: string) => (state: State) => {
        const data = straw.getDownloadData(key)
        const file = new Blob([JSON.stringify(data)], { type: 'application/json' })
        state.items[key].url = URL.createObjectURL(file)
        state.items[key].download = `${key}.json`
    },
}

const view: View<State, Actions> = (state: State, actions: Actions) => {
    const items = state.items
    return (
        <div>
            <h1>Probe List</h1>
            <button onclick={actions.refresh}>Refresh</button>
            <ul>
                {Object.keys(items).map(key => {
                    <li>
                        <a href={items[key].url} download={items[key].download}>
                            ({items[key].count}) {items[key].title}
                        </a>
                    </li>
                })}
            </ul>
        </div>
    )
}

export const setupUI =() => {
    app(state, actions, view, document.body)
}
