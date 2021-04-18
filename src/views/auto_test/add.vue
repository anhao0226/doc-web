<template>
  <div class="section_add">
    <DrawerComponent :width="500" algin="left" v-model="state" :zIndex="10000">
      <template v-slot:title>Add</template>
      <template v-slot:content>
        <!--  -->
        <div class="box sec-input">
          <p class="label">
            <span>Ref</span>
            <input type="text" v-model="refValue">
          </p>
        </div>
        <!--  -->
        <div class="box sec-input">
          <p class="label">
            <span>Input</span>
          </p>
          <table class="gridtable">
            <tr>
              <th>key</th>
              <th>value</th>
              <th>auto</th>
              <th>type</th>
            </tr>
            <tr v-for="(item, index) in _inputValues" :key="index">
              <td>{{ item.key }}</td>
              <td><input class="input" type="text" v-model="item.data" /></td>
              <td><input class="input" type="text" v-model="item.auto" /></td>
              <td><input class="input" type="text" v-model="item.type" /></td>
            </tr>
          </table>
        </div>
        <!--  -->
        <div class="box sec-cond">
          <p class="label">
            <span>Verify</span>
            <span style="padding: 0 50px" @click="addVerifyCond">new</span>
          </p>
          <table class="gridtable">
            <tr>
              <th>key</th>
              <th>value</th>
              <th>op</th>
            </tr>
            <tr v-for="(item, index) in verify" :key="index">
              <td><input class="input" type="text" v-model="item.key" /></td>
              <td><input class="input" type="text" v-model="item.val" /></td>
              <td>
                <i class="iconfont icon-trash" @click="delCondValue(index)"></i>
              </td>
            </tr>
          </table>
        </div>
        <!--  -->
        <div class="box sec-new">
          <div @click="newSec">New</div>
        </div>
      </template>
    </DrawerComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import DrawerComponent from "./../../components/Drawer.vue";
import {
  currentSectionNode,
  Section,
  Tree,
  nodeCountIncrease,
  depthSecCount,
} from "../comm";
import { state } from "./comm";
import { saveSections } from "./../../libs/storage";
import { _commentIndex, _inputValues } from "./../../store/index";
import { getMobile, getUUID } from "@/libs/utils";

export default defineComponent({
  components: {
    DrawerComponent,
  },
  setup() {
    const refValue = ref<string>(""); 
    const verify = ref<{ key: string; val: string }[]>([]);

    const addVerifyCond = () => {
      verify.value.push({ key: "", val: "" });
    };

    const delCondValue = (index: number) => {
      verify.value.splice(index, 1);
    };

    const newSec = () => {
      let sec = new Section();
      sec.cid = _commentIndex.value;
      _inputValues.value.forEach((ele) => {
        let v = "";
        if (ele.auto) {
          switch (ele.type) {
            case "mobile":
              v = getMobile();
              break;
            case "uuid":
              v = getUUID();
              break;
          }
        }
        sec.input.push({
          key: ele.key,
          data: v,
          auto: ele.auto,
          type: ele.type,
        });
      });

    if(refValue.value.toString().length > 0){
      sec.reference.push(refValue.value.toString());
    }
      

      verify.value.forEach((ele) => {
        sec.verify[ele.key] = ele.val;
      });

      sec.id = nodeCountIncrease();
      sec.depth = currentSectionNode.depth + 1;
      if (depthSecCount.length <= sec.depth) {
        depthSecCount[sec.depth] = 0;
      }
      depthSecCount[sec.depth]++;
      currentSectionNode.next.push(sec);

      saveSections(JSON.stringify(Tree.value));

      _inputValues.value = [];
      verify.value = [];
    };

    const addBoxState = ref<boolean>(false);
    const hiddenAddBox = () => {
      state.value = false;
    };

    return {
      verify,
      addVerifyCond,

      newSec,
      Tree,
      currentSectionNode,
      hiddenAddBox,
      addBoxState,
      state,
      delCondValue,
      _inputValues,
      _commentIndex,
      refValue,
    };
  },
});
</script>

<style scoped>
.box {
  width: 90%;
  padding: 0 5%;
}

table.gridtable {
  font-family: verdana, arial, sans-serif;
  font-size: 11px;
  color: #333333;
  border-width: 1px;
  border-color: #606266;
  border-collapse: collapse;
}
table.gridtable th {
  padding: 8px;
  border: none;
  min-width: 100px;
  border-bottom: 2px solid #606266;
  text-align: center;
}
table.gridtable td {
  padding: 8px;
  border: none;
  min-width: 100px;
  border-bottom: 2px solid #606266;
  font-size: 1rem;
  text-align: center;
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

.sec-cond {
  margin-top: 30px;
}

.sec-new div {
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px 0;
  border-radius: 2px;
  margin-top: 20px;
  text-align: center;
  color: #fff;
}
</style>