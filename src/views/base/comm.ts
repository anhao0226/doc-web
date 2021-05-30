
import { ref } from 'vue'
import { fetchDocs } from '../../services/doc'
import { useStorage } from '../../libs/storage'
import { InitAutoTest } from '../automated/store'
import { data } from '../../store/test'

export const menuState = ref<{ display: boolean, icon: string[], name?: string }[]>([
  { 
    name: "menu",
    display: false,
    icon: ['iconfont', 'icon-list'],
  },
  {
    name: "setting",
    display: false,
    icon: ['iconfont', 'icon-settings'],
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
  },
  {
    name: 'user',
    display: false,
    zIndex: 1000
  },
  {
    name: "message",
    display: false,
    zIndex: 2002
  },
  {
    name: "notice",
    display: false,
    zIndex: 2002
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
  const http = 'http'
  return `${http}://${addr}/${url}`
}




export {
  CommentsLen,
  SearchList,
  comments,
  currClickIdx,
  config,
  MainMenuInfo,
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
      console.log(JSON.stringify(res.Data))
      comments.value = formatComment(res.Data);
      CommentsLen.value = comments.value.length;
    }
  })
}


// FetchComments();

comments.value = formatComment(data as any);






