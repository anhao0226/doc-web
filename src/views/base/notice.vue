<template>
  <DrawerCompoment
    :zIndex="3000"
    algin="right"
    v-model="menuState[menuIdx].display"
    :width="300"
  >
    <template v-slot:title>Notice</template>
    <template v-slot:content>
      <ul>
        <li
          class="card"
          v-for="(item, index) in store.state.notice"
          :key="index"
        > 
          <p>{{item.Sender}}</p>
          {{ item.Text }}

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
.card {
  border-bottom: 1px solid #eee;
  padding: 10px;

}
</style>