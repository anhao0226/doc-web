import { ref, reactive, Ref } from 'vue';
import { findValue, toString, getMobile, getUUID } from './../../libs/utils'
import { loadItem } from './../../libs/storage'
import { AxiosGeneral } from './../../libs/http'

const config = loadItem();

// 返回值
export interface Value<T> {
    value: T;
    valid?: boolean; // 有效
}

// 测试输入值
export interface InputValue<U> extends Value<U> {
    key: string; // 
    auto: boolean; // 自动获取
    type: string; // 值类型
    detail: string;
}

// 验证值
export interface VerifyValue<U> extends Value<U> {
    key: string
}

// 测试基础请求参数
export interface RequestInfo {
    url: string
    method: string
    header: string
    title: string
}

// 定位点
export interface Pos {
    sx: number;
    sy: number;
}

// 节点状态
export interface State {
    seek?: number;
    select: boolean;
    default?: boolean;
    active: boolean;
    fetch: boolean;
    delete: boolean;
}

// 节点数据
export class Section {
    id = -1;
    input: InputValue<string>[] = [];
    output: any = {};
    verify: any = [];
    request: RequestInfo = { url: '', method: '', header: '', title: '' };
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

// 全局信息
class Global {


    canvasInfo: { canvas: any, context: any } = { canvas: null, context: null }
    // 当前节点
    currSection: Section = (null as any);
    constructor(v: { s: Section }) {
        this.currSection = v.s;
    }

    // 更新画布
    updateCanvas(canvas: any, context: any) {
        this.canvasInfo.canvas = canvas;
        this.canvasInfo.context = context;
    }

}

export let G_NodeCount = -1;
// 保存输入值 (用于渲染)
export const SInputVals = ref<InputValue<string>[]>([])
// 保存验证值 (用于渲染)
export const SVerifyVals = ref<VerifyValue<string>[]>([]);
// 保存引用值 (default:默认输入 input:调用父类的输入值 result:使用父类的结果)
export const SReference = ref<string[]>(['custom']);
// 保存标题
export const G_Title = ref<string>("");
// 抽屉状态
export const G_DrawerState = ref<{ menu: boolean, info: boolean }>({ menu: false, info: false })
// 当前节点
export let G_CurrNode: Section = new Section(100, 100);
// 切换当前节点
export function G_ToggleCurrNode(s: Section): Section {
    console.log(s);
    SInputVals.value = s.input;
    SVerifyVals.value = s.verify;
    SReference.value = s.reference;
    G_CurrNode = s;
    G_DrawerState.value.info = true;
    if (!s.state.active) {
        G_DrawerState.value.menu = true;
    }
    return s;
}
// 保存节点信息
export function G_SaveNodeInfo(
    op: number,
    request: any) {
    G_CurrNode.state.active = true;
    G_CurrNode.input = SInputVals.value;
    G_CurrNode.verify = SVerifyVals.value;
    G_CurrNode.reference = SReference.value;
    console.log(request);
    if (request != null) {
        G_CurrNode.request = request as any;
    }
}
// 添加节点
export function G_AddChildNode() {
    const fnode = G_CurrNode;
    const len = fnode.children.length;
    const n = new Section(0, 0);
    n.id = ++G_NodeCount;
    if (len == 0) {
        n.pos.sx = fnode.pos.sx - 100;
        n.pos.sy = fnode.pos.sy + 100;
    } else {
        const end = fnode.children[len - 1];
        n.pos.sx = end.pos.sx + 100;
        n.pos.sy = fnode.pos.sy + 100;
    }
    sections.value.push(n);
    G_CurrNode.children.push(n);

    clearRect();
}
//添加根节点
export function G_AddRootNode() {
    const sec = new Section(100, 100);
    sections.value.push(sec);
    tree.value.children.push(sec);
}

// 保存数据
export const sections = ref<Section[]>([]);

//
export const SSections: Ref<Section>[] = [];
// 
export const SSecIndex = ref<number>(0);

// {x,y}
// 结构树
export const tree = ref<Section>(new Section(300, 300))
// 组件信息管理
export let GlobalState = new Global({ s: tree.value });
//
export function traverseSection(s: Section) {
    if (!s.state.delete) {
        sections.value.push(s);
        // 保存数据
        SSections.push(ref(s))
    }
    for (let i = 0; i < s.children.length; i++) {
        traverseSection(s.children[i]);
    }
}
// 对外提供初始化方法(外部调用)
export function InitAutoTest(params: Section) {
    if (params) {
        tree.value = params;
        GlobalState = new Global({ s: tree.value })
        tree.value.children.forEach(ele => {
            traverseSection(ele);
        })
    }
}
//
export class Line {
    sx = 0;
    sy = 0;
    ex = 0;
    ey = 0;
    headlen = 20;
    theta = 20;
    width = 3;
    color = "#fff";
    ctx: any = null;

    constructor(ctx: any, sx: number, sy: number, ex: number, ey: number) {
        this.ctx = ctx;
        this.sx = sx;
        this.sy = sy;
        this.ex = ex;
        this.ey = ey;
    }

    //
    renderAngle() {
        const angle =
            (Math.atan2(this.ey - this.sy, this.ex - this.sx) * 180) / Math.PI,
            angle1 = ((angle + this.theta) * Math.PI) / 180,
            angle2 = ((angle - this.theta) * Math.PI) / 180,
            topX = this.headlen * Math.cos(angle1),
            topY = this.headlen * Math.sin(angle1),
            botX = this.headlen * Math.cos(angle2),
            botY = this.headlen * Math.sin(angle2);

        this.ctx.save();
        this.ctx.beginPath();
        let arrowX = this.ex + topX;
        let arrowY = this.ey + topY;
        this.ctx.moveTo(this.sx, this.sy);
        this.ctx.lineTo(this.ex, this.ey);
        arrowX = this.ex - topX;
        arrowY = this.ey - topY;
        this.ctx.moveTo(arrowX, arrowY);
        this.ctx.lineTo(this.ex, this.ey);
        arrowX = this.ex - botX;
        arrowY = this.ey - botY;
        this.ctx.lineTo(arrowX, arrowY);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.width;
        this.ctx.stroke();
        this.ctx.restore();
    }
    //
    render() {
        this.ctx.beginPath();
        this.ctx.moveTo(this.sx, this.sy);
        this.ctx.lineTo(this.ex, this.ey);
        const angle = Math.atan((this.ey - this.sy) / (this.ex - this.ey))
        this.ctx.stroke();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.width;
        this.ctx.closePath();
    }
    // 数据更新
    update(v: { color: string, width: number }) {
        this.color = v.color;
        this.width = v.width;
    }
}
// 清屏重绘
export function clearRect() {
    if (GlobalState.canvasInfo.context) {
        GlobalState.canvasInfo.context.clearRect(0, 0, GlobalState.canvasInfo.canvas.width, GlobalState.canvasInfo.canvas.height);
        for (let i = 0; i < tree.value.children.length; i++) {
            if (!tree.value.children[i].state.delete) {
                relink(tree.value.children[i]);
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
            const line = new Line(GlobalState.canvasInfo.context, fx + 25, fy + 25, cn.pos.sx + 25, cn.pos.sy + 25);
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
function Calculation(addr: string, url: string): string {
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
