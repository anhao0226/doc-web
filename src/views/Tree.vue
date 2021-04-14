<template>
  <ul class="item" :style="{ 'border-color': color }">
    <li v-for="(item, index) in list" :key="index">
      <!-- 显示数据 -->
      <div @click="outputEvent(item)" class="box-test">
        <div
          class="content"
          :style="{
            'background-color': item.result.state ? '#67C23A' : '#F56C6C',
          }"
        >
          {{ item.cid }}
        </div>

        <div class="sub-id">{{ item.id }}</div>
      </div>
      <Tree
        v-if="item.next.length > 0"
        :list="item.next"
        :color="randomColor()"
      ></Tree>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { changeCurrNode, Section, Tree } from "./comm";
export default defineComponent({
  name: "Tree",
  props: ["list", "color"],
  setup(props: any) {
    const arrNum = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
    ];

    const randomColor = (): string => {
      let random = 0;
      let color = "#";
      for (let i = 0; i < 6; i++) {
        random = parseInt((Math.random() * 16).toString());
        color += arrNum[random];
      }
      return color;
    };

    const outputEvent = (v: any) => {
      console.log(Tree);
      console.log(v);
      changeCurrNode(v);
    };
    return {
      outputEvent,
      randomColor,
    };
  },
});
</script>

<style scoped>
.item {
  width: 100%;
  text-align: center;
  border: 1px solid #eee;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  /* padding: 0 4px; */
}

.item li {
  display: inline-block;
}

.box-test {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 10px;
  margin: 20px;
  color: #fff;
  font-size: 1.3rem;
  border: 1px solid #fff;
}
.content {
  display: inline-block;
  width: 40px;
  height: 40px;
  margin: 5px;
  line-height: 40px;
  border-radius: 50%;
  overflow: hidden;
  background-color: blanchedalmond;
}
.sub-id {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 0.8rem;
  z-index: 1001;
  color: #606266;
  font-weight: 600;
}
</style>