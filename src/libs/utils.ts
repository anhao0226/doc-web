
import { v4 as uuidv4 } from 'uuid';
import SHA from 'sha.js'

enum baseType {
    ARRAY = '[object Array]',
    STRING = '[object String]',
    NUMBER = '[object Number]',
    OBJECT = '[object Object]',
    NULL = '[object Null]',
    UNDEFINED = '[object Undefined]'
}

const type2Number = {
    '[object Array]': 0,
    '[object String]': 1,
    '[object Number]': 2,
    '[object Object]': 3,
    '[object Null]': 4,
    '[object Undefined]': 5,
}

const mobilePrefix: string[] = [
    "130", "131", "132", "133", "135", "137", "138", "170", "187", "189"
];


//
export interface Value {
    valid: boolean
    value: any
}

// 寻找值
export function findValue(target: any, args: string[], seek: number): Value {
    const value = <Value>{}
    switch (dataType(target)) {
        case 0:// Array
            {
                const n = parseInt(args[seek]);
                if (n <= target.length - 1) {
                    value.value = target[n];
                    value.valid = true;
                }
                break;
            }
        case 3:// Object
            if (hasOwnProperty(target, args[seek])) {
                value.value = target[args[seek]]
                value.valid = true;
            }
            break;
    }
    seek++
    if (seek < args.length && value.valid) {
        return findValue(value.value, args, seek)
    }
    return value;
}


// 查看数据类型
export function dataType(v: any): number {
    const tpy: string = Object.prototype.toString.call(v);
    return (type2Number as any)[tpy];
}

// 
export function hasOwnProperty(obj: any, k: string): boolean {
    return Object.prototype.hasOwnProperty.call(obj, k);
}

//
export function toString(v: any): string {
    return new String(v).toString();
}

//
export function toUpperCase(v: string): string {
    return String.toString.call(v);
}

export function calculateAbsolutePath(addr: string, url: string): string {
    return ""
}

export function endChar() {
    console.log('test')
}

/*
    mobile
*/
export function getMobile(): string {
    const i = parseInt((Math.random() * 10).toString());
    let text: string = mobilePrefix[i];
    for (let k = 0; k < 8; k++) {
        text = text + Math.floor(Math.random() * 10).toString();
    }
    return text;
}

/*
    uuid
*/
export function getUUID(): string {
    return uuidv4().toString()
}


/**
 * sha512加密
 */
export function encryptionPassword(password: string): string {
    const hash = SHA("sha512")
    return hash.update(password).digest('hex').toString()
}


