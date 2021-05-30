
import { ref } from 'vue'
import { fetchDocs } from '../../services/doc'
import { useStorage } from '../../libs/storage'
import { InitAutoTest } from '../automated/store'
import { data } from '../../store/test'

export const menuState = ref<{ display: boolean, icon: string[], name?: string }[]>([
  { 
    name: "notice",
    display: false,
    icon: ['iconfont', 'icon-xiaoxizhongxin'],
  },
  {
    name: "setting",
    display: false,
    icon: ['iconfont', 'icon-shezhi'],
  },
  {
    name: "message",
    display: false,
    icon: ['iconfont', 'icon-comment'],
  },
  {
    name: "search",
    display: false,
    icon: ['iconfont', 'icon-search'],
  },
  {
    name: "from",
    display: false,
    icon: ['iconfont', 'icon-form'],
  }
])










const config = useStorage();
// 记录每一层的个数
export const depthSecCount = <number[]>[];

//
export let nodeCount = 0;

//
export function nodeCountIncrease(): number {
  return nodeCount++
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

function HandleConfig() {
  console.log("config")
}

// 计算请求路径
function Calculation(addr: string, url: string): string {
  const http = 'http'
  return `${http}://${addr}/${url}`
}




export {
  CommentsLen,
  SearchList,
  comments,
  currClickIdx,
  config,
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
      console.log(JSON.stringify(res.Data))
      comments.value = formatComment(res.Data);
      CommentsLen.value = comments.value.length;
    }
  })
}


// FetchComments();

comments.value = formatComment(data as any);






