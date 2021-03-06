
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
    default 0
    select 1
    delete 2
    
*/
export interface State {
    select: boolean;
    active: boolean;
    fetch: boolean;
    delete: boolean;
    default: number;
}


/*
    BaseInfo
*/
export interface BaseInfo {
    title: string
    method: string
    header: string
    url: string
}

/*
    Section
*/

export interface Outline {
    state: boolean;
}

export class Section {
    id = -1;
    count = 0; // 数量
    input: InputValue<string>[] = [];
    output: any = {};
    verify: any = [];
    request: BaseRequestInfo = { url: '', method: '', header: '', title: '' };
    result: any = {};
    reference: string[] = [];
    pos: Pos = { sx: 0, sy: 0 }
    children: Section[] = [];
    // 0 default] 1 select]
    state: State = { default: 0, select: false, active: false, fetch: false, delete: false };
    outline: Outline = { state: false }

    constructor(sx: number, sy: number) {
        this.pos.sx = sx;
        this.pos.sy = sy;
    }
}