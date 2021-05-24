<template>
  <!-- 用户登录 -->
  <div class="login-container">
    <div class="user_login">
      <div class="reg__success" v-show="showHintBox">
        {{ count }}s to login page
      </div>
      <span>
        <InputComponent
          label="Email"
          v-model="email"
          type="text"
          :color="undelineState"
        ></InputComponent>
      </span>
      <span>
        <InputComponent
          label="Password"
          v-model="password"
          type="password"
        ></InputComponent>
      </span>
      <span @click="userRegisterHandler">Register</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, watch } from "vue";
import InputComponent from "../base/input.vue";
import { useRouter } from "vue-router";
import { userRegister, userIsExit } from "@/services/user";
import { encryptionPassword } from "@/libs/utils";
export default defineComponent({
  components: {
    InputComponent: InputComponent,
  },
  setup() {
    const router = useRouter();
    const email = ref<string>("");
    const password = ref<string>("");
    const undelineState = ref<boolean>(false);
    const count = ref<number>(3);
    const showHintBox = ref<boolean>(false);

    const userRegisterHandler = () => {
      if (email.value.length == 0 || password.value.length == 0) {
        return;
      }
      userRegister({
        email: email.value,
        password: encryptionPassword(password.value),
      }).then((res) => {
        if (res && res.Success) {
          showHintBox.value = true;
          const timer = setInterval(() => {
            count.value--;
          }, 1000);
          setTimeout(() => {
            clearInterval(timer);
            router.push({ name: "login" });
          }, 3000);
        }
      });
    };

    const userIsExitHandler = (email: string) => {
      userIsExit({
        email: email,
      }).then((res) => {
        console.log(res);
        if (res && res.Success) {
          undelineState.value = true;
        } else {
          undelineState.value = false;
        }
      });
    };

    watch(email, (newValue: string) => {
      userIsExitHandler(newValue);
    });

    return {
      count,
      email,
      password,
      showHintBox,
      undelineState,
      userRegisterHandler,
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