import * as Types from './types'

class Straw {
    public PREFIX = 'DATA_STRAW'
    private dataSet: { cache: Types.Cache<any>; option?: Types.Option } = { cache: {} }
    private notifyTarget: Types.Updater<any>[] = []

    public absorb<T>(key: string, data: T, option?: Types.Option) {
        if (key in this.dataSet.cache) {
            this.dataSet.cache[key].push(JSON.stringify(data))
            this.dataSet.option = option
            this.update(key)
        } else {
            this.dataSet.cache[key] = [JSON.stringify(data)]
            this.dataSet.option = option
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

    public addUpdateNotifyListener<T>(target: Types.Updater<T>) {
        this.notifyTarget.push(target)
    }

    private update(key: string) {
        const data = this.dataSet.cache[key]
        const option = this.dataSet.option
        this.notifyTarget.forEach(target => target({ key, data, option }))
    }
}

export const straw = new Straw()
