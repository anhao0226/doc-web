<template>
  <DrawerComponent
    v-model="G_DrawerState.menu"
    :width="250"
    algin="left"
    :zIndex="10003"
  >
    <template v-slot:title>Menu</template>
    <template v-slot:content>
      <ul class="select_menu">
        <li
          v-for="(item, index) in comments"
          :key="index"
          @click="selectItem(index)"
        >
          {{ item.Title[0] }}
        </li>
      </ul>
    </template>
  </DrawerComponent>
</template>

<script lang='ts'>
import { defineComponent, reactive } from "vue";
import DrawerComponent from "./../../components/Drawer.vue";
import { comments } from "./../comm";
import {
  G_DrawerState,
  SInputVals,
  SSaveNode,
  STitle
} from "./store";
export default defineComponent({
  components: {
    DrawerComponent,
  },
  setup() {
    const selectItem = (index: number) => {
      if (index < comments.value.length) {
        const c = comments.value[index];
        const params = c.Params;
        const url = c.Url[0].trim();
        const method = c.Method[0].trim();
        const header = c.Header[0].trim();
        const title = c.Title[0].trim();
        STitle.value = title;
        // 保存节点信息
        SSaveNode({
          url: url,
          method: method,
          header: header,
          title: title,
        });
        // 处理input信息
        SInputVals.value = [];
        params.forEach((ele: any) => {
          SInputVals.value.push({
            value: "",
            auto: false,
            key: (ele[0] as string).trim(),
            type: "custom",
            detail: "",
          });
        });
      }
    };

    return {
      comments,
      selectItem,
      G_DrawerState,
    };
  },
});
</script>


<style scoped>
.select_menu {
  width: 100%;
  height: 100%;
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