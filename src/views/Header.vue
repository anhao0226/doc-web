<template>
  <div class="wrapper" :style="{ bottom: MainMenu[0] ? 0 : -100 + 'px' }">
    <div class="container">
      <ul class="list-box">
        <i
          class="iconfont icon-home"
          :style="{ color: MainMenu[1] ? '#1875f0' : '' }"
          @click="MainMenuChange(1)"
        ></i>
        <i
          class="iconfont icon-list"
          :style="{ color: MainMenu[2] ? '#1875f0' : '' }"
          @click="MainMenuChange(2)"
        ></i>
        <i
          class="iconfont icon-settings"
          :style="{ color: MainMenu[3] ? '#1875f0' : '' }"
          @click="MainMenuChange(3)"
        ></i>
        <i
          class="iconfont icon-form"
          :style="{ color: MainMenu[4] ? '#1875f0' : '' }"
          @click="MainMenuChange(4)"
        ></i>
        <i
          class="iconfont icon-search"
          :style="{ color: MainMenu[5] ? '#1875f0' : '' }"
          @click="MainMenuChange(5)"
        ></i>
        <i>{{ CommentsLen }}</i>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { MainMenuChange, MainMenu, CommentsLen } from "./comm";
export default defineComponent({
  setup() {
    return {
      MainMenuChange,
      MainMenu,
      CommentsLen,
    };
  },
});
</script>

<style lang="css" scoped>
.wrapper {
  position: fixed;
  z-index: 10000;
  width: 100%;
  transition: 0.3s;
  padding: 8px 0;
  z-index: 1005;
}
.container {
  width: 420px;
  height: 60px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.list-box {
  width: 100%;
  display: inline-block;
  /* background-color: tomato; */
  text-align: center;
}
.list-box i {
  display: inline-block;
  height: 60px;
  width: 60px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  font-size: 1.6rem;
  /* background-color: rosybrown; */
}
</style>