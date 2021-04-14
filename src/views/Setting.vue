<template>
  <div
    class="wrapper"
    :style="{
      'z-index': MainMenuInfo[3].zIndex,
      'right': MainMenuInfo[3].display ? 0 : -320 + 'px',
    }"
  >
    <div class="op">
      <span @click="MainMenuChange(3)"></span>
    </div>
    <div class="title">Setting</div>
    <div class="container">
      <div class="config-box">
        <ul class="menu">
          <li>
            <span>data addr</span>
            <i class="iconfont icon-add" @click="showInputBox(0)"></i>
          </li>
          <li class="add-input" v-if="inputStata[0]">
            <span>
              <input type="text" v-model="inputValue[0]" />
            </span>
            <span @click="saveConfig(0)">save</span>
          </li>
          <li v-for="(item, index) in dataAddr" :key="index">
            <span>{{ item }}</span>
            <i
              style="color: #f56c6c"
              class="iconfont icon-trash"
              @click="delConfig(0, index)"
            ></i>
          </li>
        </ul>
      </div>
      <div class="config-box">
        <ul class="menu">
          <li>
            <span>test addr</span>
            <i class="iconfont icon-add" @click="showInputBox(1)"></i>
          </li>
          <li>
            <span>https</span>
            <span>
              <div :class="[slideBtnState ? 'slide_box_active' : 'slide_box']">
                <div
                  class="slide_btn"
                  :style="{ left: slideBtnState ? '18px' : '3px' }"
                  @click="slideBtnClickEvent"
                ></div>
              </div>
            </span>
          </li>
          <li class="add-input" v-if="inputStata[1]">
            <span>
              <input type="text" v-model="inputValue[1]" />
            </span>
            <span @click="saveConfig(1)">save</span>
          </li>
          <li v-for="(item, index) in testAddr" :key="index">
            <span>{{ item }}</span>
            <i
              style="color: #f56c6c"
              class="iconfont icon-trash"
              @click="delConfig(1, index)"
            ></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { config, FetchComments, MainMenuInfo, MainMenuChange } from "./comm";
import { setItem } from "./../libs/storage";

export default defineComponent({
  components: {},
  setup() {
    onMounted(() => {
      dataAddr.value = config.value.dataAddr;
      testAddr.value = config.value.testAddr;
      slideBtnState.value = config.value.isHttps;
    });

    const slideBtnClickEvent = () => {
      slideBtnState.value = !slideBtnState.value;
      setItem("2", `${slideBtnState.value}`);
    };

    const dataAddr = ref<string[]>([]);
    const testAddr = ref<string[]>([]);
    const inputStata = ref<boolean[]>([false, false]);
    const inputValue = ["", ""];
    const slideBtnState = ref<boolean>(false);

    const delConfig = (type: number, idx: number) => {
      switch (type) {
        case 0:
          dataAddr.value.splice(idx, 1);
          setItem("0", JSON.stringify(dataAddr.value));
          break;
        case 1:
          testAddr.value.splice(idx, 1);
          setItem("1", JSON.stringify(testAddr.value));
          break;
      }
    };

    const showInputBox = (idx: number) => {
      inputStata.value[idx] = true;
    };

    const saveConfig = (idx: number) => {
      switch (idx) {
        case 0:
          dataAddr.value.push(inputValue[idx]);
          setItem("0", JSON.stringify(dataAddr.value));
          // 第一次使用時加載
          if (dataAddr.value.length == 1) {
            setTimeout(() => {
              FetchComments();
            }, 1000);
          }
          break;
        case 1:
          testAddr.value.push(inputValue[idx]);
          setItem("1", JSON.stringify(testAddr.value));
          break;
      }
      inputStata.value[idx] = false;
    };

    return {
      dataAddr,
      testAddr,
      inputStata,
      showInputBox,
      saveConfig,
      inputValue,
      delConfig,
      slideBtnState,
      slideBtnClickEvent,
      MainMenuInfo,
      MainMenuChange,
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

.title {
  width: 100%;
  text-align: center;
  /* background-color:royalblue; */
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

.config-box {
  min-height: 100px;
  padding: 12px 0 0 0;
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