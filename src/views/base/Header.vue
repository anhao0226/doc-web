<template>
  <div class="wrapper">
    <div class="container">
      <div class="drawer__list">
        <!--  -->
        <NoticeComponent :index="0"></NoticeComponent>
        <SettingComponent :index="1"></SettingComponent>
        <MessageComponent :index="2"></MessageComponent>
        <SearchComponent :index="3"></SearchComponent>
        <FetchComponent :index="4"></FetchComponent>
      </div>
      <ul class="list-box">
        <!-- notice -->
        <li>
          <Badeg v-model="noticeCount">
            <i :class="menuState[0].icon" @click="openDrawerHandler(0)"></i>
          </Badeg>
        </li>
        <!-- setting -->
        <li>
          <i :class="menuState[1].icon" @click="openDrawerHandler(1)"></i>
        </li>
        <!-- message -->
        <li>
          <i :class="menuState[2].icon" @click="openDrawerHandler(2)"></i>
        </li>
        <!-- search -->
        <li>
          <i :class="menuState[3].icon" @click="openDrawerHandler(3)"></i>
        </li>
        <!-- fetch -->
        <li>
          <i :class="menuState[4].icon" @click="openDrawerHandler(4)"></i>
        </li>
        <!-- login -->
        <li>
          <router-link :to="{ name: 'login' }">
            <i class="iconfont icon-smile"></i>
          </router-link>
        </li>
        <!-- automated -->
        <li>
          <router-link :to="{ name: 'automated' }">
            <i class="iconfont icon-wenjuan"></i>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
import { CommentsLen, menuState } from "./comm";
import NoticeComponent from "@/views/base/notice.vue";
import SettingComponent from "@/views/base/setting.vue";
import MessageComponent from "@/views/base/message.vue";
import SearchComponent from "@/views/base/search.vue";
import FetchComponent from "@/views/base/fetch.vue";
import Badeg from '@/views/base/badge.vue'
import { useStore } from '@/store'

export default defineComponent({
  components: {
    NoticeComponent,
    SettingComponent,
    MessageComponent,
    SearchComponent,
    FetchComponent,
    Badeg,
  },
  setup() {

    const store = useStore();
    const noticeCount = ref<number>(0);
    const openDrawerHandler = (i: number) => {
      menuState.value[i].display = !menuState.value[i].display;
    };

    watch(store.state.notice, () => {
      noticeCount.value++;
    })

    return {
      noticeCount,
      menuState,
      openDrawerHandler,
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
  left: 0;
  bottom: 0;
}
.container {
  width: 600px;
  height: 60px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.list-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.list-box li {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 0 16px;
}

.list-box li i {
  font-size: 1.8rem;
}

.badge {
  position: relative;
  /* background-color: cadetblue; */
  padding: 0 4px 0 4px;
}

.badge sub {
  position: absolute;
  right: -10px;
  top: -4px;
  width: 28px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  border-radius: 15px;
  background-color: #F56C6C;
  color: #fff;
  font-size: 0.7rem;
}
</style>
