
/*
    Value
*/
export interface Value<T> {
    value: T;
    valid?: boolean;
}

/*
    InputValue
*/
export interface InputValue<U> extends Value<U> {
    key: string;
    auto: boolean; 
    type: string;
    detail: string;
}

/*
    VerifyValue
*/
export interface VerifyValue<U> extends Value<U> {
    key: string
}

/*
    RequestInfo
*/
export interface BaseRequestInfo {
    url: string;
    method: string;
    header: string;
    title: string;
}

/*
    Pos
*/
export interface Pos {
    sx: number;
    sy: number;
}

/*
    State
*/
export interface State {
    seek?: number;
    select: boolean;
    default?: boolean;
    active: boolean;
    fetch: boolean;
    delete: boolean;
}