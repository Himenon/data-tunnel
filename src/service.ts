import * as constants from './constants'
import * as io from 'socket.io-client'
import * as types from './types'
import { config } from './config'

let socket: SocketIOClient.Socket | null = null
let receiveEvent: types.ReceiveEventListener = {}

export const setup = () => {
    socket = io.connect(constants.SERVER_ADDRESS)

    socket.on('connect', () => {
        console.info('DataRelay:WebSocket Connected')
    })

    socket.on('disconnect', () => {
        console.info('DataRelay:WebSocket Disconnected')
    })

    if (socket && config.receiver && !config.sender) {
        socket.on(constants.DATA_RELAY_CHANNEL, (data: types.RelayData) => {
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
        const sendData: types.RelayData = { key, value }
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
