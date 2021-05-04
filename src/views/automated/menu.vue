<template>
  <DrawerComponent
    v-model="SDrawerState.menu"
    :width="250"
    algin="left"
    :zIndex="10003"
  >
    <template v-slot:title>Menu</template>
    <template v-slot:content>
      <div class="search-box">
        <input
          type="text"
          placeholder="search"
          @input="searchValue($event.target.value)"
        />
      </div>
      <ul class="select_menu">
        <li
          v-for="(item, index) in searchReault"
          :key="index"
          @click="selectItem(item)"
        >
          {{ item.Title[0] }}
        </li>
      </ul>
    </template>
  </DrawerComponent>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import DrawerComponent from "./../../components/Drawer.vue";
import { comments } from "./../comm";
import { SDrawerState, SInputVals, SBaseInfo } from "./store/index";
export default defineComponent({
  components: {
    DrawerComponent,
  },
  setup() {
    const selectItem = (item: any) => {
      const params = item.Params;
      // 更新信息
      SBaseInfo.value.title = item.Title[0].trim();
      SBaseInfo.value.method = item.Method[0].trim();
      SBaseInfo.value.header = item.Header[0].trim();
      SBaseInfo.value.url = item.Url[0].trim();
      // 处理input信息
      SInputVals.value = [];
      console.log(params);
      params.forEach((ele: any) => {
        SInputVals.value.push({
          value: "",
          auto: false,
          key: (ele[0] as string).trim(),
          type: "custom",
          detail: "",
        });
      });
    };

    // 保存搜索数据
    const searchReault = ref<any>(comments.value);
    const searchValue = (text: string) => {
      searchReault.value = comments.value.filter((value) => {
        return value.Title[0].includes(text);
      });
    };

    return {
      searchReault,
      searchValue,
      comments,
      selectItem,
      SDrawerState,
    };
  },
});
</script>


<style scoped>
.search-box {
  /* background-color: royalblue; */
  text-align: center;
}

.search-box input {
  height: 30px;
  width: 96%;
  background-color: rgba(0, 0, 0, 0.04);
  outline: none;
  border-style: none;
  border-radius: 3px;
  text-indent: 10px;
}

.select_menu {
  width: 100%;
  height: calc(100% - 30px);
  overflow-y: scroll;
}

.select_menu li {
  padding: 12px 0;
  padding-left: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}
</style>