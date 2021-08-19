<template>
  <div class="outline">
    <div class="title"></div>
    <Tree :data="SRootNode.children" style="margin-left:-8px"></Tree>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { SRootNode } from "./store/index";
import Tree from "./tree.vue";
export default defineComponent({
  components: {
    Tree,
  },
  setup() {
      SRootNode.value.children
    return {
      SRootNode,
    };
  },
});
</script>

<style scoped>
.outline {
  position: absolute;
  width: 200px;
  height: 100%;
  /* background-color: rosybrown; */
  background-color: #fff;
  z-index: 3004;
  overflow: scroll;
}

.outline .title {
    height: 65px;
}
</style>