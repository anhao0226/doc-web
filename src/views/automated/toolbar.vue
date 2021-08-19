<template>
  <div class="toolbar">
    <ul>
      <li class="menu" @click="clickEvent(0)">
        <i class="iconfont icon-shezhi icon"></i>
        <span>Home</span>
      </li>
      <li class="menu" @click="clickEvent(1)">
        <i class="iconfont icon-shezhi icon"></i>
        <span>Reset</span>
      </li>
      <li class="menu" @click="clickEvent(2)">
        <i class="iconfont icon-shezhi icon"></i>
        <span>New</span>
      </li>
      <li class="menu" @click="clickEvent(3)">
        <i class="iconfont icon-shezhi icon"></i>
        <span>Child</span>
      </li>
      <li class="menu" @click="clickEvent(4)">
        <i class="iconfont icon-shezhi icon"></i>
        <span>Link</span>
      </li>
      <li class="menu" @click="clickEvent(5)">
        <i class="iconfont icon-shezhi icon"></i>
        <span>Remove</span>
      </li>
      <li class="menu" @click="clickEvent(6)">
        <i class="iconfont icon-shezhi icon"></i>
        <span>Save</span>
      </li>
      <li class="menu" @click="clickEvent(7)">
        <i class="iconfont icon-shezhi icon"></i>
        <span>Run</span>
      </li>
      <li class="menu" @click="clickEvent(8)">
        <i class="iconfont icon-shezhi icon"></i>
        <span>Outline</span>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { ref, defineComponent, SetupContext } from "vue";
export default defineComponent({
  emits: ["click"],
  setup(_, context: SetupContext) {
    const clickEvent = (id: number) => {
      context.emit("click", id);
    };
    return {
      clickEvent,
    };
  },
});
</script>

<style scoped>
.toolbar {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 3003;
  text-align: center;
}
ul {
  /* background-color: rosybrown; */
  position: relative;
  overflow: hidden;
}

ul .menu {
  /* background-color: rebeccapurple; */
  cursor: pointer;
  display: inline-block;
  padding: 20px 0;
  width: 110px;
}

ul .menu:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

ul .menu span {
  padding-left: 6px;
  font-weight: 600;
}

.icon {
  vertical-align: middle;
  font-size: 2rem;
}
</style>