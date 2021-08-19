<template>
  <DrawerComponent
    v-model="SDrawerState.details"
    :width="500"
    algin="right"
    :zIndex="10003"
  >
    <template v-slot:title>Details</template>
    <template v-slot:content>
      <div class="details-container">
        <!-- 标题 -->
        <div class="data-title">
          <span class="title">{{
            SBaseInfo.title.length > 0 ? SBaseInfo.title : "Select Api"
          }}</span>
          <span>
            <!-- 展示结果 -->
            <i
              @click="showRequestResult"
              :class="['iconfont', 'icon-link', 'icon-default']"
            ></i>
            <!-- 展示结果 -->
            <i
              @click="selectMenu"
              :class="[
                'iconfont',
                'icon-link',
                'icon-default',
                SDrawerState.menu ? 'box-select' : '',
              ]"
            ></i>
          </span>
        </div>
        <!--  -->
        <div v-if="boxState" style="padding:16px">
          <pre><code>{{SRequestResult}}</code></pre>
        </div>
        <!--  -->
        <div v-if="!boxState">
          <!-- 参数 -->
          <div class="data-input-box">
            <p class="label">
              <span>Input</span>
            </p>
            <table class="gridtable">
              <tr>
                <th>key</th>
                <th>value</th>
                <th>type</th>
              </tr>
              <!-- 数据处理和绑定 -->
              <tr v-for="(item, index) in SInputVals" :key="index">
                <!-- key  -->
                <td>{{ item.key }}</td>
                <!-- data -->
                <td>
                  <input class="input" type="text" v-model="item.detail" />
                </td>
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
          <!-- 验证 -->
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
              </tr>
              <tr v-for="(item, index) in SVerifyVals" :key="index">
                <td><input class="input" type="text" v-model="item.key" /></td>
                <td>
                  <input class="input" type="text" v-model="item.value" />
                </td>
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
      </div>
    </template>
  </DrawerComponent>
</template>

<script lang='ts'>
import { defineComponent, watch, ref } from "vue";
import DrawerComponent from "./../../components/Drawer.vue";
import Select from "./../../components/Select.vue";

import {
  SInputVals,
  SVerifyVals,
  SDrawerState,
  SBaseInfo,
  SRequestResult,
} from "./store/index";

export default defineComponent({
  components: {
    DrawerComponent,
    Select,
  },
  setup(props: any) {
    const boxState = ref<boolean>(false);

    const saveNodeInfo = () => {
      // SSaveNode();
    };

    const addVerifyValue = () => {
      SVerifyVals.value.push({ key: "", value: "" });
    };

    const delVerifyValue = (index: number) => {
      SVerifyVals.value.splice(index, 1);
    };

    const selectMenu = () => {
      SDrawerState.value.menu = !SDrawerState.value.menu;
    };

    const showRequestResult = () => {
      boxState.value = !boxState.value;
    }

    return {
      addVerifyValue,
      delVerifyValue,
      saveNodeInfo,
      selectMenu,
      SInputVals,
      SBaseInfo,
      SVerifyVals,
      SDrawerState,
      showRequestResult,
      SRequestResult,
      boxState
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

.details-container {
  height: 100%;
  width: 100%;
  overflow-y: scroll;
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

.box-select {
  color: cadetblue;
}
.icon-default {
  padding: 0 10px;
}
</style>