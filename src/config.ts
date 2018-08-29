export interface Configuration {
    sender: boolean
    receiver: boolean
    debug: boolean
    protocol: string
    host: string
    port: number
}

export const config: Configuration = {
    sender: false,
    receiver: false,
    debug: false,
    protocol: 'http',
    host: 'localhost',
    port: 3600,
}
