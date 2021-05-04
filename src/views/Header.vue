<template>
  <div
    class="wrapper"
    :style="{ bottom: MainMenuInfo[0].display ? 0 : -100 + 'px' }"
  >
    <div class="container">
      <ul class="list-box">
        <i
          class="iconfont icon-home"
          :style="{ color: MainMenuInfo[1].display ? '#1875f0' : '' }"
          @click="MainMenuChange(1)"
        ></i>
        <i
          class="iconfont icon-list"
          :style="{ color: MainMenuInfo[2].display ? '#1875f0' : '' }"
          @click="MainMenuChange(2)"
        ></i>
        <i
          class="iconfont icon-settings"
          :style="{ color: MainMenuInfo[3].display ? '#1875f0' : '' }"
          @click="MainMenuChange(3)"
        ></i>
        <i
          class="iconfont icon-form"
          :style="{ color: MainMenuInfo[4].display ? '#1875f0' : '' }"
          @click="MainMenuChange(4)"
        ></i>
        <i
          class="iconfont icon-search"
          :style="{ color: MainMenuInfo[5].display ? '#1875f0' : '' }"
          @click="MainMenuChange(5)"
        ></i>
        <!-- 跳转到自动化测试页面 -->
        <router-link :to="{ name: 'automated' }">
          <i
            class="iconfont icon-wenjuan"
            :style="{ color: MainMenuInfo[6].display ? '#1875f0' : '' }"
            @click="MainMenuChange(6)"
          ></i>
        </router-link>

        <i>{{ CommentsLen }}</i>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import { MainMenuChange, CommentsLen, MainMenuInfo } from "./comm";
export default defineComponent({
  setup() {
    return {
      MainMenuChange,
      CommentsLen,
      MainMenuInfo,
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
  z-index: 2001;
}
.container {
  width: 480px;
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