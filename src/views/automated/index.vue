<template>
  <div class="auto_wrap">
    <div class="auto_wrapper">
      <div class="container">
        <!-- 功能区 -->
        <div class="op-container">
          <ul class="op-menu">
            <li @click="addRootNode">Root</li>
            <li @click="addChildNode">Child</li>
            <li @click="addChildNode">Info</li>
            <li @click="delCurrNode">Del</li>
            <li @click="startRun">Run</li>
          </ul>
        </div>
        <!-- 节点渲染区域 -->
        <div
          v-for="(item, index) in sections"
          :key="index"
          v-show="!item.state.delete"
          @mousedown="mousedownEvent($event, item)"
          @mouseup="mouseupEvent($event)"
          :style="{
            left: `${item.pos.sx}px`,
            top: `${item.pos.sy}px`,
            'background-color': item.state.fetch ? '#67C23A' : '#693f95'
          }"
          :class="boxStyle"
        ></div>
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
import { computed, defineComponent, onMounted, ref } from "vue";
import Menu from "./menu.vue";
import Details from "./details.vue";

import {
  Section,
  clearRect,
  sections,
  GlobalState,
  Run,
  G_CurrNode,
  G_ToggleCurrNode,
  G_AddChildNode,
  G_AddRootNode,
  G_Title,
} from "./store";

export default defineComponent({
  name: "Tree",
  components: {
    Menu,
    Details,
  },
  setup() {
    let isDown = false;
    let clickLeft = 0;
    let clickTop = 0;
    let canvas: any = {};
    let ctx: any = {};
    const currClickIdx = ref<number>(0);

    onMounted(() => {
      canvas = document.getElementById("canvas");
      ctx = (canvas as any).getContext("2d");
      GlobalState.updateCanvas(canvas, ctx);

      window.addEventListener("mousemove", (e: any) => {
        if (isDown) {
          G_CurrNode.pos.sx = e.clientX - clickLeft;
          G_CurrNode.pos.sy = e.clientY - clickTop;
          clearRect(); // 重绘路径
        }
      });
    });

    const mousedownEvent = (e: any, s: Section) => {
      console.log(s);
      GlobalState.currSection.state.select = false;
      s.state.select = true;
      // 当前节点
      const curr = G_ToggleCurrNode(s);
      G_Title.value = s.request.title;
      isDown = true;
      clickLeft = e.clientX - s.pos.sx;
      clickTop = e.clientY - s.pos.sy;
      clearRect();
    };

    const boxStyle = computed(() => {
      const styles = ["box"];
      const state = G_CurrNode.state;
      if (state.select) {
        styles.push("box-select");
      }
      return styles;
    });

    // 鼠标点击事件
    const mouseupEvent = (e: any) => {
      isDown = false;
    };

    // 添加根节点
    const addRootNode = () => {
      G_AddRootNode();
    };
    // 添加子节点
    const addChildNode = () => {
      G_AddChildNode();
    };

    const delCurrNode = () => {
      G_CurrNode.state.delete = true;
      clearRect();
    };

    const startRun = () => {
      Run(G_CurrNode);
    };

    return {
      mousedownEvent,
      mouseupEvent,
      addRootNode,
      addChildNode,
      sections,
      GlobalState,
      startRun,
      delCurrNode,
      boxStyle,
      currClickIdx,
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
  background-color: red;
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

.box {
  width: 50px;
  height: 50px;
  background-color: #693f95;
  position: absolute;
  cursor: pointer;
  z-index: 1001;
  border-radius: 50%;
}

.box-select {
  background-color: #409eff;
}

.box-default {
}

.box-success {
  background-color: #a3b2ad;
}

.box-error {
  background-color: #f56c6c;
}

#canvas {
  /* background-color: #98aaa7; */
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
}
</style>
