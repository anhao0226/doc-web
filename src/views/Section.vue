<template>
  <div class="wrapper">
    <div class="container">
    {{currentSectionNode.id}}
    <div></div>
      <!--  -->
      <div class="box sec-id">
        <InputComponent label="id" :width="270" v-model="sid"/>
      </div>
      <!--  -->
      <div class="box sec-input">
        <ul>
          <li>
            <span>Input</span>
            <span @click="addKeys">+</span>
          </li>
          <li>
            <InputComponent label="key" :width="270" v-model="iKey" />
          </li>
          <li>
            <InputComponent label="val" :width="270" v-model="iVal" />
          </li>
        </ul>
        <table class="sec-table">
          <tr v-for="(item, index) in inputs" :key="index">
            <td>{{ item.key }}</td>
            <td>{{ item.val }}</td>
          </tr>
        </table>
      </div>

      <div class="box sec-success">
        <ul>
          <li>
            <span>Next Cond</span>
            <span @click="addConds">+</span>
          </li>
          <li>
            <InputComponent label="key" :width="270" v-model="nextKey" />
          </li>
          <li>
            <InputComponent label="val" :width="270" v-model="nextVal" />
          </li>
        </ul>
        <table class="sec-table">
          <tr v-for="(item, index) in nexts" :key="index">
            <td>{{ item.key }}</td>
            <td>{{ item.val }}</td>
          </tr>
        </table>
      </div>

      <!-- <div class="box sec-cond">
        <ul>
          <li>
            <span>Output</span>
            <span @click="addKeys">+</span>
          </li>
          <li>
            <InputComponent label="key" :width="270" />
          </li>
          <li>
            <InputComponent label="val" :width="270" />
          </li>
        </ul>
        <table class="sec-table">
          <tr v-for="(item, index) in inputs" :key="index">
            <td>{{ item.key }}</td>
            <td>{{ item.val }}</td>
          </tr>
        </table>
      </div> -->
      <!--  -->

      <!--  -->
      <div class="box" >
            <div class="box-new" @click="newSec">New</div>
        </div>
    </div>
    <!--  -->
    <!-- <div class="show">
      <div v-for="(item, index) in sections.next" :key="index">
        {{ item.id }}
        <span>+</span>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import InputComponent from "./Input.vue";
import { currentSectionNode,  Section, Tree, nodeCountIncrease, } from './comm'

export default defineComponent({
  components: {
    InputComponent,
  },
  props: {},
  setup() {
    // // 用于存储流程图和渲染
   
    const sid = ref<number>(0);
    // input 输入值
    const iKey = ref<string>("");
    const iVal = ref<string>("");
    const inputs = ref<{ key: string; val: string }[]>([]);
    // next 向下执行的条件
    const nextKey = ref<string>("");
    const nextVal = ref<string>("");
    const nexts = ref<{ key: string; val: string }[]>([]);
    //
    const addKeys = () => {
      if (iKey.value && iVal.value) {
        inputs.value.push({ key: iKey.value, val: iVal.value });
        iKey.value = iVal.value = '';
      }else{
          alert('请输入完整值');
      }
    };

    const addConds = () => {
        if (nextKey.value && nextVal.value) {
            nexts.value.push({ key: nextKey.value, val: nextVal.value });
            nextKey.value = nextVal.value = '';
        }else{
            alert('请输入完整值')
        }
    };

    const newSec = () => {
      let sec = new Section();
      sec.cid = sid.value;
      inputs.value.forEach((ele) => {
        sec.input[ele.key] = ele.val;
      });
      nexts.value.forEach((ele) => {
        sec.cond[ele.key] = ele.val;
      });
      sec.id = nodeCountIncrease();
      currentSectionNode.next.push(sec);
      // 打印根节点
      console.log(Tree)
    };

    return {
      sid,
      iKey,
      iVal,
      inputs,

      nexts,
      nextKey,
      nextVal,

      addConds,
      addKeys,

      newSec,
      Tree,
      currentSectionNode,
    };
  },
});
</script>

<style scoped>
.wrapper {
  height: 100%;
  background-color: #fff;
  width: 310px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10000;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  overflow-y: scroll;
  text-align: center;
  padding: 10px 0;
}

.box {
  display: inline-block;
  /* border: 1px solid yellow; */
  /* padding: 6px; */

  /* border-bottom: 1px solid rgba(0, 0, 0, 0.1); */
}

.box li {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 0;
}

.box li:first-child {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  /* border-bottom: 2px solid rgba(0, 0, 0, 0.1); */
}

.box li input {
  border-style: none;
  border-bottom: 2px solid blueviolet;
  outline: none;
  /* padding: 4px 0; */
}

.box-new {
    width: 270px;
    background-color: cadetblue;
    padding: 10px 0;
    border-radius: 1px;
}
</style>