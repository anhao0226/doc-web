<template>
  <div class="chat__container">
    <div class="title">
      <i class="iconfont icon-arrow-left-bold" @click="toBuddyPageHandler"></i>
      <span>{{ chatState.email }}</span>
      <span>{{ chatState.input ? "正在输入" : "" }}</span>
      <i class="iconfont icon-more"></i>
    </div>
    <ul class="message__list">
      <li v-for="(item, index) in store.state.chat_msg.value" :key="index">
        <div class="left" v-if="item.type == 1">
          <span>{{ item.text }}</span>
        </div>
        <div class="right" v-else>
          <span>{{ item.text }}</span>
        </div>
      </li>
    </ul>
    <div class="send__box">
      <input
        type="text"
        v-model="send_text"
        @keyup.enter="sendMessageHandler"
        @input="watchTextHandler"
      />
      <i class="iconfont icon-icon_fabu" @click="sendMessageHandler"></i>
    </div>
  </div>
</template>



<script lang='ts'>
interface Message {
  Type: number;
  Text: string;
  Sender: string;
}

interface MessageState {
  type: number;
  text: string;
}

import { defineComponent, onMounted, ref, watch } from "vue";
import { useStore } from "@/store/index";
import { sendMessage, pullMessage } from "@/services/user";
import { hasOwnProperty } from "@/libs/utils";
import { Queue, MessageType } from "@/libs/type";
import __WebSocket from "@/libs/websocket";
export default defineComponent({
  props: ["chatState", "close"],
  emits: ["close"],
  components: {},
  setup(props: any, ctx: any) {
    const store = useStore();
    const user = store.state.user;
    const userID = store.state.userID;
    const lastRecvTime = store.state.last_recv_time;
    const send_text = ref("");
    let receiver = "";
    let timer: any = null;

    onMounted(() => {
      receiver = props.chatState.object;
      (store.state.chat_msg as Queue<any>).reset();
      store.state.chatBox = document.getElementsByClassName("message__list")[0];
      if (hasOwnProperty(store.state.chat_history.message, receiver)) {
        store.state.chat_history.message[receiver].forEach(
          (msg: MessageState) => {
            (store.state.chat_msg as Queue<any>).push(msg);
          }
        );
      } else {
        store.state.chat_history.message[receiver] = [];
      }
      pullHistoryMessageHandler();
    });

    const watchTextHandler = () => {
      if (store.state.ws_conn && !timer) {
        (store.state.ws_conn as __WebSocket).send(
          JSON.stringify({
            Type: MessageType.InputNotice,
            Text: "",
            Sender: user,
            State: 0,
            Receiver: receiver,
          })
        );
        timer = setTimeout(() => {
          clearTimeout(timer);
          timer = null;
        }, 2000);
      }
    };

    const toBuddyPageHandler = () => {
      ctx.emit("close", true);
    };

    const pullHistoryMessageHandler = () => {
      pullMessage({
        sender: receiver,
        user_id: userID,
        receiver: user,
        time: lastRecvTime,
      }).then((res) => {
        if (res && res.Success && res.Code == "0000") {
          if (res.Result) {
            res.Result.forEach((msg: any) => {
              (store.state.chat_msg as Queue<any>).push({
                type: 1,
                text: msg.text,
              });
            });
          }
        }
        console.log(res);
      });
    };

    const sendMessageHandler = () => {
      sendMessage({
        sender: user,
        receiver: receiver,
        text: send_text.value,
      }).then((res) => {
        if (res.Success && res.Code == "0000") {
          const msg = { type: 0, text: send_text.value };
          (store.state.chat_msg as Queue<any>).push(msg);
          store.state.chat_history.message[receiver].push(msg);
          send_text.value = "";
        }
      });
    };

    return {
      user,
      store,
      receiver,
      send_text,
      sendMessageHandler,
      toBuddyPageHandler,
      watchTextHandler,
    };
  },
});
</script>

<style scoped>
.title {
  height: 30px;
  /* background-color: #eee; */
  text-align: center;
  line-height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  padding: 0 10px;
  font-weight: 600;
}

.send__box {
  width: 100%;
  position: absolute;
  background-color: #eee;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  bottom: 0;
}

.send__box input {
  height: 30px;
  width: 80%;
  border-radius: 15px;
  outline: none;
  border-style: none;
  text-indent: 15px;
}

.send__box i {
  color: black;
  font-size: 1.4rem;
  padding: 0 10px;
}

.chat__container {
  width: 100%;
  height: 100%;
  position: relative;
}

.message__list {
  padding: 10px;
  height: calc(100% - 120px);
  overflow-y: scroll;
  /* background-color: blueviolet; */
}

.message__list li {
  width: 100%;
  position: relative;
  margin-top: 4px;
  /* background-color: cadetblue; */
}

.message__list li .left {
  width: 100%;
  /* background-color: lightcoral; */
}

.message__list li .left span {
  max-width: 200px;
  display: inline-block;
  padding: 10px 10px;
  color: black;
  background-color: #eee;
  border-radius: 3px;
  position: relative;
  /* text-align: left; */
  word-wrap: break-word;
  word-break: break-all;
}

.message__list li .left span::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: 0;
  border-width: 5px;
  border-style: solid;
  border-color: #eeeeee #eeeeee transparent transparent;
  left: -6px;
}

/* right */
.message__list li .right {
  width: 100%;
  text-align: right;
}

.message__list li .right span {
  max-width: 200px;
  display: inline-block;
  padding: 10px 10px;
  color: black;
  background-color: #409eff;
  color: aliceblue;
  border-radius: 3px 0 3px 3px;
  position: relative;
  word-wrap: break-word;
  word-break: break-all;
  text-align: left;
}

.message__list li .right span::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: 0;
  border-width: 5px;
  border-style: solid;
  border-color: #409eff transparent transparent #409eff;
  right: -4px;
}
</style>