<template>
  <!-- MainMenuInfo[8].display -->
  <DrawerCompoment
    :zIndex="3000"
    v-model="menuState[menuIdx].display"
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
import { menuState } from "@/views/base/comm";
import { useStore } from "../../store/index";
import DrawerCompoment from "../../components/Drawer.vue";
import { userBuddys } from "@/services/user";
import ChatComponent from "./chat.vue";
import { NoticeState, ChatMessage } from "@/libs/type";
import { hasOwnProperty } from "@/libs/utils";
import __WebSocket from "@/libs/websocket";

interface Buddy {
  email: string;
  object: string;
  uid: string;
  input: boolean;
}

export default defineComponent({
  props: ["index"],
  components: {
    DrawerCompoment,
    ChatComponent,
  },
  setup(props: any) {
    const text = ref<string>("");
    const store = useStore();
    const user = store.state.user;
    const menuIdx = ref<number>(props.index); 

    const chatState = ref<Buddy>({
      email: "",
      object: "",
      uid: "",
      input: false,
    });

    const buddys = ref<Buddy[]>([]);
    const showChatBox = ref<boolean>(false);
    let timer: any = null;

    if (store.state.ws_conn as __WebSocket) {
      (store.state.ws_conn as __WebSocket).subscribe((e: MessageEvent) => {
        store.state.last_recv_time = new Date().toUTCString();
        const msg: ChatMessage = JSON.parse(e.data);
        handleMessageHandler(msg);
      });
    }

    const handleMessageHandler = (msg: ChatMessage) => {
      switch (msg.Type) {
        case 0: {
          const m = { type: 1, text: msg.Text };
          if (msg.Sender === chatState.value.object) {
            store.state.chat_msg.push(m);
            store.state.chat_history.message[chatState.value.object].push(m);
          }
          break;
        }
        case 1:
          if (msg.Sender == chatState.value.object) {
            chatState.value.input = true;
            if (timer) {
              clearTimeout(timer);
            }
            timer = setTimeout(() => {
              chatState.value.input = false;
            }, 3000);
          }
          break;
      }
    };

    const fetchBuddyListHandler = () => {
      userBuddys({ user: user }).then((res) => {
        if (res.Success && res.Code == "0000") {
          buddys.value = res.Result;
        }
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
      menuIdx,
      menuState,
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