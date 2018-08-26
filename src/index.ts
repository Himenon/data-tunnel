import * as ui from './ui'
import { straw } from './straw'
import * as service from './service'
import { config, Configuration } from './config'

const setup = (configure: Configuration) => {
    config.receiver = configure.receiver
    config.sender = configure.sender
    ui.setup()
    service.setup()
}

export { setup, straw, service }
