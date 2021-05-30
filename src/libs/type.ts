
import { reactive } from 'vue';

export enum MessageType {
  ChatMessageSend=  0,
  InputNotice = 1,
  PingMessage = 9,
  PongMessage = 10,
}

/**
 * 
 */
export interface Value<T> {
  value: T;
  valid?: boolean;
}

export interface Message {
  Type: number;
  Text: string;
}

export interface ChatMessage extends Message {
  Sender: string;
  Receiver: string;
}


export interface NoticeState extends Message {
  State: number;
}


/**
 * 
 */

export class Queue<T> {

  rear = 0;
  front = 0;
  size = 0;
  value = reactive<any[]>([]);

  constructor(size: number) {
    this.size = size + 1;
  }

  reset() {
    this.rear = this.front = 0;
    this.value = [];
  }

  isFull(): boolean {
    if (this.front === (this.rear + 1) % this.size) {
      return true
    }
    return false
  }

  push(v: T): boolean {
    if (this.isFull()) {
      return false
    }
    this.value.push(v);
    this.rear = (this.rear + 1) % this.size;
    return true;
  }

  pop() {
    // TODO
  }

}


/*
  section 
  auto: 自动填充
  type: 自动填充数据类型
  data: 数据
*/
export interface SecInputValue {
  key: string;
  data: any;
  auto: boolean;
  type: string;
}