export interface Configuration {
    sender: boolean
    receiver: boolean
    debug: boolean
    protocol: string
    hostname: string
    port: number
}

export const config: Configuration = {
    sender: false,
    receiver: false,
    debug: false,
    protocol: 'http',
    hostname: 'localhost',
    port: 3600
}
