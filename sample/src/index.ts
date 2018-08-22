import * as pp from "pump-probe";

window.onload = () => {
    pp.setup({
        ui: true
    });
}

const dummyText = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam esse reprehenderit perspiciatis odio? Minima quaerat ut nostrum provident minus eum vel dolores. Enim impedit repudiandae incidunt at! Et, obcaecati sunt?";

const awesomeMethod = (data1: string, data2: number) => {
    const data = {data1 , data2};
    pp.straw.absorb("awesomeMethod", data, {
        describe: dummyText
    });
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
