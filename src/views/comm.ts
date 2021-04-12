
import { ref } from 'vue'
import { fetchDocs } from './../services/doc'
import { loadItem, Config } from './../libs/storage'

// 
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

// 管理主菜单对应的功能块
const MainMenu = ref<boolean[]>([true, false, false, false, false, false])
function MainMenuChange(index: number) {
  console.log(index)
  switch(index) {
    case 1:
      for(let i = 1; i < MainMenu.value.length; i++){
        MainMenu.value[i] = false
      }
      break
  }
  MainMenu.value[index] = !MainMenu.value[index]
}

//
function HandleConfig() {
  console.log("config")
}

//
function Calculation(addr: string, url: string): string {
  const http = config.value.isHttps ? 'https' : 'http'
  return `${http}://${addr}/${url}`
}




export {
  MainMenu,
  CommentsLen,
  SearchList,
  comments,
  currClickIdx,
  config,
  // function
  MainMenuChange,
  Calculation,
  FetchComments,
  HandleConfig,
}


// 获取文档
function FetchComments() {

  const addr = config.value.dataAddr
  if (addr.length == 0) return

  fetchDocs({
    url: `http://${addr[0]}/doc/v1/list`,
  }).then(res => {
    if (res.Success) {
      // 处理数据 
      const len = res.Data.length;
      for (let i = 0; i < len; i++) {
        res.Data[i].Method[0] = (res.Data[i].Method[0] as string).trim().toUpperCase();
        res.Data[i].Title[0] = (res.Data[i].Title[0] as string).trim();
        SearchList.value.push(res.Data[i].Title[0]);
      }
      comments.value = res.Data;
      CommentsLen.value = comments.value.length;
    }
  })
}

