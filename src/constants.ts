export const SERVER_SETTING = {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000,
}

export const SERVER_ADDRESS = `${SERVER_SETTING.protocol}://${SERVER_SETTING.hostname}:${SERVER_SETTING.port}`

export const CHANNEL = {
    DATA_RELAY: 'data-relay',
    TEST: 'test',
    CONNECT: 'connect',
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',
}
