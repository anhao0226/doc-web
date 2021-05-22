<template>
  <!-- 用户登录 -->
  <div class="login-container">
    <span>
      <InputComponent label="Username" v-model="username"></InputComponent>
    </span>
    <span>
      <InputComponent
        label="Password"
        v-model="password"
        type="password"
      ></InputComponent>
    </span>
    <span @click="userLoginHandler">Login</span>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from "vue";
import InputComponent from "../base/input.vue";
import { useRouter } from "vue-router";
import { userLogin } from "@/services/user";
import { useStorage } from "@/libs/storage";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    InputComponent: InputComponent,
  },
  setup() {
    const router = useRouter();
    const username = ref<string>("");
    const password = ref<string>("");
    const localStorage = useStorage();
    const store = useStore();

    const userLoginHandler = () => {
      if (username.value.length > 0 && password.value.length > 0) {
        userLogin({
          email: username.value,
          password: password.value,
        })
          .then((res) => {
            console.log(res);
            if (res.Success && res.Code == "0000") {
              
              store.commit("user", res.Result.user).emit("user");
              store.commit("token", res.Result.user).emit("token");
              store.commit("email", res.Result.user).emit("email");

              res.Result.config.forEach((item: any) => {
                switch (item.type) {
                  case "0":
                    store.state.data_addrs.push({
                      value: item.text,
                      enable: item.enable == 0 ? false : true,
                    });
                    store.emit("data_addrs");
                    break;
                  case "1":
                    store.state.fetch_addrs.push({
                      value: item.text,
                      enable: item.enable == 0 ? false : true,
                    });
                    store.emit("fetch_addrs");
                    break;
                }
              });
              router.push({ name: "home" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };
    return {
      username,
      password,
      userLoginHandler,
    };
  },
});
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 4000;
  background-color: #fff;
}
.login-container span {
  padding: 6px 0;
}

.login-container span:last-child {
  background-color: cadetblue;
  width: 240px;
  text-align: center;
  border-radius: 2px;
  font-weight: 600;
  color: #fff;
  padding: 10px 0;
}
</style>