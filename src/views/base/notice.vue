<template>
  <DrawerCompoment
    :zIndex="3000"
    algin="right"
    v-model="menuState[menuIdx].display"
    :width="300"
  >
    <template v-slot:title>Message</template>
    <template v-slot:content> </template>
  </DrawerCompoment>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import DrawerCompoment from "../../components/Drawer.vue";
import __WebSocket from "@/libs/websocket";
import { menuState } from "@/views/base/comm";

interface Buddy {
  email: string;
  object: string;
  uid: string;
  input: boolean;
}

export default defineComponent({
  props: ["index"],
  components: {
    DrawerCompoment,
  },
  setup(props: any) {
    const menuIdx = ref<boolean>(props.index);

    return {
      menuIdx,
      menuState,
    };
  },
});
</script>

<style lang="css" scoped>
.buddy__list {
  padding: 0 4px;
}
.buddy__list li {
  padding: 20px 0;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid #eee;
}
</style>