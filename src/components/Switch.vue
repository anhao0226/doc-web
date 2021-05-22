<template>
  <div :class="['switch', state ? 'is_checked' : '']">
    <span
      class="switch__core"
      @click="toggleState"
      :style="{
        'background-color': state ? 'rgb(19, 206, 102)' : 'rgb(255, 73, 73)',
      }"
    ></span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props: any, ctx: any) {

    const state = ref<boolean>(props.modelValue);

    watch(
      () => props.modelValue,
      (newValue) => {
        state.value = newValue;
      }
    );

    const toggleState = () => {
      state.value = !state.value;
      ctx.emit("update:modelValue", state.value);
    };
    return {
      state,
      toggleState,
    };
  },
});
</script>

<style lang="css" scoped>
.switch {
  height: 20px;
}
.switch__core {
  position: relative;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  display: inline-block;
  background-color: rgb(255, 73, 73);
}

.switch__core::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 100%;
  transition: all 0.3s;
  top: 2px;
  left: 2px;
}

.is_checked .switch__core::after {
  left: 100%;
  margin-left: -18px;
}
</style>