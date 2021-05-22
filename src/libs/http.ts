import axios, { AxiosRequestConfig, Method } from "axios";
import { useStore } from '@/store/index'

export interface RequestOp {
    url?: string
    method?: any
    params?: any
    header?: any
    data?: any
    error?: any
    success?: any
}

export interface Response {
    Code: string
    Data: any
    Success: boolean
    Result: any
    Message: string
}

const AxiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000"
})

const store = useStore();

console.log(store);

AxiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    const len = store.state.data_addrs.length;
    console.log("test");
    for (let i = 0; i < len; i++) {
        if (store.state.fetch_addrs[i].enable) {
            config.baseURL = `http://${store.state.fetch_addrs[i].value}`
            break
        }
    }
    return config
})

// GET
export function AxiosGet(config: RequestOp) {
    AxiosInstance({
        url: config.url,
        method: 'GET',
        params: config.params
    }).then(res => {
        config.success(res.data)
    }).catch(err => {
        config.error(err)
    })
}

// POST
export function AxiosPost(config: RequestOp) {
    AxiosInstance({
        url: config.url,
        method: 'POST',
        params: config.params
    }).then(res => {
        config.success(res.data)
    }).catch(err => {
        config.error(err)
    })
}

// PUT
export function AxiosPut(config: RequestOp) {
    AxiosInstance({
        url: config.url,
        method: 'PUT',
        params: config.params
    }).then(res => {
        config.success(res.data)
    }).catch(err => {
        config.error(err)
    })
}

// DELETE
export function AxiosDelete(config: RequestOp) {
    AxiosInstance({
        url: config.url,
        method: 'DELETE',
        params: config.params
    }).then(res => {
        config.success(res.data)
    }).catch(err => {
        config.error(err)
    })
}

// General
export function AxiosGeneral(config: RequestOp) {
    switch (config.method) {
        case 'GET':
            AxiosGet(config);
            break;
        case 'POST':
            AxiosPost(config);
            break;
        case 'DELETE':
            AxiosDelete(config);
            break;
        case 'PUT':
            AxiosPut(config);
            break;
    }
}