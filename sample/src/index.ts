import * as dt from "data-tunnel";
import * as url from 'url'

const query = url.parse(location.href, true).query

window.onload = () => {
    dt.setup({
        receiver: query && query.receiver === "true",
        sender: query && query.sender === "true",
        debug: false,
        port: 3000,
        hostname: 'localhost',
        protocol: 'http'
    });
}

const dummyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam esse reprehenderit perspiciatis odio? Minima quaerat ut nostrum provident minus eum vel dolores. Enim impedit repudiandae incidunt at! Et, obcaecati sunt?";

const awesomeMethod = (data1: string, data2: number) => {
    const data = {data1 , data2};
    dt.straw.absorb("awesomeMethod", data, {
        describe: dummyText
    });
    dt.service.emit("hey", [data1, data2])
}

const awesomeMethod2 = (data1: string, data2: number) => {
    const data = {data1 , data2};
    dt.straw.absorb("awesomeMethod2", data);
}

if (query && query.sender === "true") {
    let counter = 0;
    setInterval(() => {
        counter += 1;
        awesomeMethod("hey", counter);
        awesomeMethod2("hoo", counter * 2);
    }, 100);
}

dt.service.receive("hey", awesomeMethod)
