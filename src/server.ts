import * as cors from 'cors'
const app = require('express')()
const http = require('http').Server(app)
import * as socketIo from 'socket.io'
import * as constants from './constants'

const io = socketIo(http)

app.use(cors({ origin: '*' }))

interface DataFormat {
    [key: string]: any
}

io.on('connection', function(socket: socketIo.Socket) {
    console.log('server:connected')

    socket.on('test', (msg: any) => {
        console.info('server:test', msg)
    })

    socket.on('disconnect', () => {
        console.info('server::disconnect')
    })

    socket.on(constants.DATA_SEND_CHANNEL, (data: DataFormat) => {
        io.emit(constants.DATA_RELAY_CHANNEL, data)
    })
})

http.listen(constants.SERVER_SETTING.port, function() {
    console.info(`listening on ${constants.SERVER_ADDRESS}`)
})
