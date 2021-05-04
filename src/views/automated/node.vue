<template>
  <div
    v-if="!value.state.delete"
    class="default"
    :style="{
      top: `${value.pos.sy}px`,
      left: `${value.pos.sx}px`,
      'background-color': bgColor,
    }"
  >
    <div :class="['node__container', value.state.select ? 'node-select' : '']">
      {{ value.id }}
      <!-- {{instance.appContext.mixins[0].myOptions}} -->
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, getCurrentInstance, SetupContext } from "vue";

export default defineComponent({
  props: ["value"],
  setup(props: any, ctx: SetupContext) {
  
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
  background-color: #6495ed;
}
.node__container {
  width: 100%;
  height: 100%;
  background-color: #6495ed;
}
.node-select {
  background-color: cadetblue;
}
</style>