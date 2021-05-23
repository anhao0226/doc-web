<template>
  <div class="chat__container">
    <div class="title">
      <i class="iconfont icon-arrow-left-bold" @click="toBuddyPageHandler"></i>
      <span>{{ chatState.email }}</span>
      <i class="iconfont icon-more"></i>
    </div>
    <ul class="message__list">
      <li v-for="(item, index) in store.state.ws_chat_message" :key="index">
        <div class="left" v-if="item.type == 1">
          <span>{{ item.text }}</span>
        </div>
        <div class="right" v-else>
          <span>{{ item.text }}</span>
        </div>
      </li>
    </ul>
    <div class="send__box">
      <input type="text" v-model="send_text" />
      <i class="iconfont icon-icon_fabu" @click="sendMessageHandler"></i>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";
import { useStore } from "@/store/index";
import { sendMessage } from "@/services/user";
import { hasOwnProperty } from "@/libs/utils";
export default defineComponent({
  props: ["chatState", "close"],
  emits: ["close"],
  components: {},
  setup(props: any, ctx: any) {
    const store = useStore();
    const user = store.state.user;
    const send_text = ref("");
    let receiver = "";

    onMounted(() => {
      receiver = props.chatState.object;
      store.state.ws_chat_message = [];
      store.state.chatBox = document.getElementsByClassName("message__list")[0];
      if (hasOwnProperty(store.state.wsState.message, receiver)) {
        store.state.wsState.message[
          receiver
        ].forEach((msg: { type: number; text: string }) => {
          store.state.ws_chat_message.push(msg)
        });
      }
    });

    const toBuddyPageHandler = () => {
      ctx.emit("close", true);
    };

    const sendMessageHandler = () => {
      sendMessage({
        sender: user,
        receiver: receiver,
        text: send_text.value,
      })
        .then((res) => {
          if (res.Success && res.Code == "0000") {
            if (!hasOwnProperty(store.state.wsState.message, receiver)) {
              store.state.wsState.message[receiver] = [];
            }
            store.state.ws_chat_message.push({
               type: 0,
               text: send_text.value,
            })
            store.state.wsState.message[receiver].push({
              type: 0,
              text: send_text.value,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return {
      user,
      store,
      receiver,
      send_text,
      sendMessageHandler,
      toBuddyPageHandler,
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
  display: inline-block;
  padding: 10px 10px;
  color: black;
  background-color: #eee;
  border-radius: 3px;
  position: relative;
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
  left: -5px;
}

.message__list li .right {
  width: 100%;
  text-align: right;
}

.message__list li .right span {
  display: inline-block;
  padding: 10px 10px;
  color: black;
  background-color: #409eff;
  color: aliceblue;
  border-radius: 3px 0 3px 3px;
  position: relative;
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
  right: -5px;
}
</style>