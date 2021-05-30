import { RequestOp, Response, AxiosPost, AxiosGet, AxiosDelete } from "@/libs/http";
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
/**
 * 
 */
 export function delUserConfig(
    params: {
        uid: string
    }
): Promise<Response> {
    return new Promise((resolve: any, reject: any) => {
        AxiosDelete({
            url: 'user/config/del',
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
/**
 * 
 */
export function sendMessage(
    params: {
        sender: string,
        receiver: string,
        text: string,
    }
): Promise<Response> {
    return new Promise((resolve: any, reject: any) => {
        AxiosPost({
            url: 'user/message/send',
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
/**
 * 
 */
export function pullMessage(params: {
    sender: string,
    user_id: string
    receiver: string,
    time: string,
}): Promise<Response> {
    return new Promise((resolve: any, reject: any) => {
        AxiosGet({
            url: 'user/message/pull',
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
/**
 * 用户好友
 */
export function userBuddys(
    params: {
        user: string
    }
): Promise<Response> {
    return new Promise((resolve: any, reject: any) => {
        AxiosGet({
            url: 'user/buddy',
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

/**
 *  
 */
export function userIsExit(
    params: {
        email: string
    }
): Promise<Response> {
    return new Promise((resolve: any, reject: any) => {
        AxiosGet({
            url: 'user/isexit',
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

/**
 * 
 */
export function userRegister(
    params: {
        email: string
        password: string
    }
): Promise<Response> {
    return new Promise((resolve: any, reject: any) => {
        AxiosPost({
            url: 'user/register',
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