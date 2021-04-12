<template>
  <div class="wrapper" :style="{ right: MainMenu[4] ? '0px' : '-340px' }">
    <!-- op -->
    <div class="op">
      <span @click="MainMenu[4] = false"></span>
    </div>
    <!-- title -->
    <div class="title">
      <span v-if="currClickIdx >= 0">
        {{ comments[currClickIdx].Title[0] }}
      </span>
      <span v-else>测试区域</span>
    </div>
    <!--  -->
    <div class="container" v-if="currClickIdx >= 0">
      <!-- 参数渲染区 -->
      <div class="box-params">
        <li v-for="(item, index) in comments[currClickIdx].Params" :key="index">
          <InputComponent
            :width="280"
            :label="item[0]"
            v-model="values[index]"
          ></InputComponent>
        </li>
      </div>
      <!--  -->
      <li>
        <div class="fetch-btn" @click="FetchResult">Fetch</div>
      </li>
      <!-- 请求结果展示区 -->
      <div class="result">
        <pre>{{ result }}</pre>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { currClickIdx, comments, MainMenu, Calculation, config } from "./comm";
import InputComponent from "./Input.vue";
import { AxiosGeneral } from "./../libs/http";
import { Method } from "node_modules/axios";

export default defineComponent({
  components: {
    InputComponent,
  },
  setup() {
    const values = ref<string[]>([]);

    const result = ref<string>("");

    watch(currClickIdx, (newValue: number, oldValue: number) => {
      console.log(newValue, oldValue);
      values.value.fill("");
      result.value = "";
    });

    const FetchResult = () => {
      // 处理参数
      const method = comments.value[currClickIdx.value].Method[0].trim();
      const url = comments.value[currClickIdx.value].Url[0].trim();
      let params: any = {};
      comments.value[currClickIdx.value].Params.forEach((ele, index) => {
        const label = (ele[0] as string).trim();
        params[label] = values.value[index];
      });

      // 请求数据
      AxiosGeneral({
        url: Calculation(config.value.testAddr[0], url),
        method: method as Method,
        params: params,
        success: (data: any) => {
          console.log(data);
          result.value = data;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    };

    return {
      currClickIdx,
      comments,
      values,
      result,
      FetchResult,
      MainMenu,
    };
  },
});
</script>

<style lang="css" scoped>
.wrapper {
  top: 0;
  position: fixed;
  right: -300px;
  min-width: 310px;
  transition: 0.3s;
  height: 100%;
  z-index: 1001;
  background-color: rgb(255, 255, 255, 0.94);
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}
.op {
  /* background-color: rgba(0, 0, 0, 0.1); */
}
.op span {
  display: inline-block;
  width: 11px;
  height: 11px;
  background-color: rgb(245, 107, 107, 1);
  border-radius: 5px;
  margin-left: 6px;
  transition: 0.2s;
}
.op span:first-child:hover {
  width: 12px;
  height: 12px;
  border-radius: 6px;
}

.container {
  width: 100%;
  height: calc(100% - 62px);
  overflow-y: scroll;
  /* background-color: brown; */
}

.container::-webkit-scrollbar {
  width: 0px;
  height: 4px;
  scrollbar-arrow-color: slategray;
}

.title {
  width: 100%;
  text-align: center;
  padding: 10px 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: #606266;
  /* background-color: crimson; */
}

.box-params li {
  padding: 2px 0;
  text-align: center;
}

.fetch-btn {
  text-align: center;
  background-color: rgb(65, 105, 225, 0.8);
  padding: 10px 0;
  border-radius: 3px;
  cursor: pointer;
  color: seashell;
  width: 280px;
  margin: 0 auto;
}

.result {
  /* background-color: rosybrown; */
  padding: 14px 10px;
  max-width: 280px;
  margin: 0 auto;
}
.result pre {
  background-color: rgba(0, 0, 0, 0.04);
  height: 260px;
  border-radius: 3px;
  font-size: 1rem;
  color: #303133;
  padding: 4px 4px;
  overflow: scroll;
}
</style>