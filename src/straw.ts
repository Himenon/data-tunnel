export interface Cache<T> {
    [key: string]: T[]
}

export type Payload<T> = { key: string; data: T[] }
export type Updater<T> = (payload: Payload<T>) => void

class Straw {
    public PREFIX = 'DATA_STRAW'
    private cache: Cache<any> = {}
    private notifyTarget: Updater<any>[] = []

    public absorb<T>(key: string, data: T) {
        if (key in this.cache) {
            this.cache[key].push(JSON.stringify(data))
            this.update(key)
        } else {
            this.cache[key] = [JSON.stringify(data)]
            this.update(key)
        }
    }

    public getDownloadData<T>(key: string): { [key: string]: T } {
        const jsonData = {}
        this.cache[key].forEach((data: string, idx: number) => {
            Object.assign(jsonData, { [idx]: JSON.parse(data) })
        })
        return jsonData
    }

    public addUpdateNotifyListener<T>(target: Updater<T>) {
        this.notifyTarget.push(target)
    }

    private update(key: string) {
        const data = this.cache[key]
        this.notifyTarget.forEach(target => target({ key, data }))
    }
}

export const straw = new Straw()
