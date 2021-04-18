<template>
  <div class="wrapper" :style="{ 'z-index': MainMenuInfo[6].zIndex }">
    <div class="container">
      <!--  -->
      <DetailsComponent></DetailsComponent>
      <!--  -->
      <AddComponent></AddComponent>
      <div class="show-add-box">
        <span @click="state = true">Show</span>
        <span @click="start_run">Run</span>
      </div>
      <div class="show-tree">
        <TreeComponent :list="Tree.next"></TreeComponent>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import AddComponent from "./add.vue";
import TreeComponent from "../Tree.vue";
import DetailsComponent from "./details.vue";
import { getUUID } from './../../libs/utils'

import { Tree, test, MainMenuInfo } from "./../comm";
import { state } from "./comm";

export default defineComponent({
  components: {
    AddComponent,
    TreeComponent,
    DetailsComponent,
  },
  setup() {
    const start_run = () => {
      for (let i = 0; i < Tree.value.next.length; i++) {
        test(Tree.value.next[i]);
      }
    };
    return {
      Tree,
      state,
      start_run,
      MainMenuInfo,
    };
  },
});
</script>

<style scoped>
.wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: rgba(255, 255, 255, 0.9);
  overflow: scroll;
}
.show-tree {
  width: 100%;
  height: 100%;
}
.show-add-box {
  position: fixed;
  left: 0;
  top: 0;
  height: 50px;
  text-align: center;
  line-height: 50px;
  z-index: 1000;
  background-color: seagreen;
}

.show-add-box span {
  display: inline-block;
  width: 100px;
}
</style>