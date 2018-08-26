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

io.on('connection', function(socket: socketIo.Socket) {
    console.log('server:connected')

    socket.on('test', (msg: any) => {
        console.info('server:test', msg)
    })

    socket.on('disconnect', () => {
        console.info('server::disconnect')
    })

    socket.on(constants.DATA_SEND_CHANNEL, (data: types.RelayData) => {
        io.emit(constants.DATA_RELAY_CHANNEL, data)
    })
})

server.listen(constants.SERVER_SETTING.port, function() {
    console.info(`listening on ${constants.SERVER_ADDRESS}`)
})
