
import { ref } from 'vue'
import { fetchDocs } from './../services/doc'
import { loadItem, Config } from './../libs/storage'
import { AxiosGeneral } from './../libs/http'
import { Method } from 'axios'
import { findValue } from './../libs/utils'
import { data } from './../store/test'

// 记录每一层的个数
export const depthSecCount = <number[]>[];

// 节点信息
export class Section {
  id = 0; // 节点id
  cid = -1; // 对应的文档的id
  output: any = {}; // 数据
  input: any = {}; // input
  next: Section[] = []; // 保存需要执行的下一个节点
  cond: any = {}; // 结果返回值验证
  result: any = {}; // 保存当前节点结果
  children: Section[] = []; // 
  state = 0; // 该节点默认没有请求
  pos: { x: number, y: number } = { x: 0, y: 0 }
  depth = -1;
}

// 数据
const Tree = ref<Section>(new Section())

//
export let nodeCount = 0;

//
export function nodeCountIncrease(): number {
  return nodeCount++
}

//
export let currentSectionNode = Tree.value;

//
export function changeCurrNode(newValue: Section) {
  currentSectionNode = newValue
}

//
function toString(v: any): string {
  return new String(v).toString();
}

export function test(node: Section) {
  const comment = comments.value[node.cid];
  const url = comment.Url[0].trim();
  const method = comment.Method[0] as Method;
  AxiosGeneral({
    url: Calculation(config.value.testAddr[0], url),
    method: method,
    params: node.input,
    success: (res: any) => {
      if (res) {
        let i = 0;
        const cond = node.cond;
        const keys = Object.keys(cond);
        const len = keys.length;
        // 验证参数
        for (; i < len; i++) {
          const key = keys[i];
          const v = findValue(res, key.split(','), 0)
          if (!v.valid || cond[key] !== toString(v.value)) {
            break;
          }
        }
        // 参数验证结果判断
        node.result.data = res;
        if (i == len) {
          node.result.state = true;
          node.state = 1
          for (let k = 0; k < node.next.length; k++) {
            test(node.next[k]);
          }
        }
      }
      console.log(Tree);
    },

    error: (err: Error) => {
      console.log(err)
    }
  })
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

// 加载配置
const config = ref<Config>(loadItem());

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



