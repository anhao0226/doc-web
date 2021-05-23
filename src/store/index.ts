
import { useStorage } from '@/libs/storage';
import { ref, reactive, watch, watchEffect, nextTick } from 'vue';
import { SecInputValue } from "./../libs/type";
import { Value } from '@/libs/type'
import { dataType, hasOwnProperty } from '@/libs/utils';

type EventFunc = (value: any) => void

interface Events {
    emits: EventFunc[];
    auto: EventFunc[];
}


export class Store {

    state = Object.create({});
    indexes = ref<any>({});
    events: Events[] = [];
    /**
     * 
     */
    handleEvents(key: string, newValue: any) {
        if (hasOwnProperty(this.indexes, key)) {
            const eIndex = this.indexes[key];
            if (this.events[eIndex] &&
                this.events[eIndex].auto) {
                this.events[eIndex].auto.forEach((fn: EventFunc) => {
                    fn(newValue || this.state[key]);
                })
            }
        }
    }

    /**
     * 
     */
    watchEvent(key: string) {
        switch (dataType(this.state[key])) {
            case 0:
            case 1:
            case 2:
                watch(() => this.state[key], (newValue: any) => {
                    this.handleEvents(key, newValue);
                })
                break;
            case 3:
            case 4:
                watch(this.state[key], (newValue: any) => {
                    this.handleEvents(key, newValue);
                })
                break;
        }
    }

    constructor(init: any) {
        const keys = Object.keys(init);
        const temp = Object.create({});
        keys.forEach((key: string, index: number) => {
            temp[key] = init[key];
            this.indexes[key] = index;
        })
        this.state = reactive(temp);
        Object.keys(this.state).forEach((key: string) => {
            this.watchEvent(key);
        });
    }
    /**
    * 
    */
    on(key: string, e: EventFunc, auto: boolean) {
        if (hasOwnProperty(this.indexes, key)) {
            const idx = this.indexes[key] as number;
            if (!this.events[idx]) {
                this.events[idx] = { emits: [], auto: [] }
            }
            auto ? (this.events[idx].auto.push(e)) : (this.events[idx].emits.push(e));
        }
    }
    /**
    * 
    */
    commit(key: string, value: string): Store {
        if (hasOwnProperty(this.state, key)) {
            this.state[key] = value;
        } else {
            console.error("key does not exist")
        }
        return this;
    }
    /**
    * 
    */
    emit(key: string) { // 数据处理
        if (hasOwnProperty(this.indexes, key)) {
            this.handleEvents(key, null);
        }
    }
}


const localStorage = useStorage()

const storeInstance = new Store({
    wsState: localStorage.getValue("ws_state").value || { message: {} },
    user: localStorage.getValue("user").value,
    email: localStorage.getValue("email").value,
    token: localStorage.getValue("token").value,
    data_addrs: localStorage.getValue('data_addrs').value || [],
    fetch_addrs: localStorage.getValue('fetch_addrs').value || [],
    https_enable: localStorage.getValue<boolean>('https_enable').value,
    secs: localStorage.getValue('secs').value || [],
    chatBox: null,
    ws_conn: null,
    ws_chat_message: [],
});

if (storeInstance.state.user) {
    const user = storeInstance.state.user;
    storeInstance.state.ws_conn = new WebSocket(`ws://127.0.0.1:3000/ws?user=${user}`)
}
//
storeInstance.on("wsState", (value: any) => {
    if (storeInstance.state.chatBox) {
        nextTick(() => {
            const h = (storeInstance.state.chatBox).scrollHeight;
            storeInstance.state.chatBox.scrollTop = h;
        })
    }
}, true)

//
storeInstance.on("wsState", (value: any) => {
    localStorage.saveValue("ws_state", JSON.stringify(value));
}, true)
// 
storeInstance.on("user", (value: string) => {
    localStorage.setItem("user", value);
}, true)
//
storeInstance.on("email", (value: string) => {
    localStorage.setItem("email", value);
}, true)
//
storeInstance.on("token", (value: string) => {
    localStorage.setItem("token", value);
}, true)
//
storeInstance.on("data_addrs", (value: any) => {
    localStorage.setItem("data_addrs", JSON.stringify(value));
}, true)
//
storeInstance.on("fetch_addrs", (value: any) => {
    localStorage.setItem("fetch_addrs", JSON.stringify(value));
}, true)
//
storeInstance.on("https_enable", (value: any) => {
    localStorage.saveValue("https_enable", JSON.stringify(value))
}, true)

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