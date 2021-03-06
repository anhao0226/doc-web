import { ref } from 'vue';
import { findValue, toString, getMobile, getUUID } from '../../../libs/utils'
import { useStorage } from '../../../libs/storage'
import { AxiosGeneral } from '../../../libs/http'
import { InputValue, VerifyValue, BaseInfo, Section } from './type';
import { Line } from './draw'
import { useStore } from '@/store';

const store = useStore();
const storage = useStorage();






// cnavas 信息
const CanvasState = { ctx: null, canvas: null }
// 抽屉状态了
const SDrawerState = ref({ menu: false, details: false })
// 当前节点(保存节点最大值)
let SNodeCount = 0;
// 保存根节点
const SRootNode = ref<Section>(new Section(100, 100));
// 保存当前节点
let currNode: Section = SRootNode.value;
// 节点列表(用于渲染)
const SNodeList = ref<Section[]>([]);
// 基本信息
const SBaseInfo = ref<BaseInfo>({ title: "", url: "", header: "", method: "" })
// 保存输入值 (用于渲染)
const SInputVals = ref<InputValue<string>[]>([])
// 保存验证值 (用于渲染)
const SVerifyVals = ref<VerifyValue<string>[]>([]);
// 保存请求值
const SRequestResult = ref<any>({});
// 节点值
function SNodeCountAdd(): number {
    return ++SNodeCount
}


/**
 * 
 * @param to 
 * @param add 
 */
function SDrawLink(to: { x: number, y: number }, add: { x: number, y: number }) {
    const cx = currNode.pos.sx + 25;
    const cy = currNode.pos.sy + 25;
   // const line = new Line(CanvasState.ctx, cx + add.x, cy + add.y, to.x, to.y);
    //line.renderAngle();
}
/**
 * 
 * @param item 
 */
function SLinked(item: Section) {
    const s = currNode;
    for (let i = 0; i < SRootNode.value.children.length; i++) {
        if (SRootNode.value.children[i].id == currNode.id) {
            SRootNode.value.children.splice(i, 1);
            break;
        }
    }
    console.log(s);
    item.children.push(s);
}

export {
    SNodeCount,
    SRootNode,
    SVerifyVals,
    SInputVals,
    SBaseInfo,
    SNodeList,
    SDrawerState,
    CanvasState,
    SRequestResult,
    SLinked,
    SDrawLink,
    SNodeCountAdd,
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
    const http = 'http'
    return `${http}://${addr}/${url}`
}
// 自动生成类型
const autoType = ['mobile', 'uuid'];
//
export function RunSection() { Run(currNode) }
//
function Run(node: Section) {
    console.log(node);
    AxiosGeneral({
        url: Calculation("", node.request.url),
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
export function InitAutoTest() {
    console.log(store.state.secs);

    if (store.state.secs.children) {
        SRootNode.value = store.state.secs;
        currNode = SRootNode.value;
        for (let i = 0; i < SRootNode.value.children.length; i++) {
            traverseSection(SRootNode.value.children[i]);
        }
    }
}

InitAutoTest();