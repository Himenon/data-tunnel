import * as constants from './constants'
import * as io from 'socket.io-client'
import { config } from './config'

interface RelayData {
    key: string,
    value: any[]
}

interface ReceiveEventListener {
    [key: string]: Function[]
}

let socket: SocketIOClient.Socket | null = null
let receiveEvent: ReceiveEventListener = {}

export const setup = () => {
    socket = io.connect(constants.SERVER_ADDRESS)

    socket.on('connect', () => {
        console.info('DataRelay:WebSocket Connected')
    })

    socket.on('disconnect', () => {
        console.info('DataRelay:WebSocket Disconnected')
    })

    if (socket && config.receiver && !config.sender) {
        socket.on(constants.DATA_RELAY_CHANNEL, (data: RelayData) => {
            if (data.key in receiveEvent) {
                receiveEvent[data.key].forEach(fn => {
                    fn(...data.value)
                })
            }
        })
    }
}

export const emit = (key: string, value: any) => {
    if (!config.sender) {
        return
    }
    if (socket) {
        const sendData: RelayData = { key, value }
        socket.emit(constants.DATA_SEND_CHANNEL, sendData)
    }
}

export const receive = (key: string, fn: Function) => {
    if (key in receiveEvent) {
        receiveEvent[key].push(fn)
    } else {
        receiveEvent[key] = [fn]
    }
}
