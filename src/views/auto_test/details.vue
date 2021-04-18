<template>
  <div class="section_info">
    <DrawerComponent v-model="detailsBoxState" algin="right" :width="300" :zIndex="10000">
      <template v-slot:title>Details</template>
      <template v-slot:content>
        <div>
          <p>{{currClickSection.cid}}</p>
        </div>
      </template>
    </DrawerComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { detailsBoxState } from "./comm";
import { currClickSection } from './../comm'
import DrawerComponent from "./../../components/Drawer.vue";

export default defineComponent({
  components: {
    DrawerComponent,
  },
  setup() {
    return {
      close,
      detailsBoxState,
      currClickSection
    };
  },
});
</script>