<template>
  <div
    class="wrapper"
    :style="{
      'z-index': MainMenuInfo[2].zIndex,
      right: MainMenuInfo[2].display ? 0 : -320 + 'px',
    }"
  >
    <!--  -->
    <div class="op">
      <span @click="MainMenuChange(2)"></span>
    </div>
    <!--  -->
    <div class="title">Menu</div>
    <!--  -->
    <div class="container">
      <ul class="menu">
        <li
          v-for="(item, index) in SearchList"
          :key="index"
          @click="formatInputVals(index)"
        >
          <span>{{ index }}</span>
          <a :href="`#${item}`">{{ item }}</a>
          <i class="iconfont icon-link"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SearchList, MainMenuInfo, MainMenuChange, comments } from "./comm";
import { _inputValues, _commentIndex } from "./../store/index";

export default defineComponent({
  components: {},
  setup() {
    const formatInputVals = (index: number) => {
      _commentIndex.value = index;
      _inputValues.value = [];
      comments.value[index].Params.forEach((e: any) => {
        _inputValues.value.push({
          key: (e[0] as string).trim(),
          data: "",
          auto: false,
          type: "string",
        });
      });
    };

    return {
      SearchList,
      MainMenuInfo,
      MainMenuChange,
      formatInputVals,
    };
  },
});
</script>

<style lang="css" scoped>
.wrapper {
  top: 0;
  position: fixed;
  right: 0px;
  min-width: 310px;
  transition: 0.2s;
  height: 100%;
  background-color: rgb(255, 255, 255, 0.94);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.op {
  /* background-color: rgba(0, 0, 0, 0.1); */
}
.op span {
  display: inline-block;
  width: 11px;
  height: 11px;
  background-color: rgb(245, 107, 107, 1);
  border-radius: 5px;
  margin-left: 6px;
  transition: 0.2s;
}
.op span:first-child:hover {
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
.menu {
  padding: 0 10px;
}

.menu li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.9rem;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
}

.container {
  width: 100%;
  height: calc(100% - 62px);
  /* background-color: salmon; */
  overflow-y: scroll;
}

.container::-webkit-scrollbar {
  width: 0px;
  height: 4px;
  scrollbar-arrow-color: slategray;
}
</style>