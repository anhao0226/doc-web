import axios, { AxiosRequestConfig } from "axios";
import { useStore } from '@/store/index'
import { Value } from "./type";


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

function runEnv(): string | undefined {
    return process.env.NODE_ENV
}

// 开发环境
const DEVELOPMENT_BASE_URL = "http://47.98.203.193:3000/";
// 生产环境
const PRODUCTION_BASE_URL = "http://127.0.0.1:3000/";


const BASE_URL = (runEnv() != undefined && runEnv() == 'development')
    ? PRODUCTION_BASE_URL
    : DEVELOPMENT_BASE_URL;


const AxiosInstance = axios.create({
    baseURL: BASE_URL
})


const store = useStore();


AxiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
    const val = calculationRequestUrl("");
    if (val.valid) { config.baseURL = val.value }
    else {config.baseURL = BASE_URL }
    return config
})

/**
 * 
 * @param params 
 */
export function calculationRequestUrl(protocol: string): Value<string> {
    const len = store.state.fetch_addrs.length;
    const value:Value<string> = { value: '', valid: false }
    for (let index = 0; index < len; index++) {
        if (store.state.fetch_addrs[index].enable) {
            value.valid = true;
            let httpType = store.state.https_enable ? 'https' : 'http';
            if (protocol) { httpType = protocol }
            value.value = `${httpType}://${store.state.fetch_addrs[index].value}`;
            break 
        }
    }
    return value;
}

/**
 * 
 * @param config 
 */
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