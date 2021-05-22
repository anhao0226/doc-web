<template>
  <DrawerCompoment v-model="MainMenuInfo[8].display" algin="right" :width="300">
    <template v-slot:title>Message</template>
    <template v-slot:content>
        
    </template>
  </DrawerCompoment>
</template>

<script lang="ts">
import { defineComponent, onMounted,ref } from "vue";
import { SearchList, MainMenuInfo, MainMenuChange, comments } from "./comm";
import { _inputValues, _commentIndex } from "../../store/index";
import DrawerCompoment from "../../components/Drawer.vue";

export default defineComponent({
  components: {
    DrawerCompoment,
  },
  setup() {

      return {
          MainMenuInfo
      }
  },
});
</script>

<style lang="css" scoped>

</style>