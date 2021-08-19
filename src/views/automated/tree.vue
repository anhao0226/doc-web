<template>
  <ul>
    <li v-for="(item, index) in data" :key="index">
      <!--  -->
      <div class="content" @click="item.outline.state = !item.outline.state">
        <i class="iconfont icon-arrow-left-bold icon"></i>
        <i class="iconfont icon-shezhi icon"></i>
        <span>{{ item.id }}</span>
      </div>
      <Tree v-if="item.children.length > 0" :data="item.children"></Tree>
    </li>
  </ul>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import { SRootNode } from "./store/index";
export default defineComponent({
  name: "Tree",
  props: ["data"],
  setup(props: any) {
    //
    const height = ref<number>(40);

    const show = (data: any) => {
      height.value = (data.children.length + 1) * 40;
    };
    return {
      show,
      height,
    };
  },
});

/**
 *  :style="{
        height: item.outline.state
          ? `${(item.count + 1) * 40}px`
          : `${height}px`,
      }"
 */
</script>



<style scoped>
ul {
  margin-left: 20px;
  border-left: 1px solid #eee;
}

ul li {
  /* line-height: 40px; */
}

ul li i {
  display: inline-block;
  font-size: 1.2rem;
  transform: rotate(-90deg);
}

.content {
  width: 100%;
  /* background-color: blueviolet; */
  /* border: 1px solid black; */
  padding: 4px 4px;
  line-height: 40px;
  height: 40px;
}
</style>