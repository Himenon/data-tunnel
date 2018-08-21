import * as pp from "pump-probe";

window.onload = () => {
    pp.setupUI();
}

const awesomeMethod = (data1: string, data2: number) => {
    const data = {data1 , data2};
    pp.straw.absorb("awesomeMethod", data);
}

const awesomeMethod2 = (data1: string, data2: number) => {
    const data = {data1 , data2};
    pp.straw.absorb("awesomeMethod2", data);
}

let counter = 0;
setInterval(() => {
    counter += 1;
    awesomeMethod("hey", counter);
    awesomeMethod2("hoo", counter * 2);
}, 1000);
