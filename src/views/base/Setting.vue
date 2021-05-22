<template>
  <DrawerComponent algin="right" v-model="MainMenuInfo[3].display" :width="400">
    <template v-slot:title>Setting</template>
    <template v-slot:content>
      <div class="setting">
        <div class="config-box">
          <ul class="menu">
            <li>
              <span class="title">Data Addrs</span>
              <i class="iconfont icon-add" @click="showInputBox(0)"></i>
            </li>
            <li v-for="(item, index) in store.state.data_addrs" :key="index">
              <span>{{ item.value }}</span>
              <span class="menu__action">
                <SwitchComponent
                  v-model="item.enable"
                  style="display: inline-block"
                  @change="watchDataListStateHandler(index)"
                ></SwitchComponent>
                <i
                  style="color: #f56c6c"
                  class="iconfont icon-trash"
                  @click="delConfig(0, index)"
                ></i>
              </span>
            </li>
            <li class="add-input" v-show="inputState[0]">
              <span>
                <input type="text" v-model="inputValue[0]" />
              </span>
              <span @click="saveConfig(0)">save</span>
            </li>
          </ul>
        </div>
        <div class="config-box">
          <ul class="menu">
            <li>
              <span class="title">Fetch Addrs</span>
              <i class="iconfont icon-add" @click="showInputBox(1)"></i>
            </li>
            <!-- https -->
            <li>
              <span>https</span>
              <SwitchComponent
                v-model="store.state.https_enable"
                @change="enableHttpsHandler"
              ></SwitchComponent>
            </li>
            <li v-for="(item, index) in store.state.fetch_addrs" :key="index">
              <span>{{ item.value }}</span>
              <span class="menu__action">
                <SwitchComponent
                  style="display: inline-block"
                  v-model="item.enable"
                  @change="watchFetchListStateHandler(index)"
                ></SwitchComponent>
                <i
                  style="color: #f56c6c"
                  class="iconfont icon-trash"
                  @click="delConfig(1, index)"
                ></i>
              </span>
            </li>
            <li class="add-input" v-show="inputState[1]">
              <span>
                <input type="text" v-model="inputValue[1]" />
              </span>
              <span @click="saveConfig(1)">save</span>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </DrawerComponent>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { config, FetchComments, MainMenuInfo, MainMenuChange } from "./comm";
import { useStorage } from "../../libs/storage";
import DrawerComponent from "../../components/Drawer.vue";
import SwitchComponent from "../../components/Switch.vue";
import { addUserConfig } from "@/services/user";
import { useStore } from "@/store/index";

export default defineComponent({
  components: {
    DrawerComponent,
    SwitchComponent,
  },
  setup() {
    const localStorage = useStorage();
    const inputState = ref<boolean[]>([false, false]);
    const inputValue = ["", ""];
    const store = useStore();
    const userId = store.state.user;

    const delConfig = (type: number, idx: number) => {
      switch (type) {
        case 0:
          store.state.data_addrs.splice(idx, 1);
          break;
        case 1:
          store.state.fetch_addrs.splice(idx, 1);
          break;
      }
    };

    const showInputBox = (idx: number) => {
      inputState.value[idx] = true;
    };

    const saveConfig = (idx: number) => {
      addUserConfig({
        type: idx as any,
        text: inputValue[idx],
        user: userId,
        enable: 0,
      }).then((res) => {
        console.log(res);
        if (res.Success && res.Code == "0000") {
          switch (idx) {
            case 0:
              store.state.data_addrs.push({
                value: inputValue[idx],
                enable: false,
              });
              break;
            case 1:
              store.state.fetch_addrs.push({
                value: inputValue[idx],
                enable: false,
              });
              break;
          }
        }
      });

      inputState.value[idx] = false;
    };

    const enableHttpsHandler = (value: boolean) => {
      console.log(value);
    };

    const watchDataListStateHandler = (idx: number) => {
      console.log(idx);
    };

    const watchFetchListStateHandler = (idx: number) => {
      console.log(idx);
    };

    return {
      inputState,
      showInputBox,
      saveConfig,
      inputValue,
      delConfig,
      MainMenuInfo,
      MainMenuChange,
      store,
      enableHttpsHandler,
      watchDataListStateHandler,
      watchFetchListStateHandler,
    };
  },
});
</script>

<style lang="css" scoped>
.menu {
  padding: 0 10px;
}

.menu li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.9rem;
  border-bottom: 1px solid #eee;
  padding: 12px 0 12px 4px;
}

.menu li .menu__action {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.menu li .menu__action .iconfont {
  padding-left: 30px;
}

.menu li .title {
  font-size: 1rem;
  font-weight: 600;
}

.setting {
  overflow-y: scroll;
  height: 100%;
}

.config-box {
  min-height: 100px;
  padding: 12px 0 0 0;
  overflow-y: scroll;
}
.slide_box {
  position: relative;
  background-color: rosybrown;
  min-width: 36px;
  min-height: 20px;
  border-radius: 10px;
  background-color: rgb(255, 73, 73);
  border-color: rgb(255, 73, 73);
}
.slide_box_active {
  position: relative;
  background-color: rosybrown;
  min-width: 36px;
  min-height: 20px;
  border-radius: 10px;
  border-color: rgb(19, 206, 102);
  background-color: rgb(19, 206, 102);
}

.slide_btn {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: #fff;
  top: 2px;
  transition: 0.2s;
}
</style>