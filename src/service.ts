import * as constants from './constants'
import * as io from 'socket.io-client'
import * as types from './types'
import { config } from './config'

let socket: SocketIOClient.Socket | null = null
let receiveEvent: types.ReceiveEventListener = {}

export const setup = () => {
    socket = io.connect(constants.SERVER_ADDRESS)

    socket.on(constants.CHANNEL.CONNECT, () => {
        if (config.debug) {
            console.info('DataRelay:WebSocket Connected')
        }
    })

    socket.on(constants.CHANNEL.DISCONNECT, () => {
        if (config.debug) {
            console.info('DataRelay:WebSocket Disconnected')
        }
    })

    if (socket && config.receiver && !config.sender) {
        socket.on(constants.CHANNEL.DATA_RELAY, (data: types.RelayData) => {
            if (config.debug) {
                console.info(`DataRelay[${constants.CHANNEL.DATA_RELAY}]: `, data)
            }
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
        if (config.debug) {
            console.info('Emit', sendData)
        }
        socket.emit(constants.CHANNEL.DATA_RELAY, sendData)
    }
}

export const receive = (key: string, fn: Function) => {
    if (config.debug) {
        console.info('Set receiveEvent', key, fn)
    }
    if (key in receiveEvent) {
        receiveEvent[key].push(fn)
    } else {
        receiveEvent[key] = [fn]
    }
}
