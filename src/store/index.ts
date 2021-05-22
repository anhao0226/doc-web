
import { useStorage } from '@/libs/storage';
import { ref, reactive, watch } from 'vue';
import { SecInputValue } from "./../libs/type";
import { Value } from '@/libs/type'
import { hasOwnProperty } from '@/libs/utils';


declare interface StoreValue {
    func?: any[]
}


export class Store {

    state = reactive<any>({})
    indexes = ref<any>({});
    events: StoreValue[] = [];

    constructor(init: any) {
        const keys = Object.keys(init);
        keys.forEach((key: string, index: number) => {
            this.state[key] = init[key];
            this.indexes[key] = index;
        })
    }
    /**
    * 
    */
    on(key: string, func: any) {
        if (hasOwnProperty(this.indexes, key)) {
            const idx = this.indexes[key] as number;
            if (!this.events[idx]) {
                this.events[idx] = { func: [] }
            }
            this.events[idx].func?.push(func)
        }
    }
    /**
    * 
    */
    commit(key: string, value: string) {
        if (hasOwnProperty(this.state, key)) {
            this.state[key] = value;
        }else {
            console.error("key does not exist")   
        }
    }
    /**
    * 
    */
    emit(key: string) { // 数据处理
        if (hasOwnProperty(this.indexes, key)) {
            const idx = this.indexes[key];
            const funcs = this.events[idx].func
            if (funcs) {
                funcs.forEach(fn => {
                    fn(this.state[key]);
                })
            }
        }
    }
}


const localStorage = useStorage()

const storeInstance = new Store({
    "user": localStorage.getValue("user").value,
    "email": localStorage.getValue("email").value,
    "token": localStorage.getValue("token").value,
    "data_addrs": localStorage.getValue('data_addrs').value,
    "fetch_addrs": localStorage.getValue('fetch_addrs').value,
    "https_enable": localStorage.getValue<boolean>('https_enable').value,
});

// 
storeInstance.on("user", (value: string) => {
    localStorage.setItem("user", value);
})
//
storeInstance.on("email", (value: string) => {
    localStorage.setItem("email", value);
})
//
storeInstance.on("token", (value: string) => {
    localStorage.setItem("token", value);
})
//
storeInstance.on("data_addrs", (value: any) => {
    localStorage.setItem("data_addrs", value);
})
//
export function useStore(): Store {
    return storeInstance
}


























/**
 * User
 * @param email
 * @param token
 */
interface User {
    email: string
    token: string
    user: string
    state: boolean
}



/**
 * 用户信息
 */
export const GUserInfo = ref<User>({
    email: '',
    token: '',
    user: '',
    state: false,
})

/**
 *  配置信息
 */
export const GConfig = ref<Config>({
    dataAddrs: [],
    fetchAddrs: [],
    httpsEnable: false,
    currFetchAddr: ""
})



/**
 * Config
 * @param dataAddrs 数据地址
 * @param fetchAddrs 测试地址
 */
interface Config {
    httpsEnable: boolean
    dataAddrs: { value: string; enable: boolean }[]
    fetchAddrs: { value: string; enable: boolean }[]
    currFetchAddr: string
}






export function availableFetchAddr(): Value<string> {
    const value: Value<string> = { valid: false, value: "" }
    const len = GConfig.value.fetchAddrs.length;
    for (let i = 0; i < len; i++) {
        if (GConfig.value.fetchAddrs[i].enable) {
            value.valid = true;
            value.value = GConfig.value.fetchAddrs[i].value;
        }
    }
    return value
}

const _inputValues = ref<SecInputValue[]>([]);
const _commentIndex = ref<number>(-1)
const GBoxStateInfo = ref({ x: 0, y: 0, state: false, data: "" })

export {
    GBoxStateInfo,
    _inputValues,
    _commentIndex
}