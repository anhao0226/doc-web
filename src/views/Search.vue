<template>
  <div class="wrapper" :style="{ height: MainMenu[5]? '100%':'0'}">
    <div class="container">
      <div class="search-box">
        <i class="iconfont icon-search"></i>
        <label v-show="labelShowState">Search</label>
        <input type="text" v-model="searchValue" />
      </div>
      <div class="search-result">
        <ul class="menu">
          <li @click="closeMask"  v-for="(item, index) in searchIndex" :key="index">
            <a :href="`#${SearchList[item]}`">{{ SearchList[item] }}</a>
            <i class="iconfont icon-link"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import { SearchList, MainMenu } from "./comm";
export default defineComponent({
  setup() {
    const labelShowState = ref<boolean>(true);
    const searchValue = ref<string>("");
    const searchIndex = ref<number[]>([]);

    const closeMask = (e: any) => {
      MainMenu.value[5] = false
    };

    watch(searchValue, (newValue: string) => {
      searchIndex.value = [];
      if (newValue.length > 0) {
        labelShowState.value = false;
        for (let i = 0; i < SearchList.value.length; i++) {
          if (SearchList.value[i].indexOf(searchValue.value) > -1) {
            searchIndex.value.push(i);
          }
        }
      } else {
        labelShowState.value = true;
      }
    });

    return {
      labelShowState,
      searchValue,
      searchIndex,
      SearchList,
      MainMenu,
      closeMask,
    };
  },
});
</script>

<style scoped>
.wrapper {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(255, 255, 255,0.9);
  transition: 0.2s;
  overflow: hidden;
}
.container {
  width: 50%;
  height: 100%;
  margin: 0 auto;
  /* background-color: salmon; */
  border: 1px solid rgba(0, 0, 0, 0);
}
.search-box {
  width: 90%;
  margin: auto;
  /* background-color: rgb(255, 255, 255, 0.9); */
  border-bottom: 1px solid bisque;
  position: relative;
  height: 50px;
  line-height: 50px;
  /* background-color:steelblue; */
  margin: 10px auto;
}

.search-box i {
  font-size: 2rem;
  padding: 0 12px;
}
.search-box label {
  position: absolute;
  left: 60px;
  font-size: 2rem;
}
.search-box input {
  left: 60px;
  position: absolute;
  height: 50px;
  border-style: none;
  outline: none;
  background-color: rgb(255, 246, 240, 0.2);
  font-size: 2rem;
}
.search-result {
  min-height: 40px;
  max-height: 60%;
  overflow-y: scroll;
  padding: 0 30px;
  border-radius: 6px;
}
.menu {
  padding: 0 10px;
  /* background-color: rosybrown; */
}

.menu li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.9rem;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
}
</style>