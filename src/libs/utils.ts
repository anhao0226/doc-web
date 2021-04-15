
const type2Number = {
    '[object Array]': 0,
    '[object String]': 1,
    '[object Number]': 2,
    '[object Object]': 3,
    '[object Null]': 4,
    '[object Undefined]': 5,
}


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
    if (seek < args.length) { return findValue(value.value, args, seek) }
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

export function endChar(){
    console.log('test')
}


