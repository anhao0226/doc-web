import axios, { Method } from "axios";

export interface RequestOp {
    url?: string
    method?: Method
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
}

export function AxiosGet(config:RequestOp){
    axios({
        url: config.url,
        method: 'GET',
        params: config.params
    }).then(res => {
        config.success(res.data)
    }).catch(err => {
        config.error(err)
    })
}

export function AxiosPost(config:RequestOp){
    axios({
        url: config.url,
        method: 'POST',
        params: config.params
    }).then(res => {
        console.log(res)
        config.success(res.data)
    }).catch(err => {
        config.error(err)
    })
}

export function AxiosGeneral(config:RequestOp){
    switch(config.method) {
        case 'GET':
            AxiosGet(config)
            break;
        case 'POST':
            AxiosPost(config)
            break;
    }
}