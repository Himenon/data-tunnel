import * as meow from 'meow'

export const flagSchemas: meow.Options = {
    autoHelp: true,
    flags: {
        host: {
            type: 'string',
            default: '127.0.0.1',
        },
        port: {
            type: 'string',
            alias: 'p',
            default: '6500'
        },
        debug: {
            type: 'boolean',
            alias: 'd',
            default: false,
        }
    }
}
