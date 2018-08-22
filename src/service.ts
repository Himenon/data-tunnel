import * as io from "socket.io-client";

export const ping = () => {
    const socket = io("localhost:3001");
    window.onload = () => {
        socket.emit("SEND_MESSAGE", (data: any) => {
            alert(data);
        })
    };
}
