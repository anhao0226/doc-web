
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
    fetchNodes: any[];

}

// 保存测试链
export function saveSections(v: any) {
    setItem('3', v)
}
//
export function saveNode(k: string, v: any) {
    setItem(k, v);
}

// 0 dataAddrs
// 1 testAddrs
// 2 isHttps
// 3 sections 数组
export function loadItem(): Config {
    const config = <Config>{ dataAddr: [], testAddr: [], isHttps: false, sections: null, fetchNodes: [] }
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i) as string
        const value = storage.getItem(key)
        if (value) {
            let toJson: any = null;
            try {
                toJson = JSON.parse(value);
            } catch (e) {
                console.log(e);
            }
            // 
            if (key.indexOf('sec') == 0) {
                config.fetchNodes.push(JSON.parse(value))
            }
            // 处理初始化数据
            switch (key) {
                case "0":
                    config.dataAddr = toJson;
                    break;
                case "1":
                    config.testAddr = toJson;
                    break;
                case "2":
                    config.isHttps = toJson;
                    break;
                case "3":
                    config.sections = toJson;
                    break;
            }
        }
    }
    return config
}