
export type WSEvent = (e: MessageEvent, o: __WebSocket) => void

interface Subscription {
    uid: number;
    state: boolean;
    event: WSEvent;
}

interface Option {
    url: string;
    repeatLimit: number;
    reconnectTimeout: number;
    pingPeriod?: number;
    pingMessage?: number;
    pongWait?: number;
    pongMessage?: number;
}

interface HeartMessage {
    Type: number;
    Text: string;
}

export default class __WebSocket {

    readonly url: string;
    readonly repeatLimit: number;
    readonly reconnectTimeout: number;
    readonly pingPeriod: number;
    readonly pingMessage: number;
    readonly pongWait: number;
    readonly pongMessage: number;

    onerror: ((ev: Event) => void) | null = null;
    onclose: ((ev: CloseEvent) => void) | null = null;
    onopen: ((ev: Event) => void) | null = null;
    onreconnect: (() => void) | null = null;

    forbidReconnect = false;
    lockReconnect = false;
    repeat = 0;
    websocket: WebSocket = null as any;
    subs: Subscription[] = [];
    pingTimer: any = null;
    pongTimer: any = null;

    constructor(option: Option) {
        this.url = option.url;
        this.repeatLimit = option.repeatLimit;
        this.reconnectTimeout = option.reconnectTimeout;
        this.pingPeriod = option.pingPeriod || 15000;
        this.pongWait = option.pongWait || 10000;
        this.pingMessage = option.pingMessage || 9;
        this.pongMessage = option.pongMessage || 10;
        window.localStorage.setItem("lock_reconnect", "false");
        this.createWebsocket();
    }

    createWebsocket() {
        try {
            this.websocket = new WebSocket(this.url);
            this.initWatchHandle();
        } catch (e) {
            this.reconnect();
            throw e;
        }
    }

    initWatchHandle(){
        this.websocket.onerror = (ev: Event) => {
            if (this.onerror) { this.onerror(ev) }
            console.log("onerror")
            this.reconnect()
        }
        this.websocket.onclose = (ev: CloseEvent) => {
            if (this.onclose) { this.onclose(ev) }
            console.log("onclose")
            this.reconnect()
        }
        this.websocket.onopen = (ev: Event) => {
            if (this.onopen) { this.onopen(ev) }
            this.repeat = 0;
            this.heartCheck()
        }
        this.websocket.onmessage = (e: MessageEvent) => {
            const msg:HeartMessage = JSON.parse(e.data);
            if(msg.Type !== this.pongMessage) {
                this.subs.forEach(sub => {
                    sub.event(e, this)
                })
            }
            this.heartCheck()
        }
    }

    heartCheck() {
        this.heartReset();
        this.heartStart();
    }

    heartStart() {
        if (this.forbidReconnect) return;
        this.pingTimer = setTimeout(() => {
            this.send(JSON.stringify({Text: "Heartbeat", Type: 9}));
            this.pongTimer = setTimeout(() => {
                this.websocket.close();
            }, this.pongWait);
        }, this.pingPeriod);
    }

    heartReset() {
        clearTimeout(this.pingTimer);
        clearTimeout(this.pongTimer);
    }

    reconnect() {
        console.log(this.repeat);
        if (this.repeatLimit > 0 && this.repeatLimit <= this.repeat) return;
        if (this.lockReconnect && this.forbidReconnect) return;
        this.lockReconnect = true;
        this.repeat++;
        if (this.onreconnect !== null) { this.onreconnect() }
        setTimeout(() => {
            this.createWebsocket();
            this.lockReconnect = false;
        }, this.reconnectTimeout);
    }

    close() {
        this.forbidReconnect = true;
        this.websocket.close();
        this.heartReset();
    }

    unsubscribe(uid: number): boolean {
        const len = this.subs.length;
        for (let i = 0; i < len; i++) {
            if (this.subs[i].uid === uid) {
                this.subs[i].state = false;
                return true;
            }
        }
        return false;
    }

    subscribe(event: WSEvent): number {
        const e = {
            uid: this.subs.length + 1,
            state: true,
            event: event,
        };
        this.subs.push(e);
        return e.uid;
    }

    send(value: string | ArrayBuffer | Blob | ArrayBufferView) {
        this.websocket.send(value);
    }
}


