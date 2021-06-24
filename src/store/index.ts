
import { useStorage } from '@/libs/storage';
import { ref, reactive, watch, watchEffect, nextTick } from 'vue';
import { SecInputValue } from "./../libs/type";
import { Value, Queue, NoticeState } from '@/libs/type'
import { dataType, hasOwnProperty } from '@/libs/utils';
import __WebSocket, { WSEvent } from '@/libs/websocket'

type EventFunc = (value: any) => void;

type PluginType = (store: Store) => void;

interface Events {
    emits: EventFunc[];
    auto: EventFunc[];
}


export class Store {

    state = Object.create({});
    indexes = ref<any>({});
    events: Events[] = [];
    plugins: PluginType[] = [];
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
    plugin(cb: PluginType) { cb(this); }

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
                console.log(key);
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

export function calculationRequestUrl(protocol: string): Value<string> {
    const len = storeInstance.state.fetch_addrs.length;
    const value: Value<string> = { value: '', valid: false }
    for (let index = 0; index < len; index++) {
        if (storeInstance.state.fetch_addrs[index].enable) {
            value.valid = true;
            let httpType = storeInstance.state.https_enable ? 'https' : 'http';
            if (protocol) { httpType = protocol }
            value.value = `${httpType}://${storeInstance.state.fetch_addrs[index].value}`;
            break;
        }
    }
    return value;
}


const localStorage = useStorage()



const storeInstance = new Store({
    wsState: localStorage.getValue("ws_state").value || { message: {} },
    userID: localStorage.getValue("user_id").value,
    user: localStorage.getValue("user").value,
    email: localStorage.getValue("email").value,
    token: localStorage.getValue("token").value,
    // 保存数据加载地址
    data_addrs: localStorage.getValue('data_addrs').value || [],
    // 保存测试地址
    fetch_addrs: localStorage.getValue('fetch_addrs').value || [],
    // 是否开启https测试
    https_enable: localStorage.getValue<boolean>('https_enable').value,
    // 包测自动测试节点
    secs: localStorage.getValue('secs').value || [],
    chat_box: null,
    // websocket对象
    ws_conn: null,
    // 用户的唯一id
    user_id: localStorage.getValue("user_id").value || "",
    // 最后读取时间
    last_recv_time: localStorage.getValue("last_recv_time").value || "",
    // 消息通知
    notice: [],
    // 用户索引
    user_index: localStorage.getValue("user_index").value || { list: {} },
    // 用户聊天缓存
    user_chat_cache: localStorage.getValue("user_chat_cache").value || [],
});

storeInstance.plugin((store: Store) => {
    const user = storeInstance.state.user;
    const urlSuffix = calculationRequestUrl("ws");
    if ("WebSocket" in window) {
        if (urlSuffix.valid && (user as string).length == 36) {
            const finUrl = `${calculationRequestUrl("ws").value}/ws?user=${user}`;
            try {
                const ws = new __WebSocket({
                    url: finUrl,
                    repeatLimit: 3,
                    reconnectTimeout: 2000
                });
                ws.subscribe((e: MessageEvent) => {
                    const msg = JSON.parse(e.data);
                    store.state.last_recv_time = new Date().toUTCString();
                    switch (msg.Type) {
                        case 0: // chat message
                            if (hasOwnProperty(store.state.user_index.list, msg.Sender)) {
                                const idx = store.state.user_index.list[msg.Sender].seek;
                                if (!store.state.user_chat_cache[idx]) {
                                    store.state.user_chat_cache[idx] = { message: [] };
                                }
                                store.state.user_chat_cache[idx].message.push({
                                    type: 1,
                                    text: msg.Text,
                                });
                            }
                            store.state.notice.push({
                                text: msg.Text,
                                email: store.state.user_index.list[msg.Sender].email,
                            });
                            break;
                        case 1:
                            break;
                    }
                })
                store.state.ws_conn = ws;
            } catch (e: any) {
                console.log(e);
            }
        }
    } else {
        alert("The browser does not support websocket")
    }
})

storeInstance.on("user_index", (value: any) => {
    localStorage.setItem("user_index", JSON.stringify(value));
}, true);

storeInstance.on("user_chat_cache", (value: any) => {
    localStorage.setItem("user_chat_cache", JSON.stringify(value));
    nextTick(() => {
        const h = storeInstance.state.chat_box.scrollHeight;
        storeInstance.state.chat_box.scrollTop = h;
    })
}, true)

storeInstance.on("user_id", (value: string) => {
    localStorage.setItem("user_id", value);
}, true);

storeInstance.on("last_recv_time", (value: string) => {
    localStorage.setItem("last_recv_time", value);
}, true)

storeInstance.on("userID", (value: string) => {
    localStorage.setItem("user_id", JSON.stringify(value));
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