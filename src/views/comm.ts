
import { ref } from 'vue'
import { fetchDocs } from './../services/doc'
import { loadItem, Config } from './../libs/storage'
import { AxiosGeneral } from './../libs/http'
import { Method } from 'axios'
import { findValue } from './../libs/utils'

import { SecInputValue } from './../libs/type'

import { InitAutoTest } from './automated/store'
// 加载配置
const config = ref<Config>(loadItem());


InitAutoTest(config.value.sections);
// 记录每一层的个数
export const depthSecCount = <number[]>[];

/* 
  Section 节点
  id 节点编号
  cid 对应文档数组的下标
  output: 输出结果
  input: 输入
  next: 存储向下节点
  verify: 结果验证
  cond: 
  result: 
  state: 该节点状态(是否运行)
  depth: 节点深度
*/
export class Section {
  id = 0;
  cid = -1;
  output: any = {};
  input: SecInputValue[] = [];
  next: Section[] = [];
  verify: any = {};
  cond: any = {};
  result: any = {};
  state = 0;
  depth = -1;
  reference: string[] = [];
}



/*
  SecState 
*/
export type SecState = 'SUCCESS' | 'ERROR' | "TIMEOUT"


/*
  des
  src
*/
export function VerifyParams(des: any, src: any): boolean {
  const keys = Object.keys(des);
  const klen = keys.length;
  let count = 0;
  for (; count < klen; count++) {
    const key = keys[count];
    const v = findValue(src, key.split(','), 0);
    if (!v.valid || des[key] !== toString(v.value)) {
      break;
    }
  }
  return count == klen;
}


/*
  
*/
export function FormatInputValue(inputs: SecInputValue[]):any {
  const input: any = {};
  inputs.forEach((ele) => {
    input[ele.key] = ele.data;
  })
  return input;
}

/*

*/
export function test(node: Section) {
  const comment = comments.value[node.cid];
  const url = comment.Url[0].trim();
  const method = comment.Method[0] as Method;
  AxiosGeneral({
    url: Calculation(config.value.testAddr[0], url),
    method: method,
    params: FormatInputValue(node.input),
    success: (res: any) => {
      node.result = { state: false, data: res };
      // 请求成功并且参数验证成功
      if (res && VerifyParams(node.verify, res)) {
        node.result.state = true;
        for (let k = 0; k < node.next.length; k++) {
          // 应用父节点的值
          if (node.next[k].reference.length > 0) {
            if (node.next[k].reference[0] === "input") {
              node.next[k].input = node.input;
            }
          }
          test(node.next[k]);
        }
      }
    },
    error: (err: Error) => {
      node.result.data = err;
    }
  })
}













// 数据
const Tree = ref<Section>(new Section())

if (config.value.sections) {
  console.log(config.value.sections);
  Tree.value = config.value.sections;
}

//
export let nodeCount = 0;

//
export function nodeCountIncrease(): number {
  return nodeCount++
}


export const currClickSection = ref<Section>(new Section())
//
export let currentSectionNode = Tree.value;

//
export function changeCurrNode(newValue: Section) {
  currentSectionNode = newValue;
  currClickSection.value = newValue;
}

//
function toString(v: any): string {
  return new String(v).toString();
}




interface Comment {
  EndPos: number
  StartPos: number
  Title: string[]
  Url: string[]
  Header: string[]
  Method: string[]
  Params: string[]
  Return: string[]
  Other: string[]
}



// 对应点击的文档块
const currClickIdx = ref<number>(-1);

// 保存注释
const comments = ref<Comment[]>([]);

// 注释长度
const CommentsLen = ref<number>(0);

// 搜索目录
const SearchList = ref<string[]>([])

interface State {
  name: string
  display: boolean
  zIndex: number
}

// 用于管理图层信息
let currIndex = 1000;
// 主菜单信息
const MainMenuInfo = ref<State[]>([
  {
    name: "self",
    display: true,
    zIndex: 1010,
  },
  {
    name: "home",
    display: false,
    zIndex: 1000,
  },
  {
    name: "menu",
    display: false,
    zIndex: 1000,
  },
  {
    name: "setting",
    display: false,
    zIndex: 1000,
  },
  {
    name: "from",
    display: false,
    zIndex: 1000,
  },
  {
    name: "search",
    display: false,
    zIndex: 1000,
  },
  {
    name: "test",
    display: false,
    zIndex: 1000,
  }
])




// 管理主菜单对应的功能块(display or hidden)
function MainMenuChange(index: number, from?: number) {

  if (from == 10000) {
    MainMenuInfo.value[index].display = true
    return
  }

  switch (index) {
    case 1: // home
      for (let i = 1; i < MainMenuInfo.value.length; i++) {
        MainMenuInfo.value[index].display = !MainMenuInfo.value[index].display
      }
      break
  }

  if (!MainMenuInfo.value[index].display) {
    // 最后打开的图层处于最上层
    MainMenuInfo.value[index].zIndex = currIndex++
  } else {
    // 恢复初始图层
    MainMenuInfo.value[index].zIndex = 1000
  }

  MainMenuInfo.value[index].display = !MainMenuInfo.value[index].display

}

//
function HandleConfig() {
  console.log("config")
}

// 计算请求路径
function Calculation(addr: string, url: string): string {
  const http = config.value.isHttps ? 'https' : 'http'
  return `${http}://${addr}/${url}`
}




export {
  CommentsLen,
  SearchList,
  comments,
  currClickIdx,
  config,
  MainMenuInfo,
  Tree,
  // function
  MainMenuChange,
  Calculation,
  FetchComments,
  HandleConfig,
  _Init,
}

function _Init() {
  console.log("init")
}

function formatComment(v: Comment[]): any {
  const len = v.length;
  for (let i = 0; i < len; i++) {
    v[i].Method[0] = v[i].Method[0].trim().toUpperCase();
    v[i].Title[0] = v[i].Title[0].trim();
    SearchList.value.push(v[i].Title[0]);
  }
  return v
}

// 获取文档
function FetchComments() {

  const addr = config.value.dataAddr
  if (addr.length == 0) return

  fetchDocs({
    url: `http://${addr[0]}/doc/v1/list`,
  }).then(res => {
    if (res.Success) {
      comments.value = formatComment(res.Data);
      CommentsLen.value = comments.value.length;
    }
  })
}


FetchComments();



