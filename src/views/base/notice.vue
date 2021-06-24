<template>
  <DrawerCompoment
    :zIndex="3000"
    algin="right"
    v-model="menuState[menuIdx].display"
    :width="300"
  >
    <template v-slot:title>Notice</template>
    <template v-slot:content>
      <ul class="container">
        <li
          class="card"
          v-for="(item, index) in store.state.notice"
          :key="index"
        >
          <p>{{ item.email }}</p>
          <span>{{ item.text }}</span>
        </li>
      </ul>
    </template>
  </DrawerCompoment>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DrawerCompoment from "../../components/Drawer.vue";
import __WebSocket from "@/libs/websocket";
import { menuState } from "@/views/base/comm";
import { useStore } from "@/store";

export default defineComponent({
  props: ["index"],
  components: {
    DrawerCompoment,
  },

  setup(props: any) {
    const menuIdx = ref<boolean>(props.index);
    const store = useStore();
    return {
      store,
      menuIdx,
      menuState,
    };
  },
});
</script>

<style lang="css" scoped>
.container {
  padding: 0 6px;
  overflow-y: scroll;
  height: 100%;
  width: 100%;
}
.card {
  padding: 10px;
  margin-bottom: 6px;
  background-color: rgb(238, 238, 238, 0.8);
}

.card p {
  font-weight: 600;
}

.card span {
  word-wrap: break-word;
  word-break: break-all;
  display: block;
  padding: 6px 0;
}
</style>