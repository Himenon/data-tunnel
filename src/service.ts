import * as io from 'socket.io-client'

export const ping = () => {
    const socket = io("http://localhost:3000")
    console.log("ふが")
    socket.on('connect', () => {
        console.info('Websocket success');
    })
    window.onload = () => {
        socket.emit('SEND_MESSAGE', (data: any) => {
            alert(data)
        })
    }
}
