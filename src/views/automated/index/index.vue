<template>
  <div id="wrapper">
    <!-- toolbar -->
    <Toolbar @click="menuClickEvent"></Toolbar>
    <!-- outline -->
    <!-- <Outline></Outline> -->
    <div
      id="container"
      :style="{
        width: `${canvasArea.w}px`,
        height: `${canvasArea.h}px`,
        left: `${containerPos.x}px`,
        top: `${containerPos.y}px`,
      }"
      @mousedown.prevent.stop="boxClickEvent($event, null, 2)"
      @mouseup.prevent.stop="mouseupEvent"
    >
      <Node
        v-for="(item, index) in nodeUtil.list"
        :key="index"
        :data="item"
        @mousedown.prevent.stop="boxClickEvent($event, item, 1)"
        @mouseup.prevent.stop="mouseupEvent"
      ></Node>
      <!-- @mousedown.prevent.stop="mousedownEvent($event, 1, item)" -->
    </div>
    <!-- canvas -->
    <canvas
      id="canvas"
      :width="`${canvasArea.w}`"
      :height="`${canvasArea.h}`"
      :style="{ left: `${containerPos.x}px`, top: `${containerPos.y}px` }"
    ></canvas>
  </div>
  <!-- details -->
  <Details></Details>
  <!-- menu -->
  <Menu></Menu>
</template>

<script lang="ts">
import Auto from "../index";
export default Auto;
</script>

<style scoped>
@import "./index.css";
</style>
