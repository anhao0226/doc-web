import { RequestOp, Response, AxiosPost } from "@/libs/http";
import { encryptionPassword } from '@/libs/utils'

/**
 * 
 * @param params 
 * @returns 
 */
export function userLogin(
    params: {
        email: string,
        password: string
    }
): Promise<Response> {
    return new Promise((resolve: any, reject: any) => {
        AxiosPost({
            url: 'user/login',
            params: {
                email: params.email,
                password: encryptionPassword(params.password)
            },
            success: (data: any) => {
                resolve(data);
            },
            error: (err: Error) => {
                reject(err);
            }
        })
    })
}


/**
 * 
 * @param params 
 * @returns 
 */
export function addUserConfig(
    params: {
        type: string,
        text: string,
        user: string,
        enable?: number
    }
): Promise<Response> {
    return new Promise((resolve: any, reject: any) => {
        AxiosPost({
            url: 'user/config/add',
            params: params,
            success: (data: any) => {
                resolve(data);
            },
            error: (err: Error) => {
                reject(err);
            }
        })
    })

}