import { AxiosGet, RequestOp, Response } from "@/libs/http";

// 获取文档信息
export function fetchDocs(config:RequestOp):Promise<Response>{
    return new Promise((resolve: any, reject: any) => {
        AxiosGet({
            url: config.url,
            success: (data:any) => {resolve(data)},
            error: (err:Error) => {reject(err)}
        })
    })
}