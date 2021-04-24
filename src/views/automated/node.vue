<template>
  <div
    class="node-container"
    @mousedown="mousedownEvent($event)"
    @mouseup="mouseupEvent($event)"
    :style="{ top: `${G_CurrNode.pos.y}px`, left: `${G_CurrNode.pos.x}px` }"
  >
    123
  </div>
</template>

<script lang='ts'>
import { defineComponent, watch, ref, onMounted } from "vue";
import { G_ToggleCurrNode, G_CurrNode } from "./store";

export default defineComponent({
  props: ["pos", "value", "move", "seek"],
  emits: ['update:move'],
  setup(props: any, ctx:any) {
    let isDown = false;
    let clickLeft = 0;
    let clickTop = 0;

    onMounted(() => {
      console.log(props.value)
    })

    // 坐标信息
    const posInfo = ref<{ x: number; y: number }>({
      x: props.pos.x,
      y: props.pos.y,
    });

    watch(
      () => props.value,
      (newValue:any) => {
        posInfo.value.x = newValue.pos.x;
        posInfo.value.y = newValue.pos.y;
      }
    );

    const mousedownEvent = (e: any) => {
      ctx.emit("update:move", true);
      G_ToggleCurrNode(props.value);
      clickLeft = e.clientX - posInfo.value.x;
      clickTop = e.clientY - posInfo.value.y;
    };

    const mouseupEvent = (e: any) => {
      ctx.emit("update:move", false);
    };

    return {
      posInfo,
      mouseupEvent,
      mousedownEvent,
      G_CurrNode,
    };
  },
});
</script>

<style scoped>
.node-container {
  position: absolute;
  width: 50px;
  height: 50px;
  background-color: blueviolet;
  z-index: 1001;
  cursor: pointer;
  border-radius: 4px;
}
</style>