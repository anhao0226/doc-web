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
import InputComponent from "../base/Input.vue";
import { useRouter } from "vue-router";
import { userLogin } from "@/services/user";
import { useStorage } from "@/libs/storage";
import { GConfig } from "@/store/index";
export default defineComponent({
  components: {
    InputComponent: InputComponent,
  },
  setup() {
    const router = useRouter();
    const username = ref<string>("");
    const password = ref<string>("");
    const localStorage = useStorage();

    const userLoginHandler = () => {
      if (username.value.length > 0 && password.value.length > 0) {
        userLogin({
          email: username.value,
          password: password.value,
        })
          .then((res) => {
            console.log(res);
            if (res.Success && res.Code == "0000") {
              localStorage.saveValue("user", res.Result.user);
              localStorage.saveValue("token", res.Result.token);
              localStorage.saveValue("email", res.Result.email);
              GConfig.value = {
                dataAddrs: [],
                fetchAddrs: [],
                httpsEnable: false,
                currFetchAddr: "",
              };
              res.Result.config.forEach((item: any) => {
                switch (item.type) {
                  case "0":
                    GConfig.value.dataAddrs.push({
                      value: item.text,
                      enable: item.enable == 0 ? false : true,
                    });
                    break;
                  case "1":
                    GConfig.value.fetchAddrs.push({
                      value: item.text,
                      enable: item.enable == 0 ? false : true,
                    });
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