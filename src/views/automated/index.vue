<template>
  <div class="auto_wrap">
    <div class="auto_wrapper">
      <div class="container">
        <!-- 功能区 -->
        <div class="op-container">
          <ul class="op-menu">
            <li><router-link :to="{ name: 'home' }">Home</router-link></li>
            <li @click="addRootNode">Reset</li>
            <li @click="addRootNode">Root</li>
            <li @click="addChildNode">Child</li>
            <li @click="intoLinekState">Link</li>
            <li @click="delCurrNode">Del</li>
            <li @click="startRun">Run</li>
            <li>
              <span class="box-state success">success</span>
              <span class="box-state error">error</span>
            </li>
          </ul>
        </div>
        <!-- 节点渲染区域 -->
        <Node
          v-for="(item, index) in SNodeList"
          :key="index"
          :value="item"
          @mousedown="nodeMousedownEvent($event, item)"
          @mouseup="nodeMouseupEvent"
          @mouseover="showGBox($event, item)"
        ></Node>
        <!-- canvas -->
        <canvas id="canvas" width="2000" height="2000"></canvas>
      </div>
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

import { Line } from "./draw";

import { Section } from './type'

import { GBoxStateInfo } from "./../../store/index";

import {
  clearRect,
  SNodeToggle,
  SNewRootNode,
  SNewChildNode,
  CanvasInit,
  SRemoveNode,
  Run,
  SNodeList,
  SNodeMove,
  SBaseInfo,
  LinkNode,
  Linked,
} from "./store";

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
    let canvas: any = {};
    let ctx: any = {};
    const currClickIdx = ref<number>(0);
    let timer: any = null;

    let isMove = false;
    let secSeek = ref<number>(-1);

    // 操作状态 0 link ]
    let state = -1;

    // 状态切换
    const changeOpState = () => {
      console.log("test");
    };

    const nodeMousedownEvent = (e: any, item: Section) => {
      if(state == 0) {
        Linked(item);
        state = -1
        clearRect();
        return
      }
      isMove = true;
      clickLeft = e.clientX - item.pos.sx;
      clickTop = e.clientY - item.pos.sy;
      SNodeToggle(item);
    };

    // node to node
    const intoLinekState = () => {
      state = 0;
    };

    const nodeMouseupEvent = () => {
      isMove = false;
    };

    const showGBox = (e: any, item: Section) => {
      clearTimeout(timer);
      GBoxStateInfo.value.x = e.clientX - e.offsetX + 50;
      GBoxStateInfo.value.y = e.clientY - e.offsetY;
      GBoxStateInfo.value.data = item.request.title;
      if (!GBoxStateInfo.value.state) {
        GBoxStateInfo.value.state = false;
        timer = setTimeout(() => {
          GBoxStateInfo.value.state = true;
        }, 300);
      }
    };

    onMounted(() => {
      // 初始化证书
      canvas = document.getElementById("canvas");
      ctx = (canvas as any).getContext("2d");
      CanvasInit(ctx, canvas);
      clearRect();

      window.addEventListener("mousemove", (e: any) => {
        // 连接状态
        if (state == 0) {
          LinkNode({ x: e.clientX, y: e.clientY });
          return;
        }
        // 移动状态
        if (isMove) {
          SNodeMove({ x: e.clientX - clickLeft, y: e.clientY - clickTop });
          GBoxStateInfo.value.x = e.clientX - e.offsetX + 50;
          GBoxStateInfo.value.y = e.clientY - e.offsetY;
          clearRect();
        }
      });
    });

    // 添加根节点
    const addRootNode = () => {
      SNewRootNode();
    };
    // 添加子节点
    const addChildNode = () => {
      SNewChildNode();
    };

    const delCurrNode = () => {
      SRemoveNode(secSeek.value);
      clearRect();
    };

    const startRun = () => {
      Run(null as any);
    };

    return {
      addRootNode,
      addChildNode,
      startRun,
      delCurrNode,
      currClickIdx,
      showGBox,
      nodeMousedownEvent,
      nodeMouseupEvent,
      SNodeList,
      intoLinekState,
    };
  },
});

/*
有效期3年 (交易金额,信用积分 比例3%) - 所得税

*/
</script>
<style scoped>
.auto_wrap {
  width: 100%;
  height: 100%;
  background-color: brown;
}
.auto_wrapper {
  position: relative;
  overflow: scroll;
  width: 100%;
  height: 100%;
  background-color: #98aaa7;
}

.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 2000px;
  height: 2000px;
  z-index: 10001;
  background-color: sandybrown;
}

.op-container {
  position: fixed;
  width: 100%;
  height: 50px;
  top: 0;
  left: 0;
  z-index: 1002;
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
/*  */
.op-menu .success::before {
  background-color: #67c23a;
}
/*  */
.op-menu .error::before {
  background-color: #f56c6c;
}

.box {
  width: 50px;
  height: 50px;
  background-color: #6495ed;
  position: absolute;
  cursor: pointer;
  z-index: 1001;
  border-radius: 50%;
}

.box-select {
  background-color: #409eff;
}

.box-success {
  background-color: #a3b2ad;
}

.box-error {
  background-color: #f56c6c;
}

#canvas {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
}
</style>
