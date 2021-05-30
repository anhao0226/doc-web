<template>
  <!-- 用户登录 -->
  <div class="login-container">
    <div class="user_info" v-if="loginState">
      <span>{{ userinfo.email }}</span>
      <span @click="logoutHandler">logout</span>
      <router-link :to="{ name: 'register' }"> Register</router-link>
    </div>
    <div class="user_login" v-else>
      <span>
        <InputComponent
          label="Username"
          v-model="username"
          type="text"
        ></InputComponent>
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
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";
import InputComponent from "../base/input.vue";
import { useRouter } from "vue-router";
import { userLogin } from "@/services/user";
import { useStore } from "@/store/index";
export default defineComponent({
  components: {
    InputComponent: InputComponent,
  },
  setup() {
    const router = useRouter();
    const username = ref<string>("");
    const password = ref<string>("");
    const store = useStore();
    const userinfo = ref<{ email: string }>({ email: "" });
    const loginState = ref<boolean>(false);

    onMounted(() => {
      if (store.state.token !== "") {
        loginState.value = true;
        userinfo.value.email = store.state.email;
      }
    });

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
              store.commit("token", res.Result.token).emit("token");
              store.commit("email", res.Result.email).emit("email");
              store.commit("userID", res.Result.id).emit("userID");
              store.commit("user_id", res.Result.uid).emit("user_id");

              res.Result.config.forEach((item: any) => {
                const value = {
                  uid: item.uid,
                  value: item.text,
                  enable: item.enable == 0 ? false : true,
                }
                switch (item.type) {
                  case "0":
                    store.state.data_addrs.push(value);
                    break;
                  case "1":
                    store.state.fetch_addrs.push(value);
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

    const logoutHandler = () => {
      loginState.value = false;
    };
    return {
      loginState,
      userinfo,
      username,
      password,
      logoutHandler,
      userLoginHandler,
    };
  },
});
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;
}

.user_login,
.user_info {
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

.user_login span {
  padding: 6px 0;
}

.user_login span:last-child {
  background-color: cadetblue;
  width: 240px;
  text-align: center;
  border-radius: 2px;
  font-weight: 600;
  color: #fff;
  padding: 10px 0;
}
</style>