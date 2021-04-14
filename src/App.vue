<template>
  <AutoTestPage v-if="MainMenuInfo[6].display"></AutoTestPage>
  <FetchComponent></FetchComponent>
  <HomeComponent></HomeComponent>
  <HeaderComponent></HeaderComponent>
  <SettingComponent></SettingComponent>
  <MenuComponent></MenuComponent>
  <SearchComponent></SearchComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { MainMenuInfo, Tree, test } from "./views/comm";

//
import AutoTestPage from "./views/auto_test/index.vue";

import FetchComponent from "./views/Fetch.vue";
import HomeComponent from "./views/Home.vue";
import HeaderComponent from "./views/Header.vue";
import SettingComponent from "./views/Setting.vue";
import MenuComponent from "./views/Menu.vue";
import SearchComponent from "./views/Search.vue";

export default defineComponent({
  components: {
    FetchComponent,
    HomeComponent,
    HeaderComponent,
    SettingComponent,
    MenuComponent,
    SearchComponent,
    AutoTestPage,
  },
  setup() {
    let prev = 0;
    let timer: any = null;

    onMounted(() => {
      
      window.addEventListener("scroll", ScrollEvent);
    });

    const ScrollEvent = () => {
      clearTimeout(timer);
      MainMenuInfo.value[0].display = false;
      prev = document.documentElement.scrollTop || document.body.scrollTop;
      timer = setTimeout(() => {
        let scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollHeight == prev) {
          MainMenuInfo.value[0].display = true;
        }
      }, 100);
    };
    return {
      Tree,
      MainMenuInfo,
    };
  },
});
</script>

<style>
.canvas-circle {
  width: 50px;
  height: 50px;
  background-color: salmon;
  border-radius: 50%;
  position: absolute;
}
#mycanvas {
  border: 1px solid rgb(199, 198, 198);
}
.sec-start {
  position: absolute;
  right: 0;
  top: 0;
  width: 100px;
  height: 30px;
  background-color: cadetblue;
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
