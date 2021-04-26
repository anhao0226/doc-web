import { ref, reactive, Ref } from 'vue';
import { findValue, toString, getMobile, getUUID } from './../../libs/utils'
import { loadItem, saveSections } from './../../libs/storage'
import { AxiosGeneral } from './../../libs/http'
import { InputValue, BaseRequestInfo, Pos, State, VerifyValue, BaseInfo } from './type';
import { Line } from './draw'
import { GBoxStateInfo } from '@/store';

// 加载配置
const config = loadItem();

// 节点数据
export class Section {
    id = -1;
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


    constructor(sx: number, sy: number) {
        this.pos.sx = sx;
        this.pos.sy = sy;
    }
}


// cnavas
export const CanvasState = { ctx: null, canvas: null }


// 抽屉状态了
export const G_DrawerState = ref<{ menu: boolean, info: boolean }>({ menu: false, info: false })
// 当前节点(保存节点最大值)
export let SNodeCount = 0;
// 保存根节点(Tree)

// 标题
export const STitle = ref<string>("");
// 存储节点
export const SSections = ref<Section[]>([]);
// SSections下标
export const SSeek = ref<number>(-1);



const SRootNode = ref<Section>(new Section(100, 100));
// 保存当前节点
let currNode: Section = null as any;
// 节点列表(用于渲染)
const SNodeList = ref<Section[]>([]);
// 基本信息
const SBaseInfo = ref<BaseInfo>({ title: "", url: "", header: "", method: "" })
// 保存输入值 (用于渲染)
const SInputVals = ref<InputValue<string>[]>([])
// 保存验证值 (用于渲染)
const SVerifyVals = ref<VerifyValue<string>[]>([]);
// 切换节点
function SNodeToggle(s: Section) {
    currNode = s;
    SInputVals.value = s.input;
    SVerifyVals.value = s.verify;
    SBaseInfo.value.title = s.request.title;
    G_DrawerState.value.info = true;
    if (!currNode.state.active) {
        G_DrawerState.value.menu = true;
    }
}
// 节点移动
function SNodeMove(pos: { x: number, y: number }) {
    currNode.pos.sx = pos.x;
    currNode.pos.sy = pos.y;
}
// 保存子节点
function SNewChildNode() {
    const fnode = currNode;
    const len = fnode.children.length;
    const child = new Section(0, 0);
    child.id = ++SNodeCount;
    if (len == 0) {
        child.pos.sx = fnode.pos.sx - 100;
        child.pos.sy = fnode.pos.sy + 100;
    } else {
        const end = fnode.children[len - 1];
        child.pos.sx = end.pos.sx + 100;
        child.pos.sy = fnode.pos.sy + 100;
    }
    SNodeList.value.push(child);
    fnode.children.push(child);
    clearRect();
}
// 创建根节点
function SNewRootNode(){
    const node = new Section(100, 100);
    node.id = ++SNodeCount;
    SRootNode.value.children.push(node);
    SNodeList.value.push(node);
}
// 保存节点
function SSaveNode() {
    currNode.request = SBaseInfo.value;
    currNode.input = SInputVals.value;
    currNode.output = SVerifyVals.value;
    saveSections(JSON.stringify(SRootNode.value));
}
// 连接状态
function LinkNode(to: {x: number, y: number}){
    clearRect();
    const cx = currNode.pos.sx + 25;
    const cy = currNode.pos.sy + 25;
    const line = new Line(CanvasState.ctx,cx, cy, to.x, to.y);
    line.renderAngle();
}
//
function Linked(item:Section){
    item.children.push(currNode);
    SRootNode.value.children = SRootNode.value.children.filter(s => {
        return s.id != currNode.id;
    })
}


export {
    SRootNode,
    SVerifyVals,
    SInputVals,
    SBaseInfo,
    SNodeList,
    Linked,
    LinkNode,
    SNodeMove,
    SNodeToggle,
    SNewRootNode,
    SNewChildNode,
    SSaveNode,
}


