<template>
  <router-view></router-view>
  <!-- 底部菜单 -->
  <HeaderComponent></HeaderComponent>
  <div
    class="g__box"
    v-if="GBoxStateInfo.state"
    :style="{ left: `${GBoxStateInfo.x}px`, top: `${GBoxStateInfo.y}px` }"
  >
    <span class="content">{{ GBoxStateInfo.data }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { MainMenuInfo, } from "./views/base/comm";
import { GBoxStateInfo, useStore } from "./store/index";

import HeaderComponent from "./views/base/header.vue";

export default defineComponent({
  components: {
    HeaderComponent,
  },
  setup() {
    let prev = 0;
    let timer: any = null;
    const store = useStore();
    const GBoxState = ref<boolean>(false);

    onMounted(() => {
      document.addEventListener("click", () => {
        if (GBoxStateInfo.value.state) {
          GBoxStateInfo.value.state = false;
        }
      });
    });

    // onMounted(() => {
    //   window.addEventListener("scroll", ScrollEvent);
    // });

    // const ScrollEvent = () => {
    //   console.log("test")
    //   clearTimeout(timer);
    //   MainMenuInfo.value[0].display = false;
    //   prev = document.documentElement.scrollTop || document.body.scrollTop;
    //   timer = setTimeout(() => {
    //     let scrollHeight =
    //       document.documentElement.scrollTop || document.body.scrollTop;
    //     if (scrollHeight == prev) {
    //       MainMenuInfo.value[0].display = true;
    //     }
    //   }, 100);
    // };
    return {
      MainMenuInfo,
      GBoxStateInfo,
      store,
    };
  },
});
</script>

<style>
.g__box {
  left: 0;
  top: 0;
  position: absolute;
  z-index: 10010;
  transition: all 0.5s; 
}

.g__box .content {
  display: inline-block;
  position: relative;
  min-width: 150px;
  height: 36px;
  background: #303133;
  color: #fff;
  border-radius: 3px;
  font-size: 0.8rem;
  line-height: 36px;
  padding: 0 10px;
}

.g__box .content::after {
  content: "";
  position: absolute;
  float: left;
  width: 0;
  height: 0;
  border-width: 5px;
  border-style: solid;
  border-color: transparent #303133 transparent transparent;
  left: -10px;
  top: 10px;
}

#app {
  width: 100%;
  height: 100%;
  position: relative;
}

* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}

::-webkit-scrollbar {
  width: 4px;
  height: 4px;
  scrollbar-arrow-color: slategray;
}

::-webkit-scrollbar-thumb {
  border-radius: 5px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  scrollbar-arrow-color: slategray;
}

*{
  /* scrollbar-width: thin !important; */
  scrollbar-width:5px;

}

html,
body {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -webkit-tap-highlight-color: transparent;
  position: relative;
}

a:link {
  color: #303133;
}
a:visited {
  color: #303133;
}
a:hover {
  color: #303133;
}
a:active {
  color: #303133;
}
</style>
