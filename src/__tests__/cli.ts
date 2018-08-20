import * as cli from "../cli";

describe("test of clie", () => {
    it("test of hello", () => {
        cli.help("hoge")
        expect(1).toBe(1);
    })
})
