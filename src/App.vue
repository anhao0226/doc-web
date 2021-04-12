<template>
  <FetchComponent></FetchComponent>
  <HomeComponent></HomeComponent>
  <HeaderComponent></HeaderComponent>
  <SettingComponent></SettingComponent>
  <MenuComponent></MenuComponent>
  <SearchComponent></SearchComponent>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { MainMenu } from "./views/comm";

import FetchComponent from "./views/Fetch.vue";
import HomeComponent from "./views/Home.vue";
import HeaderComponent from "./views/Header.vue";
import SettingComponent from "./views/Setting.vue";
import MenuComponent from "./views/Menu.vue";
import SearchComponent from './views/Search.vue'

export default defineComponent({
  components: {
    FetchComponent,
    HomeComponent,
    HeaderComponent,
    SettingComponent,
    MenuComponent,
    SearchComponent,
  },
  setup() {
    let prev = 0;
    let timer: any = null;

    onMounted(() => {
      window.addEventListener("scroll", ScrollEvent);
    });

    const ScrollEvent = () => {
      clearTimeout(timer);
      MainMenu.value[0] = false;
      prev = document.documentElement.scrollTop || document.body.scrollTop;
      timer = setTimeout(() => {
        let scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollHeight == prev) {
          MainMenu.value[0] = true;
        }
      }, 100);
    };

    return {
      MainMenu
    }

  },
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  list-style: none;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
}

.bg-mask {
  width: 100%;
  height: 100%;
  background-color: saddlebrown;
  position: absolute;
  z-index: 100;
  left: 0;
  top: 0;
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
