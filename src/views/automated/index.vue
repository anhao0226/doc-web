<template>
  <div class="auto_wrap">
    <div
      class="auto_wrapper"
      @mousedown.prevent.stop="mousedownEvent($event, 3, null)"
      @mouseup="mouseupEvent"
    >
      <!-- 功能区 -->
      <div class="op-container">
        <ul class="op-menu">
          <li><router-link :to="{ name: 'home' }">Home</router-link></li>
          <li @click="addRootNode">Reset</li>
          <li @click="addRootNode">Root</li>
          <li @click="addChildNode">Child</li>
          <li @click="intoLinekState">Link</li>
          <li @click="delCurrNode">Remove</li>
          <li @click="saveNode">Save</li>
          <li @click="startRun">Run</li>
          <li>
            <span class="box-state default">success</span>
            <span class="box-state success">success</span>
            <span class="box-state error">error</span>
          </li>
        </ul>
      </div>
      <!-- container 用来移动 -->
      <div class="container">
        <Node
          v-for="(item, index) in SNodeList"
          :key="index"
          :value="item"
          @mousedown.prevent.stop="mousedownEvent($event, 1, item)"
          @mouseup="mouseupEvent"
          @mouseover="showGBox($event, item)"
        ></Node>
      </div>
      <!-- canvas -->
      <canvas id="canvas" width="3000" height="3000"></canvas>
    </div>
  </div>
  <!-- details -->
  <Details></Details>
  <!-- menu -->
  <Menu></Menu>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Menu from "./menu.vue";
import Details from "./details.vue";
import Node from "./node.vue";
import { Section } from "./store/type";

import { GBoxStateInfo } from "./../../store/index";

import {
  SCanvasRepaint,
  SNodeToggle,
  SNewRootNode,
  SNewChildNode,
  CanvasInit,
  RunSection,
  SNodeList,
  SNodeMove,
  SDrawLink,
  SLinked,
  SRemoveNode,
  SSaveNode,
} from "./store";

enum Trigger {
  NORMAL = 0,
  NODE_MOVE,
  NODE_LINK,
  BG_MOVE,
}

