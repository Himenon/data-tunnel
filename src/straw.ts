export interface Cache {
    [key: string]: any[]
}

class Straw {
    public PREFIX = 'DATA_STRAW'
    private cache: Cache = {}

    public absorb(key: string, data: any) {
        if (key in this.cache) {
            this.cache[key].push(JSON.stringify(data))
        } else {
            this.cache[key] = [JSON.stringify(data)]
        }
    }

    public getDownloadData(key: string): { [key: string]: any } {
        const jsonData = {}
        this.cache[key].forEach((data: string, idx: number) => {
            Object.assign(jsonData, { [idx]: JSON.parse(data) })
        })
        return jsonData
    }
}

export const straw = new Straw()
