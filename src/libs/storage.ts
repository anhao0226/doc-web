
const storage = window.localStorage

export function setItem(key: string, val: string) {
    storage.setItem(key, val)
}

export function removeItem(key: string) {
    storage.removeItem(key)
}

// 
export interface Config {
    dataAddr: string[]
    testAddr: string[]
    isHttps: boolean
    sections: any
}

// 保存测试链
export function saveSections(v: any) {
    setItem('3', v)
}

// 0 dataAddrs
// 1 testAddrs
// 2 isHttps
// 3 sections 数组
export function loadItem(): Config {
    const config = <Config>{ dataAddr: [], testAddr: [], isHttps: false, sections: null }
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i) as string
        const val = storage.getItem(key) as string
        if (!val) continue
        switch (key) {
            case "0":
                config.dataAddr = JSON.parse(val)
                break;
            case "1":
                config.testAddr = JSON.parse(val)
                break;
            case "2":
                config.isHttps = JSON.parse(val)
                break;
            case "3":
                config.sections = JSON.parse(val);
                break;
        }
    }
    console.log(config)
    return config
}