export default defineComponent({
  name: "Tree",
  components: {
    Menu,
    Details,
    Node,
  },
  setup() {
    let clickLeft = 0;
    let clickTop = 0;
    let timer: any = null;
    let containerEle = null as any;
    let containerMove: { x: number; y: number } = { x: 0, y: 0 };
    const triggerEvent = ref<Trigger>(Trigger.NORMAL);

    const showGBox = (e: any, item: Section) => {
      clearTimeout(timer);
      GBoxStateInfo.value.x = e.clientX - e.offsetX + 50;
      GBoxStateInfo.value.y = e.clientY - e.offsetY;
      GBoxStateInfo.value.data = item.request.title || "未初始化";
      if (!GBoxStateInfo.value.state) {
        GBoxStateInfo.value.state = false;
        timer = setTimeout(() => {
          GBoxStateInfo.value.state = true;
        }, 300);
      }
    };

    onMounted(() => {
      const canvas = document.getElementById("canvas");
      const ctx = (canvas as any).getContext("2d");
      CanvasInit(ctx, canvas);
      SCanvasRepaint({ x: 0, y: 0 });
      containerEle = document.getElementsByClassName("container")[0] as any;
      window.addEventListener("mousemove", mousemoveEvent);
    });
    // mouseup
    const mouseupEvent = (e: any) => {
      switch (triggerEvent.value) {
        case Trigger.BG_MOVE:
          containerMove.x = parseInt(containerEle.style.left) || 0;
          containerMove.y = parseInt(containerEle.style.top) || 0;
          triggerEvent.value = Trigger.NORMAL;
          break;
        case Trigger.NODE_MOVE:
          triggerEvent.value = Trigger.NORMAL;
          break;
      }
    };
    // mousedown
    const mousedownEvent = (e: any, state: Trigger, s: any) => {
      triggerEvent.value =
        triggerEvent.value == Trigger.NODE_LINK ? Trigger.NODE_LINK : state;

      switch (triggerEvent.value) {
        case Trigger.NODE_MOVE:
          clickLeft = e.clientX - s.pos.sx;
          clickTop = e.clientY - s.pos.sy;
          SNodeToggle(s);
          break;
        case Trigger.NODE_LINK:
          SLinked(s);
          SCanvasRepaint({ x: containerMove.x, y: containerMove.y });
          triggerEvent.value = Trigger.NORMAL;
          break;
        case Trigger.BG_MOVE:
          clickLeft = e.clientX - containerMove.x;
          clickTop = e.clientY - containerMove.y;
          break;
      }
    };
    // mousemove
    const mousemoveEvent = (e: any) => {
      switch (triggerEvent.value) {
        case Trigger.NODE_MOVE:
          SNodeMove({ x: e.clientX - clickLeft, y: e.clientY - clickTop });
          SCanvasRepaint({ x: containerMove.x, y: containerMove.y });
          GBoxStateInfo.value.x = e.clientX - e.offsetX + 50;
          GBoxStateInfo.value.y = e.clientY - e.offsetY;
          break;
        case Trigger.NODE_LINK:
          SCanvasRepaint({ x: containerMove.x, y: containerMove.y });
          SDrawLink({
            x: e.clientX + 25 + containerMove.x,
            y: e.clientY + 25 + containerMove.y,
          });
          break;
        case Trigger.BG_MOVE:
          containerEle.style.left = `${e.clientX - clickLeft}px`;
          containerEle.style.top = `${e.clientY - clickTop}px`;
          SCanvasRepaint({ x: e.clientX - clickLeft, y: e.clientY - clickTop });
          break;
      }
    };
    //
    const intoLinekState = () => {
      if (triggerEvent.value == Trigger.NORMAL) {
        triggerEvent.value = Trigger.NODE_LINK;
      } else {
        triggerEvent.value = Trigger.NORMAL;
      }
    };
    //
    const saveNode = () => {
      SSaveNode();
    };
    // 添加根节点
    const addRootNode = () => {
      SNewRootNode();
      SCanvasRepaint({ x: containerMove.x, y: containerMove.y });
    };
    // 添加子节点
    const addChildNode = () => {
      SNewChildNode();
      SCanvasRepaint({ x: containerMove.x, y: containerMove.y });
    };
    //
    const delCurrNode = () => {
      SRemoveNode();
      SCanvasRepaint({ x: containerMove.x, y: containerMove.y });
    };
    //
    const startRun = () => {
      RunSection();
    };

    return {
      mouseupEvent,
      mousedownEvent,
      mousemoveEvent,

      addRootNode,
      addChildNode,
      startRun,
      delCurrNode,
      showGBox,
      SNodeList,
      intoLinekState,
      saveNode,
    };
  },
});

/*
有效期3年 (交易金额,信用积分 比例3%) - 所得税

*/
</script>
<style scoped>
/* select */
.menu-select {
  background-color: cadetblue;
  color: #fff;
}
/*  */
.auto_wrap {
  width: 100%;
  height: 100%;
  background-color: red;
  overflow: hidden;
}
/*  */
.auto_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: green;
  z-index: 2900;
}

/* z-index:3000 */
.container {
  position: relative;
  left: 0;
  top: 0;
  z-index: 3002;
}
/* z-index:3001 */
#canvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 3001;
  background-color: rgb(219, 219, 219, 0.8);
}

.op-container {
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  z-index: 3003;
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.op-menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: inherit;
}
.op-menu li {
  /* background-color: rosybrown; */
  height: inherit;
  padding: 0 20px;
  margin: 0 4px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  transition: 0.3s;
}
.op-menu li:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.op-menu .box-state {
  padding: 0 10px;
}

.op-menu .box-state::before {
  content: "";
  width: 10px;
  height: 10px;
  background-color: #6495ed;
  display: inline-block;
  border-radius: 50%;
  margin-right: 6px;
}

.op-menu .default::before {
  background-color: #6495ed;
}
/*  */
.op-menu .success::before {
  background-color: #67c23a;
}
/*  */
.op-menu .error::before {
  background-color: #f56c6c;
}

/* default */
.box {
  width: 50px;
  height: 50px;
  background-color: #6495ed;
  position: absolute;
  cursor: pointer;
  z-index: 1001;
  border-radius: 50%;
}
/* select */
.box-select {
  background-color: #409eff;
}
/* success */
.box-success {
  background-color: #a3b2ad;
}
/* error */
.box-error {
  background-color: #f56c6c;
}
</style>
