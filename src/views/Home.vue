<template>
  <div id="home">
   <a class="cmt-item" v-for="(item, index) in comments" :key="index"
    @click="ClickEvent(index)" :name="`${item.Title[0]}`">
      <div class="op0" style="background-color:#409EFF">
        <span>{{item.Title[0]}}</span>
      </div>
     <div class="op1">
      <p>
        <span class="item-label">Url:</span>
        <span class="item-value" style="font-weight:500">{{item.Url[0]}}</span>
      </p>
      <p>
        <span class="item-label">Method:</span>
        <span class="item-value">{{item.Method[0]}}</span>
      </p>
      <p>
        <span class="item-label"></span>
        <table class="imagetable">
          <tr v-for="(cmt, idx) in item.Params" :key="idx">
            <td v-for="(text, idx1) in cmt" :key="idx1">
              <div class="text">{{text}}</div>
            </td>
          </tr>
      </table>
      </p>
     </div>
   </a>
 </div>
 <SettingComponent></SettingComponent>
 <MenuComponent></MenuComponent>
 <SearchComponent></SearchComponent>
 <FetchComponent></FetchComponent>
</template>

<script lang='ts'>
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { comments, currClickIdx, MainMenuChange, MainMenuInfo } from "./comm";
import SettingComponent from "./Setting.vue";
import MenuComponent from "./Menu.vue";
import SearchComponent from "./Search.vue";
import FetchComponent from "./Fetch.vue";

export default defineComponent({
  components: {
    SettingComponent,
    MenuComponent,
    SearchComponent,
    FetchComponent,
  },
  setup() {
    let prev = 0;
    let timer: any = null;

    onMounted(() => {
      // window.addEventListener("scroll", () => {
      //   clearTimeout(timer);
      //   MainMenuInfo.value[0].display = false;
      //   prev = document.documentElement.scrollTop || document.body.scrollTop;
      //   timer = setTimeout(() => {
      //     let scrollHeight =
      //       document.documentElement.scrollTop || document.body.scrollTop;
      //     if (scrollHeight == prev) {
      //       MainMenuInfo.value[0].display = true;
      //     }dd
      //   }, 100);
      // });
    });

    const ClickEvent = (idx: number) => {
      console.log(idx);
      currClickIdx.value = idx;
      MainMenuChange(4, 10000);
    };

    return {
      comments,
      ClickEvent,
    };
  },
});
</script>

<style lang="css" scoped>
.op0 {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  font-size: 1.1rem;
  color: #303133;
}
.op1 {
  height: 100%;
  margin: 14px 0;
}
.home {
  /* background-color: tomato; */
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.cmt-item {
  width: 100%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  /* border-radius: 6px; */
  overflow: hidden;
  margin-bottom: 6px;
  display: block;
  transition: 0.3s;
}
.cmt-item p {
  padding: 4px 0;
  width: 100%;
  /* background-color: coral; */
}
.item-label {
  display: inline-block;
  font-weight: 700;
  width: 70px;
  padding: 0 16px;
  text-align: right;
  color: #606266;
  /* background-color: blueviolet; */
}

.item-value {
  display: inline-block;
  background-color: #ebeef5;
  padding: 1px 4px;
  border-radius: 2px;
  color: #606266;
  font-weight: 500;
}

table {
  vertical-align: middle;
  display: inline-block;
  border-collapse: collapse;
  table-layout: fixed;
  /* background-color: blueviolet; */
}

table caption {
  font-size: 1.5em;
  margin: 0.5em 0 0.75em;
}

table tr {
  /* background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em; */
}

table th,
table td {
}

.text {
  height: 46px;
  min-width: 150px;
  font-size: 1rem;
  font-weight: 500;
  border-bottom: 2px solid #eee;
  text-align: left;
  line-height: 46px;
}
</style>