<template>
  <!-- MainMenuInfo[8].display -->
  <DrawerCompoment
    :zIndex="3000"
    v-model="MainMenuInfo[8].display"
    algin="right"
    :width="300"
  >
    <template v-slot:title>Message</template>
    <template v-slot:content>
      <!-- 好友列表 -->
      <ul class="buddy__list" v-if="!showChatBox">
        <li
          v-for="(item, index) in buddys"
          :key="index"
          @click="changeChatStateHandler(index)"
        >
          {{ item.email }}
        </li>
      </ul>
      <!-- 消息发送框 -->
      <ChatComponent
        :chatState="chatState"
        @close="showBuddyPageHandler"
        v-else
      ></ChatComponent>
    </template>
  </DrawerCompoment>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { MainMenuInfo } from "./comm";
import { useStore } from "../../store/index";
import DrawerCompoment from "../../components/Drawer.vue";
import { userBuddys } from "@/services/user";
import ChatComponent from "./chat.vue";
import { hasOwnProperty } from "@/libs/utils";

interface State {
  type: number;
  buddy: string;
}

interface Buddy {
  email: string;
  object: string;
  uid: string;
}

interface Message {
  Type: number;
  Text: string;
  Sender: string;
}

export default defineComponent({
  components: {
    DrawerCompoment,
    ChatComponent,
  },
  setup() {
    const text = ref<string>("");
    const store = useStore();
    const user = store.state.user;
    const chatState = ref<Buddy>({ email: "", object: "", uid: "" });
    const buddys = ref<Buddy[]>([]);
    const showChatBox = ref<boolean>(false);

    // 消息监听
    if (store.state.ws_conn as WebSocket) {
      (store.state.ws_conn as WebSocket).onmessage = function (event: any) {
        const msg: Message = JSON.parse(event.data);
        if (!hasOwnProperty(store.state.wsState.message, msg.Sender)) {
          store.state.wsState.message[msg.Sender] = [];
        }
        //
        store.state.ws_chat_message.push({
          type: 1,
          text: msg.Text,
        });
        //
        store.state.wsState.message[msg.Sender].push({
          type: 1,
          text: msg.Text,
        });
      };
    }
    //
    const fetchBuddyListHandler = () => {
      userBuddys({ user: user })
        .then((res) => {
          console.log(res);
          if (res.Success && res.Code == "0000") {
            buddys.value = res.Result;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    onMounted(() => {
      fetchBuddyListHandler();
    });

    const showBuddyPageHandler = () => {
      showChatBox.value = false;
    };

    const changeChatStateHandler = (idx: number) => {
      chatState.value = buddys.value[idx];
      showChatBox.value = true;
    };

    return {
      user,
      text,
      store,
      buddys,
      MainMenuInfo,
      chatState,
      showChatBox,
      changeChatStateHandler,
      showBuddyPageHandler,
    };
  },
});
</script>

<style lang="css" scoped>
.buddy__list {
  padding: 0 4px;
}
.buddy__list li {
  padding: 20px 0;
  cursor: pointer;
  width: 100%;
  border-bottom: 1px solid #eee;
}
</style>