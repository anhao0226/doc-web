
import { Value } from './type'
import { hasOwnProperty } from './utils'

class LocalStorage {

    value: any = {};
    storage: Storage = window.localStorage;

    /**
     * 
     * @param key 
     * @param value 
     */
    setItem(key: string, value: string) {
        this.storage.setItem(key, value);
    }
    /**
     * 
     * @param key 
     */
    removeItem(key: string) {
        this.storage.removeItem(key);
    }
    /**
     * 
     * @param key 
     * @returns 
     */
    getItem(key: string): Value<string> {
        const value: Value<string> = { value: "", valid: false }
        const text = this.storage.getItem(key);
        if (text) {
            value.valid = true;
            value.value = text;
        }
        return value;
    }
    /**
     * 
     * @param key 
     * @returns 
     */
    getValue<T>(key: string): Value<T> {
        const value: Value<T> = { value: null as any, valid: false }
        if (hasOwnProperty(this.value, key)) {
            value.valid = true;
            value.value = this.value[key];
        }
        return value
    }
    /**
     * 
     * @param value 
     * @returns 
     */
    formatJson(value: any): Value<any> {
        const result: Value<any> = { value: null, valid: false };
        try {
            result.value = value;
            result.valid = true;
            result.value = JSON.parse(value)
        } catch (e) {
            // TODO
        }
        return result
    }
    /**
     * 
     * @param key 
     * @param value 
     */
    saveValue(key: string, value: string) {
        this.setItem(key, value);
        this.value[key] = value;
    }

    constructor() {
        const len = this.storage.length;
        for (let i = 0; i < len; i++) {
            const key = this.storage.key(i) as string
            const value = this.getItem(key);
            if (!value.valid) continue;
            const formatRes = this.formatJson(value.value);
            if (!formatRes.valid) continue;
            this.value[key] = formatRes.value;
        }
    }
}


const StorageInstance = new LocalStorage();

export function useStorage(): LocalStorage {
    return StorageInstance
}

