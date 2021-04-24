<template>
  <div class="select">
    <input
      class="input__inner"
      :value="showText"
      readonly="true"
      @click="clickEvent"
    />
    <div class="select__menu" :style="{ height: state ? menuHeight : '0' }">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click.prevent="selectValue(index)"
      >
        {{ item }}
      </li>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    modelValue: String,
    list: Array,
  },
  emits: ["update:modelValue"],
  setup(props: any, ctx: any) {
    const state = ref<boolean>(false);
    console.log(props);
    const showText = ref<string>(props.modelValue);
    const menuHeight = `${props.list.length * 36}px`;

    watch(
      () => props.modelValue,
      (newValue:string) => {
        showText.value = newValue;
      }
    );

    const clickEvent = () => {
      state.value = !state.value;
    };

    const selectValue = (index: string) => {
      state.value = false;
      showText.value = props.list[index];
      ctx.emit("update:modelValue", showText.value);
    };

    return {
      state,
      showText,
      menuHeight,
      clickEvent,
      selectValue,
    };
  },
});
</script>

<style lang="css" scoped>
.select {
  width: 120px;
  display: inline-block;
  position: relative;
}
.input__inner {
  background-color: #fff;
  background-image: none;
  border-radius: 2px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  outline: none;
  padding: 0 15px;
  width: 100%;
}

.select__menu {
  background-color: #fff;
  position: absolute;
  width: 100%;
  border-radius: 2px;
  overflow: hidden;
  transition: all 0.3s;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  z-index: 1009;
  margin-top: 6px;
}

.select__menu li {
  cursor: pointer;
  height: 36px;
  line-height: 36px;
  color: #606266;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.select__menu li:hover {
  background-color: #f5f7fa;
}
</style>