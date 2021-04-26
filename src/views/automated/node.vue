<template>
  <div
    class="default"
    :style="{
      top: `${value.pos.sy}px`,
      left: `${value.pos.sx}px`,
      'background-color': bgColor,
    }"
  >
    <!-- <div
      class="mask"
      :style="{ 'background-color': state.select ? 'rgba(0, 0, 0, 0.4)' : '' }"
    > -->
      {{ value.id }}
    <!-- </div> -->
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: ["value"],
  setup(props: any, ctx: any) {
    const bgColor = ref<string>("#6495ed");
    const mask = ref<boolean>(false);
    return {
      mask,
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
  text-align: center;
  line-height: 50px;
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  overflow: hidden;
}
.mask {
  width: 100%;
  height: 100%;
  transition: 0.3s;
}
</style>