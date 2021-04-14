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

// GET
export function AxiosGet(config: RequestOp) {
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

// POST
export function AxiosPost(config: RequestOp) {
    axios({
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
    axios({
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
    axios({
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