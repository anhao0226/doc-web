<template>
  <div class="wrapper" :style="{'width': state ? '400px' : '0'}">
    <div class="container">
      <div class="title_bar">
        <span class="close" @click="hiddenAddBox"></span>
      </div>
      <!-- 对应的注释下标 -->
      <div class="box sec-id">
        {{_commentIndex}}
      </div>
      <!-- 测试输入参数 -->
      <div class="box sec-input">
        <p class="label">Input Value</p>
        <table class="gridtable">
          <tr>
            <th>key</th>
            <th>value</th>
            <th>op</th>
          </tr>
          <tr v-for="(item, index) in _inputValues" :key="index">
            <td>{{ item.key }}</td>
            <td><input class="input" type="text" v-model="item.val" /></td>
            <td><i class="iconfont icon-trash"></i></td>
          </tr>
        </table>
      </div>

      <div class="box sec-cond">
        <p class="label">Verify Value</p>
        <table class="gridtable">
          <tr>
            <th>key</th>
            <th>value</th>
            <th>op</th>
          </tr>
          <tr v-for="(item, index) in nexts" :key="index">
            <td>{{ item.key }}</td>
            <td>{{ item.val }}</td>
            <td><i class="iconfont icon-trash" @click="delCondValue(index)"></i></td>
          </tr>
          <tr>
            <td>
              <input class="input" type="text" v-model="nextKey" />
            </td>
            <td>
              <input class="input" type="text" v-model="nextVal" />
            </td>
            <td>
              <i class="iconfont icon-add" @click="addConds"></i>
            </td>
          </tr>
        </table>
      </div>

      <!--  -->
      <div class="box sec-new">
        <div class="box-new" @click="newSec">New</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref} from "vue";
import InputComponent from "../Input.vue";
import { currentSectionNode, Section, Tree, nodeCountIncrease, comments} from "../comm";
import { state } from './comm'
import {} from './../../libs/storage'
import { _commentIndex, _inputValues } from './../../store/index'

export default defineComponent({
  components: {},
  setup() {

    // // 用于存储流程图和渲染
    // const sid = ref<number>(0);
    // input 输入值
    // const iKey = ref<string>("");
    // const iVal = ref<string>("");
    // const inputs = ref<{ key: string; val: string }[]>([]);
    // next 向下执行的条件
    const nextKey = ref<string>("");
    const nextVal = ref<string>("");
    const nexts = ref<{ key: string; val: string }[]>([]);
    //
    // const addKeys = () => {
    //   if (iKey.value && iVal.value) {
    //     inputs.value.push({ key: iKey.value, val: iVal.value });
    //     iKey.value = iVal.value = "";
    //   } else {
    //     alert("请输入完整值");
    //   }
    // };

    const addConds = () => {
      if (nextKey.value && nextVal.value) {
        nexts.value.push({ key: nextKey.value, val: nextVal.value });
        nextKey.value = nextVal.value = "";
      } else {
        alert("请输入完整值");
      }
    };


    // const delInputValue = (index: number) => {
    //   inputs.value.splice(index, 1);
    // }

    const delCondValue = (index: number) => {
      nexts.value.splice(index, 1);
    }

    const newSec = () => {
      let sec = new Section();
      sec.cid = _commentIndex.value;
      _inputValues.value.forEach((ele) => {
        sec.input[ele.key] = ele.val;
      });
      nexts.value.forEach((ele) => {
        sec.cond[ele.key] = ele.val;
      });
      sec.id = nodeCountIncrease();
      currentSectionNode.next.push(sec);

      _inputValues.value = [];
      nexts.value = [];
      // 打印根节点
      console.log(Tree);
    };

    const addBoxState = ref<boolean>(false);
    const hiddenAddBox = () => {
      state.value = false;
    };

    return {
      nexts,
      nextKey,
      nextVal,

      addConds,

      newSec,
      Tree,
      currentSectionNode,
      hiddenAddBox,
      addBoxState,
      state,
      delCondValue,
      _inputValues,
      _commentIndex,
    };
  },
});
</script>

<style scoped>
.wrapper {
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  transition: 0.3s;
}
.container {
  width: 400px;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.title_bar {
  width: 100%;
  height: 16px;
  /* background-color: rosybrown; */
  text-align: right;
  line-height: 16px;
}

.title_bar span {
  width: 12px;
  height: 12px;
  background-color: royalblue;
  display: inline-block;
  border-radius: 50%;
  margin-right: 4px;
}

table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #606266;
  border-collapse: collapse;
  margin: auto;
}
table.gridtable th {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  border-color: #606266;
  /* background-color: #dedede; */
}
table.gridtable td {
  border-width: 1px;
  padding: 8px;
  border-style: solid;
  /* border-color: #666666; */
  font-size: 1rem;
  /* background-color: royalblue; */
}

.box {
  display: inline-block;
  width: 100%;
}

.box .input {
  width: 100%;
  outline: none;
  height: 100%;
  border-style: none;
  height: 26px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0);
}
.box .label {
  padding: 14px 0;
  color: #303133;
  font-weight: 600;
}

.sec-new {
  margin-top: 10px;
  width: 386px;
  padding: 8px 0;
  color: #ffffff;
  background-color: #606266;
}

.sec-id {
  padding: 16px 0;
  width: 386px;
  /* background-color: salmon; */
}
</style>