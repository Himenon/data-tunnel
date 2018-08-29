import * as cors from 'cors'
import * as express from 'express'
import * as http from 'http'
import * as socketIo from 'socket.io'
import * as constants from './constants'
import * as types from './types'

const app = express()
const server = new http.Server(app)
const io = socketIo(server)

app.use(cors({ origin: '*' }))

io.on(constants.CHANNEL.CONNECTION, function(socket: socketIo.Socket) {
    console.log('server:connected')

    socket.on(constants.CHANNEL.TEST, (msg: any) => {
        console.info('server:test', msg)
    })

    socket.on(constants.CHANNEL.DISCONNECT, () => {
        console.info('server::disconnect')
    })

    socket.on(constants.CHANNEL.DATA_RELAY, (data: types.RelayData) => {
        io.emit(constants.CHANNEL.DATA_RELAY, data)
    })
})

export { server }
