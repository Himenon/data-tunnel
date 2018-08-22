import { setupUI } from './ui'
import { straw } from './straw'
import * as server from './server';

export interface Configuration {
    ui?: boolean;
    server?: boolean;
}

const setup = (configure: Configuration) => {
    if (configure.ui) {
        setupUI();
    }
    if (configure.server) {
        console.log("Connect TO Server");
    }
}

export { setup, straw, server }
