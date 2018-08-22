export interface Cache<T> {
    [key: string]: T[]
}

export interface Option {
    describe?: string
}

export type Payload<T> = { key: string; data: T[], option?: Option }
export type Updater<T> = (payload: Payload<T>) => void

class Straw {
    public PREFIX = 'DATA_STRAW'
    private dataSet: { cache: Cache<any>, option?: Option } = { cache: {} }
    private notifyTarget: Updater<any>[] = []

    public absorb<T>(key: string, data: T, option?: Option) {
        if (key in this.dataSet.cache) {
            this.dataSet.cache[key].push(JSON.stringify(data))
            this.dataSet.option = option;
            this.update(key)
        } else {
            this.dataSet.cache[key] = [JSON.stringify(data)]
            this.dataSet.option = option;
            this.update(key)
        }
    }

    public getDownloadData<T>(key: string): { [key: string]: T } {
        const jsonData = {}
        this.dataSet.cache[key].forEach((data: string, idx: number) => {
            Object.assign(jsonData, { [idx]: JSON.parse(data) })
        })
        return jsonData
    }

    public addUpdateNotifyListener<T>(target: Updater<T>) {
        this.notifyTarget.push(target)
    }

    private update(key: string) {
        const data = this.dataSet.cache[key]
        const option = this.dataSet.option;
        this.notifyTarget.forEach(target => target({ key, data, option }))
    }
}

export const straw = new Straw()
