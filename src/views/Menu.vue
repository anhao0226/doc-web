<template>
  <DrawerCompoment v-model="MainMenuInfo[2].display" algin="right" :width="300">
    <template v-slot:title>Menu</template>
    <template v-slot:content>
      <div class="search-box">
        <input
          type="text"
          placeholder="search"
          @input="searchValue($event.target.value)"
        />
      </div>
      <ul class="menu">
        <li
          v-for="(item, index) in searchResult"
          :key="index"
          @click="formatInputVals(index)"
        >
          <a :href="`#${item}`">{{ item }}</a>
          <i class="iconfont icon-link"></i>
        </li>
      </ul>
    </template>
  </DrawerCompoment>
</template>

<script lang="ts">
import { defineComponent, onMounted,ref } from "vue";
import { SearchList, MainMenuInfo, MainMenuChange, comments } from "./comm";
import { _inputValues, _commentIndex } from "./../store/index";
import DrawerCompoment from "./../components/Drawer.vue";

export default defineComponent({
  components: {
    DrawerCompoment,
  },
  setup() {

    const searchResult = ref<string[]>([])

    onMounted(() => {
      SearchList.value.forEach(ele => {
        searchResult.value.push(ele)
      })
    })

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


    const searchValue = (text:string) => {
      searchResult.value = SearchList.value.filter( ele => {
        console.log(ele.includes(text));
        return ele.includes(text)
      })
    }

    return {
      searchValue,
      searchResult,
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
  padding: 0 16px;
  overflow-y: scroll;
  height: calc(100% - 30px);
}

.search-box {
  /* background-color: royalblue; */
  text-align: center;
}

.search-box input {
  height: 30px;
  width: 96%;
  background-color: rgba(0, 0, 0, 0.03);
  outline: none;
  border-style: none;
  border-radius: 6px;
  text-indent: 10px;
}


.menu li {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.9rem;
  border-bottom: 1px solid #eee;
  padding: 12px 0;
  overflow: hidden;
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