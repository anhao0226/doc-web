<template>
  <DrawerComponent
    v-model="G_DrawerState.info"
    :width="500"
    algin="right"
    :zIndex="10003"
  >
    <template v-slot:title>Details</template>
    <template v-slot:content>
      <div class="">
        <div class="data-title">
          <span class="title">{{
            SBaseInfo.title.length > 0 ? SBaseInfo.title : "Select Api"
          }}</span>
          <i @click="changeInfo" class="iconfont icon-trash"></i>
        </div>
        <div class="data-input-box">
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
            <!-- 数据处理和绑定 -->
            <tr v-for="(item, index) in SInputVals" :key="index">
              <!-- key  -->
              <td>{{ item.key }}</td>
              <!-- data -->
              <td><input class="input" type="text" v-model="item.detail" /></td>
              <!-- auto -->
              <td><Switch v-model="item.auto"></Switch></td>
              <!-- type -->
              <td>
                <Select
                  v-model="item.type"
                  :list="['mobile', 'uuid', 'f-input', 'f-result', 'custom']"
                ></Select>
              </td>
            </tr>
          </table>
        </div>
        <div class="data-input-box">
          <p class="label">
            <span>Verify</span>
            <span style="padding: 0 50px" @click="addVerifyValue">new</span>
          </p>
          <table class="gridtable">
            <tr>
              <th>key</th>
              <th>value</th>
              <th>op</th>
              <th>type</th>
            </tr>
            <tr v-for="(item, index) in SVerifyVals" :key="index">
              <td><input class="input" type="text" v-model="item.key" /></td>
              <td><input class="input" type="text" v-model="item.value" /></td>
              <td>
                <i
                  class="iconfont icon-trash"
                  @click="delVerifyValue(index)"
                ></i>
              </td>
            </tr>
          </table>
        </div>
        <div @click="saveNodeInfo" class="save_btn">Save</div>
      </div>
    </template>
  </DrawerComponent>
</template>

<script lang='ts'>
import { defineComponent, watch, ref } from "vue";
import DrawerComponent from "./../../components/Drawer.vue";
import Switch from "./../../components/Switch.vue";
import Select from "./../../components/Select.vue";

import {
  SInputVals,
  SVerifyVals,
  G_DrawerState,
  SSaveNode,
  SRootNode,
  STitle,
  SBaseInfo,
} from "./store";
import { saveSections } from "./../../libs/storage";

export default defineComponent({
  components: {
    DrawerComponent,
    Switch,
    Select,
  },
  setup(props: any) {
    const boxState = ref<boolean>(props.state);
    watch(
      () => props.state,
      (newValue) => {
        boxState.value = newValue;
      }
    );

    // 保存节点信息
    const saveNodeInfo = () => {
      SSaveNode();
    };

    const addVerifyValue = () => {
      // 添加需要验证的值
      SVerifyVals.value.push({ key: "", value: "" });
    };

    // 删除验证条件
    const delVerifyValue = (index: number) => {
      SVerifyVals.value.splice(index, 1);
    };

    const changeInfo = () => {
      G_DrawerState.value.menu = true;
    };

    return {
      boxState,
      addVerifyValue,
      delVerifyValue,
      saveNodeInfo,
      changeInfo,
      SInputVals,
      SBaseInfo,
      SVerifyVals,
      G_DrawerState,
      STitle,
    };
  },
});
</script>


<style scoped>
table.gridtable {
  display: inline-block;
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
.data-input-box {
  /* background-color: brown; */
  text-align: center;
  padding: 20px 0;
}

.data-input-box .label {
  padding: 10px 0;
}

.label {
  background-color: blanchedalmond;
  width: 98%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}

.label span {
  padding: 0 10px;
}

.input {
  width: 100px;
}

.data-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 10px;
  padding: 10px 10px;
  border-bottom: 2px solid #606266;
  /* background-color: rgba(0, 0, 0, 0.1); */
}

.data-title .title {
  font-weight: 600;
}

.save_btn {
  margin: 0 10px;
  background-color: blanchedalmond;
  text-align: center;
  padding: 10px 0;
}
</style>