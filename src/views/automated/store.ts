import { ref, reactive, Ref } from 'vue';
import { findValue, toString, getMobile, getUUID } from './../../libs/utils'
import { loadItem } from './../../libs/storage'
import { AxiosGeneral } from './../../libs/http'
import { InputValue, BaseRequestInfo, Pos, State, VerifyValue } from './type';
import { Line } from './draw'

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
    state: State = { select: false, active: false, fetch: false, delete: false };

    constructor(sx: number, sy: number) {
        this.pos.sx = sx;
        this.pos.sy = sy;
    }
}

//
export const CanvasState = { ctx: null, canvas: null }
// 保存输入值 (用于渲染)
export const SInputVals = ref<InputValue<string>[]>([])
// 保存验证值 (用于渲染)
export const SVerifyVals = ref<VerifyValue<string>[]>([]);
// 抽屉状态
export const G_DrawerState = ref<{ menu: boolean, info: boolean }>({ menu: false, info: false })
// 保存根节点
export let SRootNode = new Section(100, 100);
// 标题
export const STitle = ref<string>("");
// 存储节点
export const SSections = ref<Section[]>([]);
// SSections下标
export const SSeek = ref<number>(-1);
// 初始化画布信息
export function CanvasInit(ctx: any, canvas: any) {
    CanvasState.canvas = canvas;
    CanvasState.ctx = ctx;
}
// 切换节点
export function SNodeToggle(seek: number) {
    SVerifyVals.value = SSections.value[seek].verify;
    SInputVals.value = SSections.value[seek].input;
    STitle.value = SSections.value[seek].request.title;
    G_DrawerState.value.info = true;
    if (!SSections.value[seek].state.active) {
        G_DrawerState.value.menu = true;
    }
}
// 添加子节点
export function SNewChildNode(seek: number) {
    const fnode = SSections.value[seek];
    const len = fnode.children.length;
    const child = new Section(0, 0);
    if (len == 0) {
        child.pos.sx = fnode.pos.sx - 100;
        child.pos.sy = fnode.pos.sy + 100;
    } else {
        const end = fnode.children[len - 1];
        child.pos.sx = end.pos.sx + 100;
        child.pos.sy = fnode.pos.sy + 100;
    }
    SSections.value.push(child);
    fnode.children.push(child);
    clearRect();

}
// 添加根节点
export function SNewRootNode() {
    const node = new Section(100, 100);
    SRootNode.children.push(node);
    SSections.value.push(node);
}
// 保存节点
export function SSaveNode(request: any) {
    SSections.value[SSeek.value].state.active = true;
    SSections.value[SSeek.value].input = SInputVals.value;
    SSections.value[SSeek.value].verify = SVerifyVals.value;
    if (request != null) { //
        SSections.value[SSeek.value].request = request;
    }
}

// 清屏重绘
export function clearRect() {
    if (CanvasState.ctx) {
        const ctx = CanvasState.ctx as any;
        ctx.clearRect(0, 0, (CanvasState.canvas as any).width, (CanvasState.canvas as any).height);
        for (let i = 0; i < SRootNode.children.length; i++) {
            if (!SRootNode.children[i].state.delete) {
                relink(SRootNode.children[i]);
            }
        }
    }
}
// 重绘信息
export function relink(s: Section) {
    const fx = s.pos.sx;
    const fy = s.pos.sy;
    for (let i = 0; i < s.children.length; i++) {
        if (!s.children[i].state.delete) {
            const cn = s.children[i];
            const line = new Line(CanvasState.ctx, fx + 25, fy + 25, cn.pos.sx + 25, cn.pos.sy + 25);
            const an = Math.atan2(line.sy - line.ey, line.sx - line.ex) * Math.PI / 180;
            line.ex += Math.sin(an) * 25;
            line.ey -= Math.cos(an) * 25;
            line.renderAngle();
            relink(cn);
        }
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
    if (!s.state.delete) {
        SSections.value.push(s);
    }
    for (let i = 0; i < s.children.length; i++) {
        traverseSection(s.children[i]);
    }
}
// 对外提供初始化方法(外部调用)
export function InitAutoTest(params: Section) {
    if (params) {
        SRootNode = params;
        SRootNode.children.forEach(ele => {
            traverseSection(ele);
        })
    }
}