# Data Tunnel

[![CircleCI](https://circleci.com/gh/Himenon/data-tunnel/tree/master.svg?style=svg)](https://circleci.com/gh/Himenon/data-tunnel/tree/master)

Local Debug Tool

## Install

```shell
$ npm i data-tunnel
```

## Usage

### Publisher

```typescript
import * as dt from "data-tunnel";

dt.setup({
    receiver: false,
    sender: true,
    debug: false,
    protocol: 'http',
    host: 'localhost',
    port: 3600,
});

const awesomeMethod = (data1: string, data2: number) => {
    dt.service.emit("my-key", [data1, data2])
}
```

### Receiver

```typescript
import * as dt from "data-tunnel";

dt.setup({
    receiver: true,
    sender: false,
    debug: false,
    protocol: 'http',
    host: 'localhost',
    port: 3600,
});

const awesomeMethod = (data1: string, data2: number) => {
    console.log("Hey", data1, data2)
}

dt.service.receive("my-key", awesomeMethod)
```

### CLI

```
$ data-tunnel

$ data-tunnel -p 6501

$ data-tunnel -p 6501 --host 127.0.0.1

$ data-tunnel -p 6501 --debug
```

## Development

Logic

```shell
$ yarn i
$ yarn start
```

UI

```
$ cd sample
$ npm i
$ npm start
```

## Licence

MIT
