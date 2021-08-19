import { defineComponent, onMounted, ref, watch } from "vue";
import Menu from "./../menu.vue";
import Details from './../details.vue';
import Node from "./../node.vue";
import Toolbar from "./../toolbar.vue";
// import Outline from "./outline.vue";

import { useNodeUtils, __Node, } from "../store/node";
import { Canvas } from "../store/canvas";
export default defineComponent({
  components: {
    Menu,
    Details,
    Node,
    Toolbar,
  },

  setup() {

    let canvasUtil: Canvas = null as any;
    const nodeUtil = ref(useNodeUtils());
    const diff = { left: 0, top: 0 }
    const containerPos = ref({ x: 0, y: 0 });
    const canvasArea = { w: 3000, h: 3000 }
    const viewArea = { w: 0, h: 0 }

    onMounted(() => {
      const canvas = document.getElementById("canvas");
      const ctx = (canvas as any).getContext("2d");
      canvasUtil = new Canvas({ canvas: canvas, context: ctx });
      const wrapper = document.getElementById("wrapper");
      viewArea.h = wrapper!.clientHeight;
      viewArea.w = wrapper!.clientWidth;
    });

    enum OpState {
      Normal = 0,
      Node,
      Background,
    }

    const currentOpState = ref<OpState>(OpState.Normal);

    const boxClickEvent = (e: any, n: __Node, state: OpState) => {
      switch (state) {
        case OpState.Node:
          nodeUtil.value.toggleNode(n);
          diff.left = e.clientX - n.pos.x;
          diff.top = e.clientY - n.pos.y;
          break;
        case OpState.Background:
          diff.left = e.clientX - containerPos.value.x;
          diff.top = e.clientY - containerPos.value.y;
          break;
      }
      currentOpState.value = state;
      window.addEventListener("mousemove", mousemoveEvent);
    }

    const mouseupEvent = (e: any, state: number) => {
      currentOpState.value = OpState.Normal;
      window.removeEventListener("mousemove", mousemoveEvent);
    }

    const mousemoveEvent = (e: any) => {
      console.log(currentOpState.value);
      switch (currentOpState.value) {
        case OpState.Node:
          nodeUtil.value.moveNode({ x: e.clientX - diff.left, y: e.clientY - diff.top })
          canvasUtil.canvasRepaint(nodeUtil.value.baseNode);
          break;
        case OpState.Background:
          containerPos.value.x = e.clientX - diff.left;
          containerPos.value.y = e.clientY - diff.top;
          break;
      }
    };



    // 菜单点击
    const menuClickEvent = (i: number) => {
      switch (i) {
        case 1:
          console.log("Reset");
          break;
        case 2:
          nodeUtil.value.addRootNode({ x: viewArea.w / 2, y: viewArea.h / 2 });
          canvasUtil.canvasRepaint(nodeUtil.value.baseNode);
          break;
        case 3:
          {
            const { pos, count } = nodeUtil.value.currentNode;
            nodeUtil.value.addChildNode({ x: pos.x, y: pos.y + 130 });
            const mid = parseInt(`${(count + 1) / 2}`)
            const seek = pos.x - 105 * mid;
            nodeUtil.value.currentNode.children.forEach((ele:__Node, idx:number) => {
              ele.pos.x = seek + idx * 105;
            })
            canvasUtil.canvasRepaint(nodeUtil.value.baseNode);
          }
          break;
        case 4:
          break;
        case 5:
          nodeUtil.value.removeNode();
          canvasUtil.canvasRepaint(nodeUtil.value.baseNode);
          break;
        case 6:
          break;
        case 7:
          // RunSection();
          break;
        default:
      }
    };

    return {
      containerPos,
      canvasArea,
      mousemoveEvent,
      menuClickEvent,
      boxClickEvent,
      mouseupEvent,
      nodeUtil,
    };
  },
});