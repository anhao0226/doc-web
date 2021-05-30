<template>
  <div class="badge__container">
    <sub v-show="subState">{{ count }}</sub>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  props: ["modelValue"],
  setup(props: any) {
    console.log(props);
    const count = ref<number>(props.modelValue);
    const subState = ref<boolean>(false);

    onMounted(() => {
      if (count.value > 0) {
        subState.value = true;
      }
    });
    
    watch(
      () => props.modelValue,
      (newValue: number) => {
        count.value = newValue;
        if (count.value == 0) {
          subState.value = false;
        } else {
          subState.value = true;
        }
      }
    );
    return {
      count,
      subState,
    };
  },
});
</script>

<style lang="css" scoped>
.badge__container {
  position: relative;
  /* background-color: cadetblue; */
}
.badge__container sub {
  position: absolute;
  right: -10px;
  top: -4px;
  width: 28px;
  height: 16px;
  text-align: center;
  line-height: 16px;
  border-radius: 15px;
  background-color: #f56c6c;
  color: #fff;
  font-size: 0.7rem;
}
</style>

