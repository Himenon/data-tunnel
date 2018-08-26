import { setupUI } from './ui'
import { straw } from './straw'
import * as service from './service'

export interface Configuration {
    ui?: boolean
    server?: boolean
    client?: boolean
}

const setup = (configure: Configuration) => {
    if (configure.ui) {
        setupUI()
    }
    if (configure.server) {
        console.log('Connect TO Server')
    }
    if (configure.client) {
        console.log('Client Ping')
        service.ping()
    }
}

export { setup, straw }
