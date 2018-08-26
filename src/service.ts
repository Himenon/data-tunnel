import * as io from 'socket.io-client'

console.log('service')

export const ping = () => {
    const socket = io('localhost:3001')
    window.onload = () => {
        socket.emit('SEND_MESSAGE', (data: any) => {
            alert(data)
        })
    }
}
