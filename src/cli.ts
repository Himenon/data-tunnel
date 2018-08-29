#!/usr/bin/env node
import { server } from './server'
import chalk from 'chalk'
import * as meow from 'meow'
import { flagSchemas } from './schemas/flags'

const cli = meow(
    chalk`
{underline Usage}
  $ data-tunnel <config> [...options]
{underline Options}
  --port [PORT]
  --debug
{underline Examples}
  $ data-tunnel --port 6500 --debug
`,
    flagSchemas,
)

let config

if (cli.input.length) {
    ;[config] = cli.input
}

const port = parseInt(cli.flags.port, 10)
const hostname = cli.flags.host

server.listen(port, hostname, function() {
    console.info(`Listening on http://${hostname}:${port}`)
})
