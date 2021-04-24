<template>
  <div
    class="default"
    :style="{
      top: `${SSections[seek].pos.sy}px`,
      left: `${SSections[seek].pos.sx}px`,
      'background-color': bgColor,
    }"
  ></div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
import { SSections } from "./store";

export default defineComponent({
  props: ["seek"],
  setup(props: any, ctx: any) {
    // 0 default] 1 fetch] 2]
    const bgColor = ref<string>("#6495ed");

    watch(SSections.value[props.seek], () => {
      if (SSections.value[props.seek].state.fetch) {
        bgColor.value = "#67c23a";
      } else {
        bgColor.value = "#f56c6c";
      }
    });

    return {
      SSections,
      bgColor,
    };
  },
});
</script>

<style scoped>
.default {
  position: absolute;
  width: 50px;
  height: 50px;
  z-index: 1001;
  cursor: pointer;
  border-radius: 50%;
}
</style>