export const probe = (...args: any[]): void => {
    console.log(args);
}

export class PumpProbe {
    constructor(private key: string) {}
    public pump(data: any) {
        console.log(data, this.key);
    }
}