// 初始化画布信息
export function CanvasInit(ctx: any, canvas: any) {
    CanvasState.canvas = canvas;
    CanvasState.ctx = ctx;
}
//
function traverseNode(des: Section, src: Section): boolean {
    for (let i = 0; i < src.children.length; i++) {
        if (src.children[i].id === des.id) {
            src.children.splice(i, 1);
            return true;
        }
        return traverseNode(des, src.children[i])
    }
    return false;
}
// 删除节点
export function SRemoveNode(seek: number) {
    console.log("test");
    // if (traverseNode(SSections.value[SSeek.value], SRootNode)) {
    //     SSections.value.splice(seek, 1)
    //     SSections.value[seek].state.delete = true;
    // } else {
    //     console.log("not found");
    // }
}
// 清屏重绘
export function clearRect() {
    if (CanvasState.ctx) {
        const ctx = CanvasState.ctx as any;
        ctx.clearRect(0, 0, (CanvasState.canvas as any).width, (CanvasState.canvas as any).height);
        for (let i = 0; i < SRootNode.value.children.length; i++) {
            if (!SRootNode.value.children[i].state.delete) {
                relink(SRootNode.value.children[i]);
            }
        }
    }
}
// 重绘信息
export function relink(s: Section) {
    const fx = s.pos.sx;
    const fy = s.pos.sy;
    for (let i = 0; i < s.children.length; i++) {
        // if (!s.children[i].state.delete) {
        const cn = s.children[i];
        const line = new Line(CanvasState.ctx, fx + 25, fy + 25, cn.pos.sx + 25, cn.pos.sy + 25);
        const an = Math.atan2(line.sy - line.ey, line.sx - line.ex) * Math.PI / 180;
        line.ex += Math.sin(an) * 25;
        line.ey -= Math.cos(an) * 25;
        line.renderAngle();
        relink(cn);
        // }
    }
}
//
export function FormatInputValue(inputs: InputValue<string>[]): any {
    const input: any = {};
    inputs.forEach((ele) => {
        ele.value = ele.detail;
        if (ele.auto) { ele.value = getMobile() }
        input[ele.key] = ele.value;
    })
    return input;
}
//
export function VerifyParams(des: VerifyValue<string>[], src: any): boolean {
    const temp: any = {};
    des.forEach(ele => {
        temp[ele.key] = ele.value;
    })
    const keys = Object.keys(temp);
    const klen = keys.length;
    let count = 0;
    for (; count < klen; count++) {
        const key = keys[count];
        const v = findValue(src, key.split(','), 0);
        if (!v.valid || temp[key] !== toString(v.value)) {
            break;
        }
    }
    return count == klen;
}
// 计算请求路径
export function Calculation(addr: string, url: string): string {
    const http = config.isHttps ? 'https' : 'http'
    return `${http}://${addr}/${url}`
}
// 自动生成类型
const autoType = ['mobile', 'uuid'];
//
export function Run(node: Section) {
    console.log(node);
    AxiosGeneral({
        url: Calculation(config.testAddr[0], node.request.url),
        method: node.request.method,
        params: FormatInputValue(node.input),
        success: (res: any) => {
            node.result = { state: false, data: res };
            // 请求成功并且参数验证成功
            if (res && VerifyParams(node.verify, res)) {
                node.result.state = true;
                node.state.fetch = true;
                for (let k = 0; k < node.children.length; k++) {
                    const t = node.children[k].reference[0]
                    node.children[k].input.map(des => {
                        des.auto = false;
                        switch (des.type) {
                            case "f-input": // 引用父类的输入值
                                node.input.forEach(src => {
                                    if (des.key === src.key) {
                                        des.value = src.value;
                                    }
                                })
                                break;
                            case "f-result": //  引用父类请求结果
                                {
                                    console.log("f-result");
                                    const v = findValue(res, des.detail.split(","), 0);
                                    console.log();
                                    if (v.valid) { des.value = v.value }
                                }
                                break;
                            case "custom": // 自定义
                                des.value = des.detail;
                                break;

                        }
                        return des;
                    })
                    // 运行子节点
                    Run(node.children[k]);
                }
            }
        },
        error: (err: Error) => {
            console.log(err);
            node.result.data = err;
        }
    })
}
//
export function traverseSection(s: Section) {
    s.state.fetch = false;
    s.state.select = false;
    SNodeList.value.push(s);
    SNodeCount = Math.max(s.id, SNodeCount);
    for (let i = 0; i < s.children.length; i++) {
        traverseSection(s.children[i]);
    }
}
// 对外提供初始化方法(外部调用)
export function InitAutoTest(params: any) {
    if (params) {
        SRootNode.value = params; //
        currNode = SRootNode.value;
        for (let i = 0; i < SRootNode.value.children.length; i++) {
            traverseSection(SRootNode.value.children[i]);
        }
    }
}