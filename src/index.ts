import * as ui from './ui'
import { straw } from './straw'
import * as service from './service'
import { config, Configuration } from './config'

const setup = (configure: Configuration) => {
    config.receiver = configure.receiver
    config.sender = configure.sender
    config.debug = configure.debug
    config.port = configure.port
    config.hostname = configure.hostname
    config.protocol = configure.protocol
    ui.setup()
    service.setup()
}

export { setup, straw, service }
