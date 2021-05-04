<template>
  <div class="drawer" :style="styles">
    <div class="container">
      <!--工具栏 -->
      <div class="toolbar">
        <span @click="drawerClose"></span>
      </div>
      <!-- 标题 -->
      <div class="title">
        <slot name="title"></slot>
      </div>
      <!-- 内容区 -->
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    width: Number,
    modelValue: Boolean,
    algin: String,
    zIndex: Number,
  },
  emits: ["close", "update:modelValue"],
  setup(props: any, ctx: any) {
    // 抽屉样式
    const drawerState = ref<boolean>(props.modelValue);
    //
    const widthStyle = ref<number>(0);
    // 保存样式
    const styles = ref<string[]>([]);

    watch(
      () => props.modelValue,
      (newValue) => {
        drawerState.value = newValue;
        if (drawerState.value) {
          styles.value.push(`width:${props.width}px`);
        } else {
          styles.value.splice(styles.value.length - 1, 1);
        }
      }
    );
    
    styles.value.push(`${props.algin}:0`);
    if (props.zIndex) {
      styles.value.push(`z-index:${props.zIndex}`);
    }

    const drawerClose = () => {
      drawerState.value = !drawerState.value;
      ctx.emit("update:modelValue", false);
      ctx.emit("close", false);
    };

    return {
      drawerState,
      drawerClose,
      styles,
    };
  },
});
</script>

<style lang="css" scoped>
.drawer {
  position: fixed;
  top: 0;
  width: 0;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: 0.26s;
}
.container {
  width: 100%;
  height: 100%;
}
.toolbar span {
  display: inline-block;
  width: 11px;
  height: 11px;
  background-color: rgb(245, 107, 107, 1);
  border-radius: 5px;
  margin-left: 6px;
  transition: 0.2s;
}
.toolbar span:first-child:hover {
  width: 12px;
  height: 12px;
  border-radius: 6px;
}
.title {
  width: 100%;
  text-align: center;
  padding: 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #606266;
}
.content {
  width: 100%;
  height: calc(100% - 60px);
  position: relative;
}
</style>