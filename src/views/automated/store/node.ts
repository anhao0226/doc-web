
import { reactive } from 'vue';

interface NodePos {
    x: number;
    y: number;
}

export interface Node {
    id: number
    count: number
    pos: NodePos
    children: Node[]
    state?: { select: boolean }
}


export class __Node {

    id = -1;
    count = 0;
    pos: NodePos;
    children: __Node[];
    state = { select: false }

    constructor(value: {
        pos: NodePos,
    }) {
        this.pos = value.pos;
        this.children = [];
    }
}



class NodeUtils {

    count = 0;
    list: __Node[] = [];
    currentNode: __Node = null as any;
    baseNode = new __Node({ pos: { x: -1, y: -1 } });

    constructor() {
        this.list = [];
    }

    initNode() {
        //
    }

    check(): boolean {
        return true
    }

    toggleNode(node: __Node) {
        console.log(node);
        this.currentNode && (this.currentNode.state.select = false);
        node.state.select = true;
        this.currentNode = node;
    }

    addRootNode(value: { x: number, y: number }): number {
        this.check()
        const n = new __Node({ pos: { x: value.x, y: value.y } })
        n.id = this.count++;
        this.list.push(n)
        return this.baseNode.children.push(n)
    }

    addChildNode(value: { x: number, y: number }): number {
        this.check()
        const n = new __Node({ pos: { x: value.x, y: value.y } })
        n.id = this.count++;
        this.list.push(n);
        this.currentNode.count++;
        return this.currentNode.children.push(n);
    }

    moveNode(value: { x: number, y: number }) {
        this.currentNode.pos = value;
    }

    findNode(fnode: __Node, list: __Node[], id: number): { fnode: __Node, id: number } {
        for (let i = 0; i < fnode.count; i++) {
            if (list[i].id !== id && list[i].count > 0)
                return this.findNode(list[i], list[i].children, id)
            else return { fnode: list[i], id: i }
        }
        return { fnode: null as any, id: -1 }
    }

    removeNode(): number {
        const ret = this.findNode(this.baseNode, this.baseNode.children, this.currentNode.id);
        if (ret.fnode && ret.id >= 0) {
            ret.fnode.children.splice(ret.id, 1);
            return 1;
        } else return -1
    }

}

const __interface = new NodeUtils();

export function useNodeUtils(): NodeUtils {
    return __interface;
}