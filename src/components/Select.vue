<template>
  <div class="select" >
    <input
      class="input__inner"
      :value="showText"
      readonly="true"
      @click="clickEvent"
    />
    <i class="iconfont icon-link select-arrow"></i>
    <div
      class="select__menu"
      :style="{ height: state ? menuHeight : '0', opacity: state ? '1' : '0' }"
    >
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
import { defineComponent, ref, watch, getCurrentInstance } from "vue";

export default defineComponent({
  props: {
    modelValue: String,
    list: Array,
  },
  emits: ["update:modelValue"],
  setup(props: any, ctx: any) {
    const instance = getCurrentInstance();
    // 添加数据
    (instance as any).appContext.mixins[0].select.value.push({
       state: false,
       uid: instance?.uid
     });

    const state = ref<boolean>(false);
    const showText = ref<string>(props.modelValue);
    const menuHeight = `${props.list.length * 36}px`;

    watch(
      () => props.modelValue,
      (newValue: string) => {
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
  border-radius: 3px;
  border: 1px solid #d9d9d9;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 30px;
  line-height: 30px;
  outline: none;
  padding: 0 10px;
  width: 100%;
}

.select__menu {
  background-color: #fff;
  position: absolute;
  width: 100%;
  border-radius: 2px;
  overflow: hidden;
  opacity: 1;
  transition: all 0.1s;
  box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
    0 9px 28px 8px rgb(0 0 0 / 5%);
  z-index: 1009;
  margin-top: 6px;
  color: rgba(0, 0, 0, 0.85);
}

.select__menu li {
  cursor: pointer;
  height: 32px;
  line-height: 32px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  padding: 2px 14px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  /* background-color: brown; */
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 20%;
}

.select__menu li:hover {
  background-color: #f5f7fa;
}
</style>